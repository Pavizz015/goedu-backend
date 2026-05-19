const API = 'http://localhost:8080'
let token = localStorage.getItem('goedu_token') || ''
let userEmail = localStorage.getItem('goedu_email') || ''
let allLessons = []
let completedLessons = new Set()
let correctLessons = new Set()
let currentLesson = null
let selectedOption = null

// INIT 
window.addEventListener('DOMContentLoaded', () => {
  // язык: применяем сохранённый
  const savedLang = localStorage.getItem('goedu_lang') || 'ru'
  setLang(savedLang)
  // HLS видео-фон на auth
  initAuthVideo()
  if (token) enterApp()
})

// HLS ВИДЕО-ФОН 
function initAuthVideo() {
  const video = document.getElementById('auth-bg-video')
  if (!video) return
  const src = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'
  if (window.Hls && window.Hls.isSupported()) {
    const hls = new window.Hls({ enableWorker: false })
    hls.loadSource(src)
    hls.attachMedia(video)
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari нативно поддерживает HLS
    video.src = src
  }
  // на всякий случай: попробуем воспроизвести (autoplay уже стоит, но некоторые браузеры требуют muted+playsinline)
  video.play().catch(() => {})
}

// AUTH UI 
function scrollToForm() {
  const el = document.getElementById('auth-form-card')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  // на мобильных формы рядом, на десктопе тоже визуально подсветим
  const glass = document.querySelector('.auth-form-glass')
  if (glass) {
    glass.classList.add('flash')
    setTimeout(() => glass.classList.remove('flash'), 700)
  }
}

function toggleAuthMobileMenu() {
  const menu = document.getElementById('auth-mobile-menu')
  if (menu) menu.classList.toggle('open')
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'))
  })
  document.getElementById('auth-form-login').style.display = tab === 'login' ? 'block' : 'none'
  document.getElementById('auth-form-register').style.display = tab === 'register' ? 'block' : 'none'
  hideAuthError()
}
function showAuthError(msg) {
  const el = document.getElementById('auth-error')
  el.textContent = msg; el.style.display = 'block'
}
function hideAuthError() {
  document.getElementById('auth-error').style.display = 'none'
}

async function doLogin() {
  const email = document.getElementById('login-email').value.trim()
  const pass = document.getElementById('login-password').value
  if (!email || !pass) return showAuthError(t('auth.err_fields'))
  const btn = document.getElementById('btn-login')
  btn.disabled = true; btn.textContent = t('auth.logging_in')
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })
    const text = await res.text()
    let data = {}; try { data = JSON.parse(text) } catch {}
    if (!res.ok) throw new Error(res.status === 401 ? t('auth.err_login') : 'Ошибка входа')
    token = data.token; userEmail = email
    localStorage.setItem('goedu_token', token); localStorage.setItem('goedu_email', email)
    enterApp()
  } catch (e) { showAuthError(e.message) }
  finally { btn.disabled = false; btn.textContent = t('auth.login_btn') }
}
async function doRegister() {
  const email = document.getElementById('reg-email').value.trim()
  const pass = document.getElementById('reg-password').value
  if (!email || !pass) return showAuthError(t('auth.err_fields'))
  if (pass.length < 6) return showAuthError(t('auth.err_pass_len'))
  const btn = document.getElementById('btn-register')
  btn.disabled = true; btn.textContent = t('auth.creating')
  try {
    const res = await fetch(`${API}/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })
    const text = await res.text()
    let data = {}; try { data = JSON.parse(text) } catch {}
    if (!res.ok) throw new Error(res.status === 409 ? t('auth.err_register') : 'Ошибка регистрации')
    token = data.token; userEmail = email
    localStorage.setItem('goedu_token', token); localStorage.setItem('goedu_email', email)
    enterApp()
  } catch (e) { showAuthError(e.message) }
  finally { btn.disabled = false; btn.textContent = t('auth.register_btn') }
}

function doLogout() {
  token = ''; userEmail = ''
  localStorage.removeItem('goedu_token'); localStorage.removeItem('goedu_email')
  document.getElementById('page-auth').classList.add('active')
  document.getElementById('page-app').classList.remove('active')
  closeUserMenu()
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  document.getElementById('view-profile').classList.add('active')
}

// APP ENTRY 
function enterApp() {
  document.getElementById('page-auth').classList.remove('active')
  document.getElementById('page-app').classList.add('active')
  Promise.all([loadLessons(), loadProgress()]).finally(() => {
    showView('profile')
    renderVideos()
  })
  loadMe()
}

// XP / LEVEL 
async function loadMe() {
  try {
    const res = await fetch(`${API}/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) return
    const data = await res.json()
    updateXPBar(data.xp, data.level, data.title, data.streak, data.username, data.email)
  } catch {}
}

function updateXPBar(xp, level, title, streak, username, email) {
  const thresholds = [0, 50, 150, 300, 999999]
  const cur = thresholds[level - 1]
  const next = thresholds[level]
  const pct = Math.min(100, Math.round(((xp - cur) / (next - cur)) * 100))

  document.getElementById('user-title').textContent = title || 'Beginner'
  document.getElementById('user-xp').textContent = xp + ' XP'
  document.getElementById('user-level').textContent = (getLang() === 'kz' ? 'Дең. ' : (getLang() === 'en' ? 'Lvl ' : 'Ур. ')) + level
  document.getElementById('user-streak').textContent = '🔥 ' + (streak || 0) + ' ' + t('profile.days')
  document.getElementById('xp-bar').style.width = pct + '%'

  const displayName = username || email || '—'
  const nameEl = document.getElementById('user-name-display')
  const emailEl = document.getElementById('user-email-display')
  if (nameEl) nameEl.textContent = displayName
  if (emailEl) emailEl.textContent = email || '—'
  document.getElementById('user-avatar').textContent = displayName[0].toUpperCase()
}

function showXPPopup(amount) {
  const el = document.createElement('div')
  el.className = 'xp-popup'
  el.textContent = '+' + amount + ' XP'
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}

// USER MENU 
function toggleUserMenu() {
  const menu = document.getElementById('user-menu')
  if (menu) menu.classList.toggle('open')
}
function closeUserMenu() {
  const menu = document.getElementById('user-menu')
  if (menu) menu.classList.remove('open')
}
document.addEventListener('click', e => {
  const card = document.querySelector('.user-card')
  const menu = document.getElementById('user-menu')
  if (menu && card && !card.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open')
  }
})

// NAVIGATION 
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))
  const view = document.getElementById('view-' + name)
  if (view) view.classList.add('active')

  const navMap = { profile: 0, dashboard: 1, progress: 2, leaderboard: 3, discuss: 4, videos: 5, about: 6 }
  const idx = navMap[name]
  if (idx !== undefined) {
    const items = document.querySelectorAll('.sidebar-nav .nav-item')
    if (items[idx]) items[idx].classList.add('active')
  }

  if (name === 'progress') loadProgress()
  if (name === 'profile') loadProfile()
  if (name === 'leaderboard') loadLeaderboard()
  if (name === 'settings') loadSettings()
  if (name === 'discuss') renderDiscussList()
  if (name === 'videos') renderVideos()
}

// ХЕЛПЕР ДЛЯ ПЕРЕВОДОВ КОНТЕНТА 
function tr(obj, baseKey) {
  if (!obj) return ''
  const lang = getLang()
  if (lang === 'ru') return obj[baseKey] || ''
  return obj[baseKey + '_' + lang] || obj[baseKey] || ''
}

// LESSONS 
async function loadLessons() {
  try {
    const res = await fetch(`${API}/lessons`)
    if (!res.ok) throw new Error()
    allLessons = await res.json()
    renderLessons()
  } catch {
    document.getElementById('lessons-grid').innerHTML =
      `<div class="empty-state"><div class="empty-icon">⚠</div><p>${t('dashboard.load_err')}</p><span>${t('dashboard.server_hint')}</span></div>`
  }
}

function renderLessons() {
  const grid = document.getElementById('lessons-grid')
  if (!grid) return
  if (!allLessons.length) {
    grid.innerHTML = `<div class="empty-state"><p>${t('dashboard.empty')}</p></div>`
    return
  }
  document.getElementById('stat-total').textContent = allLessons.length
  document.getElementById('stat-done').textContent = completedLessons.size
  document.getElementById('stat-correct').textContent = correctLessons.size

  grid.innerHTML = allLessons.map((l, i) => {
    const done = completedLessons.has(l.id)
    const diffClass = l.difficulty === 'hard' ? 'diff-hard' : l.difficulty === 'medium' ? 'diff-medium' : 'diff-easy'
    const diffLabel = l.difficulty === 'hard' ? t('dashboard.diff_hard') : l.difficulty === 'medium' ? t('dashboard.diff_medium') : t('dashboard.diff_easy')
    // Локализованное название из LESSON_CONTENT, fallback на серверное
    const content = window.LESSON_CONTENT && window.LESSON_CONTENT[l.id]
    const lang = getLang()
    const localizedTitle = (content && lang !== 'ru') ? (content['title_' + lang] || l.title) : l.title
    return `
    <div class="lesson-card ${done ? 'completed' : ''}" onclick="openLesson(${i})">
      <div class="lesson-card-top">
        <div class="lesson-num">${t('dashboard.lesson_word')} ${l.id}</div>
        <span class="diff-badge ${diffClass}">${diffLabel}</span>
      </div>
      <div class="lesson-title">${escHtml(localizedTitle)}</div>
      <div class="lesson-category">${escHtml(l.category || 'Основы')}</div>
      <span class="lesson-badge ${done ? 'badge-done' : 'badge-todo'}">
        ${done ? t('dashboard.done') : t('dashboard.todo')}
      </span>
    </div>`
  }).join('')
}

function openLesson(idx) {
  startLessonTimer()
  currentLesson = allLessons[idx]
  selectedOption = null
  // Локализованное название
  const content = window.LESSON_CONTENT && window.LESSON_CONTENT[currentLesson.id]
  const lang = getLang()
  const localizedTitle = (content && lang !== 'ru') ? (content['title_' + lang] || currentLesson.title) : currentLesson.title
  document.getElementById('lesson-title-display').textContent = localizedTitle
  renderTheory(currentLesson)
  renderPractice(currentLesson)
  renderQuiz(currentLesson)
  switchLessonTab('theory')
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  document.getElementById('view-lesson').classList.add('active')
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))
}

// LESSON TABS 
function switchLessonTab(name) {
  document.querySelectorAll('.lesson-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name))
  document.querySelectorAll('.lesson-tab-content').forEach(c => c.classList.remove('active'))
  const target = document.getElementById('lesson-tab-' + name)
  if (target) target.classList.add('active')
}

// ТЕОРИЯ
function renderTheory(lesson) {
  const container = document.getElementById('theory-content')
  const data = (window.LESSON_CONTENT && window.LESSON_CONTENT[lesson.id]) ? window.LESSON_CONTENT[lesson.id].theory : null
  if (data) {
    container.innerHTML = data.map(block => {
      switch (block.type) {
        case 'h2': return `<h2 class="th-h2">${escHtml(tr(block, 'text'))}</h2>`
        case 'h3': return `<h3 class="th-h3">${escHtml(tr(block, 'text'))}</h3>`
        case 'p':  return `<p class="th-p">${escHtml(tr(block, 'text'))}</p>`
        case 'code': return `<pre class="th-code"><code>${escHtml(block.text)}</code></pre>`
        case 'list': {
          const items = tr(block, 'items') || block.items || []
          return `<ul class="th-list">${items.map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>`
        }
        default: return ''
      }
    }).join('')
  } else {
    container.innerHTML = `<div class="th-p">${formatTheory(lesson.theory || t('lesson.no_theory'))}</div>`
  }
}

function formatTheory(text) {
  return escHtml(text).replace(
    /`([^`]+)`/g,
    '<code style="font-family:var(--mono);background:var(--bg3);padding:2px 6px;border-radius:4px;font-size:13px;color:#a8d8a8">$1</code>'
  )
}

// ПРАКТИКА
let practiceState = null

function renderPractice(lesson) {
  const data = (window.LESSON_CONTENT && window.LESSON_CONTENT[lesson.id]) ? window.LESSON_CONTENT[lesson.id].practice : null
  const taskEl = document.getElementById('practice-task')
  const codeEl = document.getElementById('practice-code')
  const tokensEl = document.getElementById('practice-tokens')
  const resultEl = document.getElementById('practice-result')
  resultEl.className = 'practice-result'
  resultEl.textContent = ''
  document.getElementById('btn-practice-check').disabled = false
  document.getElementById('btn-practice-check').textContent = t('lesson.check')

  if (!data) {
    taskEl.textContent = t('lesson.no_practice')
    codeEl.innerHTML = ''; tokensEl.innerHTML = ''
    return
  }
  taskEl.textContent = tr(data, 'task') || data.task
  practiceState = {
    slotValues: {}, tokenUsed: [],
    slots: data.slots, tokens: data.tokens
  }
  Object.keys(data.slots).forEach(k => { practiceState.slotValues[k] = null })
  practiceState.tokenUsed = data.tokens.map(() => false)
  drawPractice(data.template)
}

function drawPractice(template) {
  const codeEl = document.getElementById('practice-code')
  const parts = []
  const re = /⟦(\d+)⟧/g
  let lastIdx = 0, m
  while ((m = re.exec(template)) !== null) {
    parts.push({ type: 'text', value: template.slice(lastIdx, m.index) })
    parts.push({ type: 'slot', id: m[1] })
    lastIdx = m.index + m[0].length
  }
  parts.push({ type: 'text', value: template.slice(lastIdx) })

  codeEl.innerHTML = parts.map(p => {
    if (p.type === 'text') return `<span class="code-text">${escHtml(p.value)}</span>`
    const val = practiceState.slotValues[p.id]
    if (val == null) return `<span class="token-slot" data-slot="${p.id}" onclick="removeFromSlot('${p.id}')">&nbsp;</span>`
    return `<span class="token-slot filled" data-slot="${p.id}" onclick="removeFromSlot('${p.id}')">${escHtml(val)}</span>`
  }).join('')

  const tokensEl = document.getElementById('practice-tokens')
  tokensEl.innerHTML = practiceState.tokens.map((tok, i) => `
    <button class="token-btn ${practiceState.tokenUsed[i] ? 'used' : ''}"
            data-token-idx="${i}"
            ${practiceState.tokenUsed[i] ? 'disabled' : ''}
            onclick="placeToken(${i})">${escHtml(tok)}</button>
  `).join('')
}

function placeToken(tokenIdx) {
  if (!practiceState || practiceState.tokenUsed[tokenIdx]) return
  const emptyKey = Object.keys(practiceState.slotValues).find(k => practiceState.slotValues[k] == null)
  if (!emptyKey) return showToast(t('lesson.cells_full'))
  practiceState.slotValues[emptyKey] = practiceState.tokens[tokenIdx]
  practiceState.tokenUsed[tokenIdx] = true
  const lessonData = window.LESSON_CONTENT[currentLesson.id].practice
  drawPractice(lessonData.template)
}

function removeFromSlot(slotId) {
  if (!practiceState) return
  const val = practiceState.slotValues[slotId]
  if (val == null) return
  const idx = practiceState.tokens.findIndex((tok, i) => practiceState.tokenUsed[i] && tok === val)
  if (idx >= 0) practiceState.tokenUsed[idx] = false
  practiceState.slotValues[slotId] = null
  const lessonData = window.LESSON_CONTENT[currentLesson.id].practice
  drawPractice(lessonData.template)
}

function resetPractice() {
  if (!currentLesson || !window.LESSON_CONTENT[currentLesson.id]) return
  renderPractice(currentLesson)
}

function checkPractice() {
  if (!practiceState) return
  const resultEl = document.getElementById('practice-result')
  let allFilled = true, correct = true
  for (const k of Object.keys(practiceState.slots)) {
    if (practiceState.slotValues[k] == null) { allFilled = false; break }
    if (practiceState.slotValues[k] !== practiceState.slots[k]) correct = false
  }
  if (!allFilled) {
    resultEl.className = 'practice-result wrong-result'
    resultEl.textContent = t('lesson.fill_all')
    return
  }
  if (correct) {
    resultEl.className = 'practice-result correct-result'
    resultEl.textContent = t('lesson.practice_correct')
    document.getElementById('btn-practice-check').disabled = true
    document.getElementById('btn-practice-check').textContent = t('lesson.practice_done')
    showToast(t('lesson.practice_correct'))
    launchConfetti()
    document.querySelectorAll('.token-slot').forEach(s => s.classList.add('correct'))
  } else {
    resultEl.className = 'practice-result wrong-result'
    resultEl.textContent = t('lesson.practice_wrong')
    document.querySelectorAll('.token-slot.filled').forEach(s => {
      const id = s.dataset.slot
      if (practiceState.slotValues[id] !== practiceState.slots[id]) s.classList.add('wrong')
    })
  }
}

// КВИЗ 
function renderQuiz(lesson) {
  const content = window.LESSON_CONTENT && window.LESSON_CONTENT[lesson.id]
  const lang = getLang()
  let question = lesson.question || '—'
  let options = lesson.options || []
  if (content && content.quiz && lang !== 'ru') {
    question = content.quiz['question_' + lang] || question
    options = content.quiz['options_' + lang] || options
  }
  document.getElementById('quiz-question-text').textContent = question
  const opts = document.getElementById('quiz-options-list')
  opts.innerHTML = options.map((opt, i) => `
    <div class="quiz-option" onclick="selectOption(${i})" id="opt-${i}">
      <div class="option-dot"></div>
      <span>${escHtml(opt)}</span>
    </div>`).join('')
  document.getElementById('quiz-result').className = 'quiz-result'
  document.getElementById('quiz-result').textContent = ''
  document.getElementById('btn-submit').disabled = true
  document.getElementById('btn-submit').textContent = t('lesson.check')
  document.getElementById('btn-next').style.display = 'none'
  selectedOption = null
}

function selectOption(idx) {
  if (document.querySelector('.quiz-option.correct') || document.querySelector('.quiz-option.wrong')) return
  selectedOption = idx
  document.querySelectorAll('.quiz-option').forEach((el, i) => el.classList.toggle('selected', i === idx))
  document.getElementById('btn-submit').disabled = false
}

async function doSubmit() {
  if (selectedOption === null || !currentLesson) return
  const btn = document.getElementById('btn-submit')
  btn.disabled = true; btn.textContent = t('lesson.checking')
  stopLessonTimer()
  try {
    const res = await fetch(`${API}/lessons/${currentLesson.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ answer: selectedOption })
    })
    const data = await res.json()
    const resultEl = document.getElementById('quiz-result')
    const allOpts = document.querySelectorAll('.quiz-option')
    allOpts.forEach(o => o.classList.add('disabled'))

    if (data.correct) {
      allOpts[selectedOption].classList.remove('selected'); allOpts[selectedOption].classList.add('correct')
      resultEl.className = 'quiz-result correct-result'
      resultEl.textContent = t('lesson.quiz_correct')
      completedLessons.add(currentLesson.id); correctLessons.add(currentLesson.id)
      showToast(t('lesson.quiz_correct'))
      showXPPopup(10); setTimeout(loadMe, 500); launchConfetti()
      if (correctLessons.size >= allLessons.length) setTimeout(showVictoryScreen, 800)
    } else {
      allOpts[selectedOption].classList.remove('selected'); allOpts[selectedOption].classList.add('wrong')
      resultEl.className = 'quiz-result wrong-result'
      resultEl.textContent = t('lesson.quiz_wrong')
      completedLessons.add(currentLesson.id)
      showToast(t('lesson.quiz_wrong'))
    }
    renderLessons(); updateStats()
    const curIdx = allLessons.findIndex(l => l.id === currentLesson.id)
    if (curIdx < allLessons.length - 1) document.getElementById('btn-next').style.display = 'inline-block'
  } catch {
    btn.disabled = false
    showToast('Error')
  }
  btn.textContent = t('lesson.check')
}

function goNextLesson() {
  const curIdx = allLessons.findIndex(l => l.id === currentLesson.id)
  if (curIdx < allLessons.length - 1) openLesson(curIdx + 1)
}

function updateStats() {
  const sd = document.getElementById('stat-done'); if (sd) sd.textContent = completedLessons.size
  const sc = document.getElementById('stat-correct'); if (sc) sc.textContent = correctLessons.size
}

// PROGRESS 
async function loadProgress() {
  const list = document.getElementById('progress-list')
  if (list) list.innerHTML = '<div class="loading-state"><div class="spinner"></div><span>...</span></div>'
  try {
    const res = await fetch(`${API}/progress`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) throw new Error()
    const data = await res.json()
    completedLessons.clear(); correctLessons.clear()
    data.forEach(p => {
      completedLessons.add(p.lesson_id)
      if (p.is_correct) correctLessons.add(p.lesson_id)
    })
    const total = allLessons.length || 1
    const pct = Math.round((completedLessons.size / total) * 100)
    const pbar = document.getElementById('progress-bar'); if (pbar) pbar.style.width = pct + '%'
    const ppct = document.getElementById('progress-pct')
    if (ppct) ppct.textContent = `${pct}${t('progress.percent_done')} (${completedLessons.size}/${total})`
    updateStats(); renderLessons()
    if (!list) return
    if (!data.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>${t('progress.empty')}</p><span>${t('progress.empty_sub')}</span></div>`
      return
    }
    list.innerHTML = data.map(p => {
      const lesson = allLessons.find(l => l.id === p.lesson_id)
      const name = lesson ? lesson.title : `${t('dashboard.lesson_word')} ${p.lesson_id}`
      const date = new Date(p.created_at).toLocaleDateString(getLang() === 'kz' ? 'ru' : getLang(), { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
      return `
      <div class="progress-row">
        <span class="progress-lesson-name">${escHtml(name)}</span>
        <span class="progress-result ${p.is_correct ? 'result-correct' : 'result-wrong'}">${p.is_correct ? t('progress.correct_res') : t('progress.wrong_res')}</span>
        <span class="progress-date">${date}</span>
      </div>`
    }).join('')
  } catch {
    if (list) list.innerHTML = `<div class="empty-state"><p>${t('progress.load_err')}</p></div>`
  }
}

// PROFILE 
async function loadProfile() {
  try {
    const res = await fetch(`${API}/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) return
    const data = await res.json()
    const displayName = data.username || data.email || '—'
    document.getElementById('profile-avatar-big').textContent = displayName[0].toUpperCase()
    document.getElementById('profile-avatar-big').style.background = data.avatar_color || 'linear-gradient(135deg, #5ed29c, #00a0ff)'
    document.getElementById('profile-email').textContent = displayName
    document.getElementById('profile-badge').textContent = data.title || 'Beginner'
    document.getElementById('profile-xp').textContent = data.xp
    document.getElementById('profile-level').textContent = data.level
    document.getElementById('profile-streak').textContent = (data.streak || 0) + ' ' + t('profile.days')
    document.getElementById('profile-done').textContent = completedLessons.size
    document.getElementById('profile-correct').textContent = correctLessons.size
    const total = completedLessons.size || 1
    const accuracy = Math.round((correctLessons.size / total) * 100)
    document.getElementById('profile-accuracy').textContent = accuracy + '%'
    const thresholds = [0, 50, 150, 300, 999999]
    const level = data.level
    const cur = thresholds[level - 1]; const next = thresholds[level]
    const pct = Math.min(100, Math.round(((data.xp - cur) / (next - cur)) * 100))
    document.getElementById('profile-xp-bar').style.width = pct + '%'
    document.getElementById('profile-xp-next').textContent = `${data.xp} / ${next} XP`
    document.getElementById('profile-level-title').textContent = `${t('profile.level')} ${level} → ${level + 1}`
    renderAchievements(data.xp, data.streak || 0, completedLessons.size, correctLessons.size)
  } catch {}
}

function renderAchievements(xp, streak, done, correct) {
  const achievements = [
    { icon: '🎯', name: t('ach.first_step'),  desc: t('ach.first_step_d'),  unlocked: done >= 1 },
    { icon: '🔥', name: t('ach.streak'),      desc: t('ach.streak_d'),      unlocked: streak >= 3 },
    { icon: '⚡', name: t('ach.newbie'),      desc: t('ach.newbie_d'),      unlocked: xp >= 50 },
    { icon: '📚', name: t('ach.student'),     desc: t('ach.student_d'),     unlocked: done >= 5 },
    { icon: '🏆', name: t('ach.junior'),      desc: t('ach.junior_d'),      unlocked: xp >= 150 },
    { icon: '💎', name: t('ach.middle'),      desc: t('ach.middle_d'),      unlocked: xp >= 300 },
    { icon: '🎓', name: t('ach.honor'),       desc: t('ach.honor_d'),       unlocked: correct >= 10 },
    { icon: '🚀', name: t('ach.marathon'),    desc: t('ach.marathon_d'),    unlocked: done >= 20 },
  ]
  const grid = document.getElementById('achievements-grid')
  grid.innerHTML = achievements.map(a => `
    <div class="achievement ${a.unlocked ? 'unlocked' : 'locked'}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${escHtml(a.name)}</div>
      <div class="achievement-desc">${escHtml(a.desc)}</div>
    </div>`).join('')
}

// DISCUSS
function loadDiscussPosts() {
  try { return JSON.parse(localStorage.getItem('goedu_discuss') || '[]') } catch { return [] }
}
function saveDiscussPosts(posts) { localStorage.setItem('goedu_discuss', JSON.stringify(posts)) }

function createDiscussPost() {
  const input = document.getElementById('discuss-input')
  const tagSel = document.getElementById('discuss-tag-select')
  const text = input.value.trim()
  if (!text) return showToast(t('discuss.write_first'))
  const posts = loadDiscussPosts()
  const author = (localStorage.getItem('goedu_email') || 'anon').split('@')[0]
  posts.unshift({
    id: Date.now(), author, text,
    tagKey: tagSel.value || 'general',
    createdAt: Date.now(), likes: 0
  })
  saveDiscussPosts(posts)
  input.value = ''
  renderDiscussList()
  showToast(t('discuss.posted'))
}

function deleteDiscussPost(id) {
  const posts = loadDiscussPosts().filter(p => p.id !== id)
  saveDiscussPosts(posts); renderDiscussList()
}

function likeDiscussPost(id) {
  const posts = loadDiscussPosts()
  const p = posts.find(p => p.id === id); if (!p) return
  p.likes = (p.likes || 0) + 1
  saveDiscussPosts(posts); renderDiscussList()
}

function tagLabel(key) {
  return t('discuss.tag_' + (key || 'general'))
}

function renderDiscussList() {
  const list = document.getElementById('discuss-list')
  if (!list) return
  const posts = loadDiscussPosts()
  const myAuthor = (localStorage.getItem('goedu_email') || 'anon').split('@')[0]
  if (!posts.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">💬</div><p>${t('discuss.empty')}</p><span>${t('discuss.empty_sub')}</span></div>`
    return
  }
  list.innerHTML = posts.map(p => {
    const initial = (p.author || '?')[0].toUpperCase()
    const time = formatTimeAgo(p.createdAt)
    const canDelete = p.author === myAuthor
    const tagKey = p.tagKey || 'general'
    return `
    <div class="discuss-card">
      <div class="discuss-avatar">${escHtml(initial)}</div>
      <div class="discuss-body">
        <div class="discuss-header">
          <span class="discuss-name">${escHtml(p.author)}</span>
          <span class="discuss-time">${escHtml(time)}</span>
        </div>
        <div class="discuss-text">${escHtml(p.text)}</div>
        <div class="discuss-footer">
          <span class="discuss-tag">${escHtml(tagLabel(tagKey))}</span>
          <button class="discuss-like-btn" onclick="likeDiscussPost(${p.id})">❤️ ${p.likes || 0}</button>
          ${canDelete ? `<button class="discuss-del-btn" onclick="deleteDiscussPost(${p.id})">${t('discuss.delete')}</button>` : ''}
        </div>
      </div>
    </div>`
  }).join('')
}

function formatTimeAgo(ts) {
  const sec = Math.floor((Date.now() - ts) / 1000)
  if (sec < 60) return t('discuss.time_now')
  const min = Math.floor(sec / 60)
  if (min < 60) return min + ' ' + t('discuss.time_min')
  const hr = Math.floor(min / 60)
  if (hr < 24) return hr + ' ' + t('discuss.time_hr')
  const d = Math.floor(hr / 24)
  if (d < 7) return d + ' ' + t('discuss.time_days')
  return new Date(ts).toLocaleDateString(getLang() === 'kz' ? 'ru' : getLang(), { day: '2-digit', month: 'short' })
}

// ВИДЕО
const GO_VIDEOS = [
  { id: '446E-r0rXHI', title: 'Go in 100 Seconds',                              author: 'Fireship',          lang: 'EN' },
  { id: 'YS4e4q9oBaU', title: 'Learn Go Programming — Tutorial for Beginners', author: 'freeCodeCamp.org',  lang: 'EN' },
  { id: 'etSN4X_fCnM', title: 'Go (Golang) Tutorial #1 — Introduction & Setup', author: 'The Net Ninja',     lang: 'EN' },
  { id: 'd91sOEh1vfc', title: 'Как выучить Go с нуля — основы и горутины',     author: 'Евгений Пантела',    lang: 'RU' },
  { id: '8dS7aT-s_H0', title: 'Курс Golang за 100 минут — основы языка',       author: 'IT-Бородач',         lang: 'RU' },
  { id: 'dpvRDJjUJf8', title: 'Golang — полный курс для начинающих',           author: 'Nilchan',            lang: 'RU' }
]

function renderVideos() {
  const grid = document.getElementById('videos-grid')
  if (!grid) return
  grid.innerHTML = GO_VIDEOS.map(v => `
    <a class="video-card" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">
      <div class="video-thumb">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" />
        <span class="video-play">▶</span>
        <span class="video-lang">${v.lang}</span>
      </div>
      <div class="video-info">
        <div class="video-title">${escHtml(v.title)}</div>
        <div class="video-author">${escHtml(v.author)}</div>
        <span class="video-cta">${t('video.watch')}</span>
      </div>
    </a>
  `).join('')
}

// CONFETTI
function launchConfetti() {
  const colors = ['#5ed29c', '#00ffbf', '#ffffff', '#a8d8a8', '#00a0ff']
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed; top: -10px;
        left: ${Math.random() * 100}vw;
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none; z-index: 9999;
        animation: confettiFall ${1.5 + Math.random() * 2}s ease forwards;
        transform: rotate(${Math.random() * 360}deg);
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 3500)
    }, i * 20)
  }
}

function showVictoryScreen() {
  const el = document.createElement('div')
  el.id = 'victory-screen'
  el.innerHTML = `
    <div class="victory-box">
      <div class="victory-icon">🎉</div>
      <div class="victory-title">${t('victory.title')}</div>
      <div class="victory-subtitle">${t('victory.subtitle')}</div>
      <div class="victory-stats">
        <div class="victory-stat"><span class="victory-stat-value" id="v-xp">—</span><span class="victory-stat-label">${t('victory.xp')}</span></div>
        <div class="victory-stat"><span class="victory-stat-value" id="v-correct">—</span><span class="victory-stat-label">${t('victory.correct')}</span></div>
        <div class="victory-stat"><span class="victory-stat-value" id="v-total">—</span><span class="victory-stat-label">${t('victory.total')}</span></div>
      </div>
      <button class="victory-btn" onclick="closeVictory()">${t('victory.continue')}</button>
    </div>`
  document.body.appendChild(el)
  document.getElementById('v-correct').textContent = correctLessons.size
  document.getElementById('v-total').textContent = allLessons.length
  fetch(`${API}/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(r => r.json()).then(d => { document.getElementById('v-xp').textContent = d.xp })
  for (let i = 0; i < 3; i++) setTimeout(launchConfetti, i * 600)
}
function closeVictory() {
  const el = document.getElementById('victory-screen'); if (el) el.remove()
  showView('dashboard')
}

// SEARCH & FILTER 
let activeCategory = 'all'
function filterLessons(query) {
  const q = query.toLowerCase().trim()
  const cards = document.querySelectorAll('.lesson-card')
  cards.forEach((card, i) => {
    const title = card.querySelector('.lesson-title').textContent.toLowerCase()
    const cat = allLessons[i]?.category || ''
    const matchSearch = title.includes(q)
    const matchCat = activeCategory === 'all' || cat === activeCategory
    card.style.display = matchSearch && matchCat ? '' : 'none'
  })
}
function filterByCategory(cat, btn) {
  activeCategory = cat
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  const searchVal = document.getElementById('search-input').value
  filterLessons(searchVal)
}

// LEADERBOARD 
async function loadLeaderboard() {
  const list = document.getElementById('leaderboard-list')
  list.innerHTML = '<div class="loading-state"><div class="spinner"></div><span>...</span></div>'
  try {
    const res = await fetch(`${API}/leaderboard`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) throw new Error()
    const data = await res.json()
    if (!data.length) { list.innerHTML = `<div class="empty-state"><p>${t('leaderboard.empty')}</p></div>`; return }
    const medals = ['🥇', '🥈', '🥉']
    list.innerHTML = data.map((u, i) => {
      const rankClass = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : ''
      const rank = medals[i] || `${i + 1}`
      const displayName = u.username || u.email.split('@')[0]
      const avatar = displayName[0].toUpperCase()
      return `
      <div class="leaderboard-row ${rankClass}">
        <div class="lb-rank">${rank}</div>
        <div class="lb-avatar">${avatar}</div>
        <div class="lb-info"><div class="lb-email">${escHtml(displayName)}</div><div class="lb-title">${escHtml(u.title)}</div></div>
        <div class="lb-xp">${u.xp} XP</div>
      </div>`
    }).join('')
  } catch { list.innerHTML = `<div class="empty-state"><p>${t('leaderboard.load_err')}</p></div>` }
}

// SETTINGS 
let currentAvatarColor = '#5ed29c'
async function loadSettings() {
  try {
    const res = await fetch(`${API}/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!res.ok) return
    const data = await res.json()
    document.getElementById('settings-username').value = data.username || ''
    document.getElementById('settings-bio').value = data.bio || ''
    document.getElementById('settings-country').value = data.country || ''
    currentAvatarColor = data.avatar_color || '#5ed29c'
    const preview = document.getElementById('settings-avatar-preview')
    preview.style.background = currentAvatarColor
    preview.textContent = (data.username || data.email || '?')[0].toUpperCase()
    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.classList.toggle('selected', dot.style.background === currentAvatarColor)
    })
  } catch {}
}
function selectAvatarColor(color, el) {
  currentAvatarColor = color
  document.getElementById('settings-avatar-preview').style.background = color
  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'))
  el.classList.add('selected')
}
async function saveProfile() {
  const username = document.getElementById('settings-username').value.trim()
  const bio = document.getElementById('settings-bio').value.trim()
  const country = document.getElementById('settings-country').value
  try {
    const res = await fetch(`${API}/me/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ username, bio, country, avatar_color: currentAvatarColor })
    })
    if (!res.ok) throw new Error()
    showToast(t('settings.saved')); loadMe()
  } catch { showToast(t('settings.save_err')) }
}
async function changePassword() {
  const oldPass = document.getElementById('settings-old-pass').value
  const newPass = document.getElementById('settings-new-pass').value
  if (!oldPass || !newPass) return showToast(t('settings.fill_both'))
  if (newPass.length < 6) return showToast(t('settings.new_pass_len'))
  try {
    const res = await fetch(`${API}/me/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ old_password: oldPass, new_password: newPass })
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || t('settings.wrong_old'))
    }
    showToast(t('settings.pass_changed'))
    document.getElementById('settings-old-pass').value = ''
    document.getElementById('settings-new-pass').value = ''
  } catch (e) { showToast('✗ ' + e.message) }
}

// TIMER 
let timerInterval = null
let timerSeconds = 0
function startLessonTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerSeconds = 0; updateTimerDisplay()
  timerInterval = setInterval(() => { timerSeconds++; updateTimerDisplay() }, 1000)
}
function stopLessonTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null } }
function updateTimerDisplay() {
  const el = document.getElementById('lesson-timer'); if (!el) return
  if (timerSeconds < 60) el.textContent = `⏱ ${timerSeconds}с`
  else {
    const m = Math.floor(timerSeconds / 60), s = timerSeconds % 60
    el.textContent = `⏱ ${m}м ${s}с`
  }
}

// UTILS 
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
function showToast(msg) {
  const t = document.getElementById('toast')
  t.textContent = msg; t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const authLogin = document.getElementById('auth-form-login')
    if (authLogin && authLogin.style.display !== 'none' && document.getElementById('page-auth').classList.contains('active')) doLogin()
  }
})

// OS табы на странице О языке 
function switchOSTab(os) {
  document.querySelectorAll('.os-tab').forEach(t => t.classList.toggle('active', t.dataset.os === os))
  document.querySelectorAll('.os-content').forEach(c => c.classList.remove('active'))
  const target = document.getElementById('os-' + os)
  if (target) target.classList.add('active')
}