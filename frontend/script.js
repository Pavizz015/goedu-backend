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
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || data.error || 'Неверный email или пароль')
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
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || data.error || 'Ошибка регистрации')
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
}

// ── APP ENTRY ──
function enterApp() {
  document.getElementById('page-auth').classList.remove('active')
  document.getElementById('page-app').classList.add('active')
  const avatar = userEmail ? userEmail[0].toUpperCase() : '?'
  document.getElementById('user-avatar').textContent = avatar
  document.getElementById('user-email-display').textContent = userEmail
  loadLessons()
  loadProgress()
  loadMe()
}

// ── USER XP / LEVEL ──
async function loadMe() {
  try {
    const res = await fetch(`${API}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) return
    const data = await res.json()
    updateXPBar(data.xp, data.level, data.title, data.streak)
  } catch {}
}

function updateXPBar(xp, level, title, streak) {
  // XP нужно для следующего уровня
  const thresholds = [0, 50, 150, 300, 999999]
  const cur = thresholds[level - 1]
  const next = thresholds[level]
  const pct = Math.min(100, Math.round(((xp - cur) / (next - cur)) * 100))

  document.getElementById('user-title').textContent = title || 'Новичок'
  document.getElementById('user-xp').textContent = xp + ' XP'
  document.getElementById('user-level').textContent = 'Ур. ' + level
  document.getElementById('user-streak').textContent = '🔥 ' + (streak || 0) + ' дней'
  document.getElementById('xp-bar').style.width = pct + '%'
}

function showXPPopup(amount) {
  const el = document.createElement('div')
  el.className = 'xp-popup'
  el.textContent = '+' + amount + ' XP'
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}

// ── NAVIGATION ──
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))
  document.getElementById('view-' + name).classList.add('active')
  const idx = name === 'dashboard' ? 0 : name === 'progress' ? 1 : name === 'profile' ? 2 : -1
  if (idx >= 0) document.querySelectorAll('.nav-item')[idx].classList.add('active')
  if (name === 'progress') loadProgress()
  if (name === 'profile') loadProfile()
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
    return `
    <div class="lesson-card ${done ? 'completed' : ''}" onclick="openLesson(${i})">
      <div class="lesson-num">Урок ${l.id}</div>
      <div class="lesson-title">${escHtml(l.title)}</div>
      <span class="lesson-badge ${done ? 'badge-done' : 'badge-todo'}">
        ${done ? '✓ Пройдено' : 'Не пройдено'}
      </span>
    </div>`
  }).join('')
}

function openLesson(idx) {
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
      // Проверяем все ли уроки пройдены
      if (correctLessons.size + 1 >= allLessons.length) {
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

    const avatar = data.email ? data.email[0].toUpperCase() : '?'
    document.getElementById('profile-avatar-big').textContent = avatar
    document.getElementById('profile-email').textContent = data.email
    document.getElementById('profile-badge').textContent = data.title || 'Beginner'
    document.getElementById('profile-xp').textContent = data.xp
    document.getElementById('profile-level').textContent = data.level
    document.getElementById('profile-streak').textContent = data.streak + ' дн.'
    document.getElementById('profile-done').textContent = completedLessons.size
    document.getElementById('profile-correct').textContent = correctLessons.size

    const total = completedLessons.size || 1
    const accuracy = Math.round((correctLessons.size / total) * 100)
    document.getElementById('profile-accuracy').textContent = accuracy + '%'

    // XP прогресс бар
    const thresholds = [0, 50, 150, 300, 999999]
    const level = data.level
    const cur = thresholds[level - 1]
    const next = thresholds[level]
    const pct = Math.min(100, Math.round(((data.xp - cur) / (next - cur)) * 100))
    document.getElementById('profile-xp-bar').style.width = pct + '%'
    document.getElementById('profile-xp-next').textContent = `${data.xp} / ${next} XP`
    document.getElementById('profile-level-title').textContent = `Уровень ${level} → ${level + 1}`
  } catch {}
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

  // Заполняем статы
  document.getElementById('v-correct').textContent = correctLessons.size
  document.getElementById('v-total').textContent = allLessons.length

  fetch(`${API}/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(r => r.json())
    .then(d => { document.getElementById('v-xp').textContent = d.xp })

  // Запускаем конфетти ещё раз
  for (let i = 0; i < 3; i++) {
    setTimeout(launchConfetti, i * 600)
  }
}

function closeVictory() {
  const el = document.getElementById('victory-screen')
  if (el) el.remove()
  showView('dashboard')
}

// ── SEARCH ──
function filterLessons(query) {
  const q = query.toLowerCase().trim()
  const cards = document.querySelectorAll('.lesson-card')
  cards.forEach(card => {
    const title = card.querySelector('.lesson-title').textContent.toLowerCase()
    card.style.display = title.includes(q) ? '' : 'none'
  })
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