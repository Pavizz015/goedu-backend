const API = 'http://localhost:8080'
let token = localStorage.getItem('goedu_token') || ''
let userEmail = localStorage.getItem('goedu_email') || ''
let allLessons = []
let completedLessons = new Set()
let correctLessons = new Set()
let currentLesson = null
let selectedOption = null

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
  if (token) {
    enterApp()
  }
})

// ── AUTH ──
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
  el.textContent = msg
  el.style.display = 'block'
}

function hideAuthError() {
  document.getElementById('auth-error').style.display = 'none'
}

async function doLogin() {
  const email = document.getElementById('login-email').value.trim()
  const pass = document.getElementById('login-password').value
  if (!email || !pass) return showAuthError('Заполни все поля')
  const btn = document.getElementById('btn-login')
  btn.disabled = true; btn.textContent = 'Входим...'
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })
    const text = await res.text()
    let data = {}
    try { data = JSON.parse(text) } catch {}
    if (!res.ok) {
      const msg = res.status === 401 ? 'Неверный email или пароль' : 'Ошибка входа'
      throw new Error(msg)
    }
    token = data.token
    userEmail = email
    localStorage.setItem('goedu_token', token)
    localStorage.setItem('goedu_email', email)
    enterApp()
  } catch (e) {
    showAuthError(e.message)
  } finally {
    btn.disabled = false; btn.textContent = 'Войти'
  }
}
async function doRegister() {
  const email = document.getElementById('reg-email').value.trim()
  const pass = document.getElementById('reg-password').value
  if (!email || !pass) return showAuthError('Заполни все поля')
  if (pass.length < 6) return showAuthError('Пароль минимум 6 символов')
  const btn = document.getElementById('btn-register')
  btn.disabled = true; btn.textContent = 'Создаём...'
  try {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })
    const text = await res.text()
    let data = {}
    try { data = JSON.parse(text) } catch {}
    if (!res.ok) {
      const msg = res.status === 409 ? 'Этот email уже зарегистрирован' : 'Ошибка регистрации'
      throw new Error(msg)
    }
    token = data.token
    userEmail = email
    localStorage.setItem('goedu_token', token)
    localStorage.setItem('goedu_email', email)
    enterApp()
  } catch (e) {
    showAuthError(e.message)
  } finally {
    btn.disabled = false; btn.textContent = 'Создать аккаунт'
  }
}

function doLogout() {
  token = ''; userEmail = ''
  localStorage.removeItem('goedu_token')
  localStorage.removeItem('goedu_email')
  document.getElementById('page-auth').classList.add('active')
  document.getElementById('page-app').classList.remove('active')
  closeUserMenu()
}

// ── APP ENTRY ──
function enterApp() {
  document.getElementById('page-auth').classList.remove('active')
  document.getElementById('page-app').classList.add('active')
  loadLessons()
  loadProgress()
  loadMe()
}

// ── XP / LEVEL ──
async function loadMe() {
  try {
    const res = await fetch(`${API}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
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
  document.getElementById('user-level').textContent = 'Ур. ' + level
  document.getElementById('user-streak').textContent = '🔥 ' + (streak || 0) + ' дней'
  document.getElementById('xp-bar').style.width = pct + '%'

  const displayName = username || email || '—'
  const nameEl = document.getElementById('user-name-display')
  const emailEl = document.getElementById('user-email-display')
  if (nameEl) nameEl.textContent = displayName
  if (emailEl) emailEl.textContent = email || '—'

  const avatar = displayName[0].toUpperCase()
  document.getElementById('user-avatar').textContent = avatar
}

function showXPPopup(amount) {
  const el = document.createElement('div')
  el.className = 'xp-popup'
  el.textContent = '+' + amount + ' XP'
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}

// ── USER MENU ──
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

// ── NAVIGATION ──
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))
  document.getElementById('view-' + name).classList.add('active')
  const idx = name === 'dashboard' ? 0 : name === 'progress' ? 1 : name === 'leaderboard' ? 2 : -1
  if (idx >= 0) document.querySelectorAll('.nav-item')[idx].classList.add('active')
  if (name === 'progress') loadProgress()
  if (name === 'profile') loadProfile()
  if (name === 'leaderboard') loadLeaderboard()
  if (name === 'settings') loadSettings()
}

// ── LESSONS ──
async function loadLessons() {
  try {
    const res = await fetch(`${API}/lessons`)
    if (!res.ok) throw new Error()
    allLessons = await res.json()
    renderLessons()
  } catch {
    document.getElementById('lessons-grid').innerHTML =
      '<div class="empty-state"><div class="empty-icon">⚠</div><p>Не удалось загрузить уроки</p><span>Убедись что сервер запущен на localhost:8080</span></div>'
  }
}

function renderLessons() {
  const grid = document.getElementById('lessons-grid')
  if (!allLessons.length) {
    grid.innerHTML = '<div class="empty-state"><p>Уроков пока нет</p></div>'
    return
  }
  document.getElementById('stat-total').textContent = allLessons.length
  document.getElementById('stat-done').textContent = completedLessons.size
  document.getElementById('stat-correct').textContent = correctLessons.size

  grid.innerHTML = allLessons.map((l, i) => {
    const done = completedLessons.has(l.id)
    const diffClass = l.difficulty === 'hard' ? 'diff-hard' : l.difficulty === 'medium' ? 'diff-medium' : 'diff-easy'
    const diffLabel = l.difficulty === 'hard' ? 'Сложно' : l.difficulty === 'medium' ? 'Средне' : 'Легко'
    return `
    <div class="lesson-card ${done ? 'completed' : ''}" onclick="openLesson(${i})">
      <div class="lesson-card-top">
        <div class="lesson-num">Урок ${l.id}</div>
        <span class="diff-badge ${diffClass}">${diffLabel}</span>
      </div>
      <div class="lesson-title">${escHtml(l.title)}</div>
      <div class="lesson-category">${escHtml(l.category || 'Основы')}</div>
      <span class="lesson-badge ${done ? 'badge-done' : 'badge-todo'}">
        ${done ? '✓ Пройдено' : 'Не пройдено'}
      </span>
    </div>`
  }).join('')
}

function openLesson(idx) {
  startLessonTimer()
  currentLesson = allLessons[idx]
  selectedOption = null

  document.getElementById('lesson-title-display').textContent = currentLesson.title
  document.getElementById('lesson-theory-text').innerHTML = formatTheory(currentLesson.theory)
  document.getElementById('quiz-question-text').textContent = currentLesson.question

  const opts = document.getElementById('quiz-options-list')
  opts.innerHTML = currentLesson.options.map((opt, i) => `
    <div class="quiz-option" onclick="selectOption(${i})" id="opt-${i}">
      <div class="option-dot"></div>
      <span>${escHtml(opt)}</span>
    </div>
  `).join('')

  document.getElementById('quiz-result').className = 'quiz-result'
  document.getElementById('quiz-result').textContent = ''
  document.getElementById('btn-submit').disabled = true
  document.getElementById('btn-next').style.display = 'none'

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  document.getElementById('view-lesson').classList.add('active')
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))
}

function formatTheory(text) {
  return escHtml(text).replace(
    /`([^`]+)`/g,
    '<code style="font-family:var(--mono);background:var(--bg3);padding:2px 6px;border-radius:4px;font-size:13px;color:#a8d8a8">$1</code>'
  )
}

function selectOption(idx) {
  if (document.querySelector('.quiz-option.correct') || document.querySelector('.quiz-option.wrong')) return
  selectedOption = idx
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.classList.toggle('selected', i === idx)
  })
  document.getElementById('btn-submit').disabled = false
}

async function doSubmit() {
  if (selectedOption === null || !currentLesson) return
  const btn = document.getElementById('btn-submit')
  btn.disabled = true; btn.textContent = 'Проверяем...'
  stopLessonTimer()
  try {
    const res = await fetch(`${API}/lessons/${currentLesson.id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answer: selectedOption })
    })
    const data = await res.json()
    const resultEl = document.getElementById('quiz-result')
    const allOpts = document.querySelectorAll('.quiz-option')
    allOpts.forEach(o => o.classList.add('disabled'))

    if (data.correct) {
      allOpts[selectedOption].classList.remove('selected')
      allOpts[selectedOption].classList.add('correct')
      resultEl.className = 'quiz-result correct-result'
      resultEl.textContent = '✓ Правильно! Отличная работа!'
      completedLessons.add(currentLesson.id)
      correctLessons.add(currentLesson.id)
      showToast('✓ Правильный ответ!')
      showXPPopup(10)
      setTimeout(loadMe, 500)
      launchConfetti()
      if (correctLessons.size >= allLessons.length) {
        setTimeout(showVictoryScreen, 800)
      }
    } else {
      allOpts[selectedOption].classList.remove('selected')
      allOpts[selectedOption].classList.add('wrong')
      resultEl.className = 'quiz-result wrong-result'
      resultEl.textContent = '✗ Неверно. Попробуй ещё раз в следующий раз!'
      completedLessons.add(currentLesson.id)
      showToast('✗ Неверный ответ')
    }
    renderLessons()
    updateStats()

    const curIdx = allLessons.findIndex(l => l.id === currentLesson.id)
    if (curIdx < allLessons.length - 1) {
      document.getElementById('btn-next').style.display = 'inline-block'
    }
  } catch (e) {
    btn.disabled = false
    showToast('Ошибка при отправке ответа')
  }
  btn.textContent = 'Проверить'
}

function goNextLesson() {
  const curIdx = allLessons.findIndex(l => l.id === currentLesson.id)
  if (curIdx < allLessons.length - 1) openLesson(curIdx + 1)
}

function updateStats() {
  document.getElementById('stat-done').textContent = completedLessons.size
  document.getElementById('stat-correct').textContent = correctLessons.size
}

// ── PROGRESS ──
async function loadProgress() {
  const list = document.getElementById('progress-list')
  list.innerHTML = '<div class="loading-state"><div class="spinner"></div><span>Загружаем...</span></div>'
  try {
    const res = await fetch(`${API}/progress`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error()
    const data = await res.json()

    completedLessons.clear(); correctLessons.clear()
    data.forEach(p => {
      completedLessons.add(p.lesson_id)
      if (p.is_correct) correctLessons.add(p.lesson_id)
    })

    const total = allLessons.length || 1
    const pct = Math.round((completedLessons.size / total) * 100)
    document.getElementById('progress-bar').style.width = pct + '%'
    document.getElementById('progress-pct').textContent = `${pct}% пройдено (${completedLessons.size} из ${total})`
    updateStats()
    renderLessons()

    if (!data.length) {
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">📊</div><p>Ещё нет истории</p><span>Пройди первый урок!</span></div>'
      return
    }

    list.innerHTML = data.map(p => {
      const lesson = allLessons.find(l => l.id === p.lesson_id)
      const name = lesson ? lesson.title : `Урок ${p.lesson_id}`
      const date = new Date(p.created_at).toLocaleDateString('ru', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
      return `
      <div class="progress-row">
        <span class="progress-lesson-name">${escHtml(name)}</span>
        <span class="progress-result ${p.is_correct ? 'result-correct' : 'result-wrong'}">
          ${p.is_correct ? '✓ Верно' : '✗ Неверно'}
        </span>
        <span class="progress-date">${date}</span>
      </div>`
    }).join('')
  } catch {
    list.innerHTML = '<div class="empty-state"><p>Не удалось загрузить прогресс</p></div>'
  }
}

// ── PROFILE ──
async function loadProfile() {
  try {
    const res = await fetch(`${API}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) return
    const data = await res.json()

    const displayName = data.username || data.email || '—'
    const avatar = displayName[0].toUpperCase()
    document.getElementById('profile-avatar-big').textContent = avatar
    document.getElementById('profile-avatar-big').style.background = data.avatar_color || 'linear-gradient(135deg, #00d4a0, #00a0ff)'
    document.getElementById('profile-email').textContent = displayName
    document.getElementById('profile-badge').textContent = data.title || 'Beginner'
    document.getElementById('profile-xp').textContent = data.xp
    document.getElementById('profile-level').textContent = data.level
    document.getElementById('profile-streak').textContent = data.streak + ' дн.'
    document.getElementById('profile-done').textContent = completedLessons.size
    document.getElementById('profile-correct').textContent = correctLessons.size

    const total = completedLessons.size || 1
    const accuracy = Math.round((correctLessons.size / total) * 100)
    document.getElementById('profile-accuracy').textContent = accuracy + '%'

    const thresholds = [0, 50, 150, 300, 999999]
    const level = data.level
    const cur = thresholds[level - 1]
    const next = thresholds[level]
    const pct = Math.min(100, Math.round(((data.xp - cur) / (next - cur)) * 100))
    document.getElementById('profile-xp-bar').style.width = pct + '%'
    document.getElementById('profile-xp-next').textContent = `${data.xp} / ${next} XP`
    document.getElementById('profile-level-title').textContent = `Уровень ${level} → ${level + 1}`

    renderAchievements(data.xp, data.streak, completedLessons.size, correctLessons.size)
  } catch {}
}

// ── ACHIEVEMENTS ──
function renderAchievements(xp, streak, done, correct) {
  const achievements = [
    { icon: '🎯', name: 'Первый шаг', desc: 'Пройди первый урок', unlocked: done >= 1 },
    { icon: '🔥', name: 'На волне', desc: 'Стрик 3 дня подряд', unlocked: streak >= 3 },
    { icon: '⚡', name: 'Новичок', desc: 'Набери 50 XP', unlocked: xp >= 50 },
    { icon: '📚', name: 'Студент', desc: 'Пройди 5 уроков', unlocked: done >= 5 },
    { icon: '🏆', name: 'Джуниор', desc: 'Набери 150 XP', unlocked: xp >= 150 },
    { icon: '💎', name: 'Мидл', desc: 'Набери 300 XP', unlocked: xp >= 300 },
    { icon: '🎓', name: 'Отличник', desc: 'Пройди 10 уроков правильно', unlocked: correct >= 10 },
    { icon: '🚀', name: 'Марафонец', desc: 'Пройди все 20 уроков', unlocked: done >= 20 },
  ]

  const grid = document.getElementById('achievements-grid')
  grid.innerHTML = achievements.map(a => `
    <div class="achievement ${a.unlocked ? 'unlocked' : 'locked'}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
    </div>
  `).join('')
}

// ── CONFETTI ──
function launchConfetti() {
  const colors = ['#00d4a0', '#00ffbf', '#ffffff', '#a8d8a8', '#00a0ff']
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 9999;
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
      <div class="victory-title">Курс пройден!</div>
      <div class="victory-subtitle">Ты прошёл все уроки. Отличная работа!</div>
      <div class="victory-stats">
        <div class="victory-stat">
          <span class="victory-stat-value" id="v-xp">—</span>
          <span class="victory-stat-label">XP заработано</span>
        </div>
        <div class="victory-stat">
          <span class="victory-stat-value" id="v-correct">—</span>
          <span class="victory-stat-label">Правильных</span>
        </div>
        <div class="victory-stat">
          <span class="victory-stat-value" id="v-total">—</span>
          <span class="victory-stat-label">Всего уроков</span>
        </div>
      </div>
      <button class="victory-btn" onclick="closeVictory()">Продолжить →</button>
    </div>
  `
  document.body.appendChild(el)
  document.getElementById('v-correct').textContent = correctLessons.size
  document.getElementById('v-total').textContent = allLessons.length
  fetch(`${API}/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(r => r.json())
    .then(d => { document.getElementById('v-xp').textContent = d.xp })
  for (let i = 0; i < 3; i++) setTimeout(launchConfetti, i * 600)
}

function closeVictory() {
  const el = document.getElementById('victory-screen')
  if (el) el.remove()
  showView('dashboard')
}

// ── SEARCH & FILTER ──
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

// ── LEADERBOARD ──
async function loadLeaderboard() {
  const list = document.getElementById('leaderboard-list')
  list.innerHTML = '<div class="loading-state"><div class="spinner"></div><span>Загружаем...</span></div>'
  try {
    const res = await fetch(`${API}/leaderboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error()
    const data = await res.json()

    if (!data.length) {
      list.innerHTML = '<div class="empty-state"><p>Пока никого нет</p></div>'
      return
    }

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
        <div class="lb-info">
          <div class="lb-email">${escHtml(displayName)}</div>
          <div class="lb-title">${escHtml(u.title)}</div>
        </div>
        <div class="lb-xp">${u.xp} XP</div>
      </div>`
    }).join('')
  } catch {
    list.innerHTML = '<div class="empty-state"><p>Не удалось загрузить</p></div>'
  }
}

// ── SETTINGS ──
let currentAvatarColor = '#00d4a0'

async function loadSettings() {
  try {
    const res = await fetch(`${API}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) return
    const data = await res.json()

    document.getElementById('settings-username').value = data.username || ''
    document.getElementById('settings-bio').value = data.bio || ''
    document.getElementById('settings-country').value = data.country || ''

    currentAvatarColor = data.avatar_color || '#00d4a0'
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, bio, country, avatar_color: currentAvatarColor })
    })
    if (!res.ok) throw new Error()
    showToast('✓ Профиль сохранён!')
    loadMe()
  } catch {
    showToast('Ошибка при сохранении')
  }
}

async function changePassword() {
  const oldPass = document.getElementById('settings-old-pass').value
  const newPass = document.getElementById('settings-new-pass').value

  if (!oldPass || !newPass) return showToast('Заполни оба поля')
  if (newPass.length < 6) return showToast('Новый пароль минимум 6 символов')

  try {
    const res = await fetch(`${API}/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ old_password: oldPass, new_password: newPass })
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Неверный старый пароль')
    }
    showToast('✓ Пароль изменён!')
    document.getElementById('settings-old-pass').value = ''
    document.getElementById('settings-new-pass').value = ''
  } catch (e) {
    showToast('✗ ' + e.message)
  }
}

// ── TIMER ──
let timerInterval = null
let timerSeconds = 0

function startLessonTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerSeconds = 0
  updateTimerDisplay()
  timerInterval = setInterval(() => {
    timerSeconds++
    updateTimerDisplay()
  }, 1000)
}

function stopLessonTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function updateTimerDisplay() {
  const el = document.getElementById('lesson-timer')
  if (!el) return
  if (timerSeconds < 60) {
    el.textContent = `⏱ ${timerSeconds}с`
  } else {
    const m = Math.floor(timerSeconds / 60)
    const s = timerSeconds % 60
    el.textContent = `⏱ ${m}м ${s}с`
  }
}

// ── UTILS ──
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function showToast(msg) {
  const t = document.getElementById('toast')
  t.textContent = msg
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}

// ── KEYBOARD ──
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const authLogin = document.getElementById('auth-form-login')
    if (authLogin.style.display !== 'none') doLogin()
  }
})