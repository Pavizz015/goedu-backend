const registerBox = document.getElementById('register-box');
const loginBox = document.getElementById('login-box');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');

const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');

const lessonsContainer = document.getElementById('lessons-container');

// переключение между формами
showLogin.addEventListener('click', () => {
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});
showRegister.addEventListener('click', () => {
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
});

// регистрация
registerBtn.addEventListener('click', async () => {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const res = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        alert('Регистрация успешна! Теперь войдите.');
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    } else {
        alert('Ошибка: ' + data.error);
    }
});

// логин
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Вход успешен! Загружаем уроки...');
        document.getElementById('auth-container').classList.add('hidden');
        lessonsContainer.classList.remove('hidden');

        // тут можно вызывать функцию для загрузки уроков
        loadLessons();
    } else {
        alert('Ошибка входа: ' + data.error);
    }
});

// пример функции loadLessons (можно потом заменить на полный функционал)
async function loadLessons() {
    lessonsContainer.innerHTML = "<p>Уроки будут тут...</p>";
}