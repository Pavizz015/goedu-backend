// ── i18n: переводы UI на ru / en / kz ──
// Контент уроков (теория, практика) хранится отдельно в lessons-content.js
// и остаётся на русском (это нужно переводить отдельно при наличии времени).

const I18N = {

  ru: {
    // AUTH HERO
    'auth.eyebrow': 'Курс под реальный рынок',
    'auth.headline_1': 'НАЧНИ КАРЬЕРУ В',
    'auth.headline_2': 'РАЗРАБОТКЕ',
    'auth.description': 'Освой востребованный язык Go через интерактивные уроки, drag-and-drop практику и квизы. Никакой воды — только то, что пригодится на реальной работе.',
    'auth.cta': 'Начать обучение',
    'auth.tag_year': '[ 2026 ]',
    'auth.tag_title': 'От практикующих инженеров',
    'auth.tag_desc': 'Современные подходы к Go',
    'auth.signin': 'Войти',
    'auth.signup': 'Регистрация',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.password_hint': 'Минимум 6 символов',
    'auth.login_btn': 'Войти',
    'auth.register_btn': 'Создать аккаунт',
    'auth.err_fields': 'Заполни все поля',
    'auth.err_pass_len': 'Пароль минимум 6 символов',
    'auth.err_login': 'Неверный email или пароль',
    'auth.err_register': 'Этот email уже зарегистрирован',
    'auth.logging_in': 'Входим...',
    'auth.creating': 'Создаём...',

    // NAV
    'nav.profile': 'Профиль',
    'nav.lessons': 'Уроки',
    'nav.progress': 'Прогресс',
    'nav.leaderboard': 'Лидеры',
    'nav.discuss': 'Обсуждения',
    'nav.videos': 'Видео',
    'nav.about': 'О языке',
    'nav.menu': 'Меню',

    // USER MENU
    'menu.profile': '👤 Мой профиль',
    'menu.settings': '⚙️ Настройки',
    'menu.discuss': '💬 Обсуждения',
    'menu.logout': '↗ Выйти',

    // PROFILE
    'profile.title': 'Профиль',
    'profile.subtitle': 'Твоя статистика и достижения',
    'profile.xp': 'XP',
    'profile.level': 'Уровень',
    'profile.streak': 'Стрик',
    'profile.completed': 'Пройдено уроков',
    'profile.correct': 'Правильных',
    'profile.accuracy': 'Точность',
    'profile.achievements': 'Достижения',
    'profile.next_level': 'До следующего уровня',
    'profile.go_lessons': 'Перейти к урокам →',
    'profile.progress': 'Прогресс',
    'profile.days': 'дн.',

    // DASHBOARD
    'dashboard.title': 'Курс Go',
    'dashboard.subtitle': 'Изучай язык программирования Go с нуля',
    'dashboard.stat_total': 'Всего уроков',
    'dashboard.stat_done': 'Пройдено',
    'dashboard.stat_correct': 'Правильных ответов',
    'dashboard.all_lessons': 'Все уроки',
    'dashboard.search': '🔍 Поиск по урокам...',
    'dashboard.cat_all': 'Все',
    'dashboard.cat_basics': 'Основы',
    'dashboard.cat_goroutines': 'Горутины',
    'dashboard.cat_types': 'Типы',
    'dashboard.cat_web': 'Веб',
    'dashboard.cat_stdlib': 'Стд. библиотека',
    'dashboard.diff_easy': 'Легко',
    'dashboard.diff_medium': 'Средне',
    'dashboard.diff_hard': 'Сложно',
    'dashboard.lesson_word': 'Урок',
    'dashboard.done': '✓ Пройдено',
    'dashboard.todo': 'Не пройдено',
    'dashboard.empty': 'Уроков пока нет',
    'dashboard.load_err': 'Не удалось загрузить уроки',
    'dashboard.server_hint': 'Убедись что сервер запущен на localhost:8080',

    // ABOUT GO SECTION
    'about.subtitle': 'Краткое знакомство',
    'about.title': 'О языке Go',
    'about.history_text': 'Go (или Golang) появился в Google в 2007 году. Его создали три инженера — Роберт Гризмер, Роб Пайк и Кен Томпсон. Цель была простая: сделать язык с минималистичным синтаксисом, но максимальной практической пользой — решить проблему медленной компиляции C++ и упростить разработку больших серверных систем. В 2009 году Go стал открытым, а в 2012 вышла стабильная версия 1.0. Сегодня это один из самых востребованных языков в backend-разработке.',
    'about.year_label': 'Создан',
    'about.year_value': '2009 · Google',
    'about.authors_label': 'Создатели',
    'about.authors_value': 'Роб Пайк, Кен Томпсон, Роберт Гризмер',
    'about.mascot_label': 'Маскот',
    'about.mascot_value': 'Gopher 🐹',
    'about.companies_label': 'Используют',
    'about.companies_value': 'Google, Uber, Netflix, Cloudflare',
    'about.why_title': 'Почему Go выбирают',
    'about.why_1': 'Простой и минималистичный синтаксис',
    'about.why_2': 'Очень быстрая компиляция в один бинарник',
    'about.why_3': 'Встроенная многопоточность через горутины',
    'about.why_4': 'Сборщик мусора без накладных расходов',
    'about.why_5': 'Большая стандартная библиотека',
    'about.where_title': 'Где применяется',
    'about.where_text': 'Go стал фундаментом современной cloud-инфраструктуры. На нём написаны Docker, Kubernetes, Terraform, CockroachDB, Hugo, Caddy и десятки других популярных проектов. Backend-сервисы на Go работают в Google, Uber, Twitch, Dropbox, Netflix, Cloudflare и сотнях других компаний по всему миру.',
    'about.projects_title': 'Известные проекты на Go',

    // — Кнопка тизера на дэшборде
    'about.cta_more': 'Узнать больше о Go →',

    // — Страница «О языке»
    'about.page_title': 'О языке Go',
    'about.page_subtitle': 'История, установка, настройка среды',

    // Установка
    'about.install_title': 'Установка Go',
    'about.install_intro': 'Go устанавливается на Windows, macOS и Linux. Официальная страница загрузки — go.dev/dl/. Дистрибутив весит около 100 МБ, ставится за пару минут.',

    'about.win_title': 'Windows',
    'about.win_s1': 'Зайди на go.dev/dl/ и скачай .msi-инсталлятор для Windows.',
    'about.win_s2': 'Запусти установщик. Установи Go в стандартный каталог C:\\Program Files\\Go.',
    'about.win_s3': 'Открой PowerShell или CMD и проверь установку командой ниже:',

    'about.mac_title': 'macOS',
    'about.mac_s1': 'Самый простой способ — через Homebrew:',
    'about.mac_s2': 'Альтернатива — скачать .pkg с go.dev/dl/ и запустить установщик.',
    'about.mac_s3': 'Проверка установки:',

    'about.linux_title': 'Linux',
    'about.linux_s1': 'Скачай tar.gz архив с go.dev/dl/ и распакуй в /usr/local:',
    'about.linux_s2': 'Добавь Go в PATH (через ~/.bashrc или ~/.zshrc):',
    'about.linux_s3': 'Перезагрузи терминал и проверь:',

    'about.check_caption': 'Если видишь что-то вроде "go version go1.22 ..." — Go установлен правильно.',

    // VS Code
    'about.vscode_title': 'Настройка VS Code',
    'about.vscode_intro': 'VS Code — самый популярный редактор для Go. Лёгкий, быстрый, бесплатный. Настройка занимает 5 минут.',
    'about.vscode_s1': 'Скачай VS Code с code.visualstudio.com и установи его.',
    'about.vscode_s2': 'Открой VS Code, нажми Ctrl+Shift+X (Cmd+Shift+X на Mac) — откроется панель расширений.',
    'about.vscode_s3': 'Найди расширение Go от Go Team at Google и установи его.',
    'about.vscode_s4': 'Открой любой .go файл. VS Code предложит установить вспомогательные инструменты — нажми Install All. Это добавит gopls (language server), dlv (debugger), gofmt и другие.',
    'about.vscode_s5': 'Готово. Теперь у тебя есть автодополнение, переходы по коду, отладчик и автоформатирование при сохранении.',

    // GoLand
    'about.goland_title': 'Настройка GoLand',
    'about.goland_intro': 'GoLand — это IDE от JetBrains специально для Go. Платная (но есть студенческая лицензия и 30-дневный триал). Из коробки даёт более глубокий рефакторинг, чем VS Code.',
    'about.goland_s1': 'Скачай GoLand с jetbrains.com/go. Студенты могут получить бесплатную лицензию через JetBrains Student Pack.',
    'about.goland_s2': 'Запусти установщик, прими лицензию.',
    'about.goland_s3': 'При первом запуске GoLand сам найдёт установленный Go и подхватит GOPATH/GOROOT.',
    'about.goland_s4': 'Создай новый проект: File → New → Project → Go. Укажи путь и SDK.',
    'about.goland_s5': 'Всё готово. GoLand сам подскажет когда нужно скачать модули, отформатирует код по сохранению и предложит рефакторинги.',

    // Первая программа
    'about.first_title': 'Первая программа',
    'about.first_intro': 'Создай файл main.go в любой папке и вставь этот код:',
    'about.first_run': 'Запусти из терминала:',
    'about.first_result': 'Должно вывести: Hello, World!',

    // Команды
    'about.cmd_title': 'Основные команды Go',
    'about.cmd_run': 'Запустить программу без сборки бинарника',
    'about.cmd_build': 'Скомпилировать в исполняемый файл',
    'about.cmd_mod_init': 'Создать модуль (новый проект)',
    'about.cmd_mod_tidy': 'Подтянуть/убрать зависимости в go.mod',
    'about.cmd_get': 'Установить стороннюю библиотеку',
    'about.cmd_fmt': 'Отформатировать код по стандарту Go',
    'about.cmd_test': 'Запустить тесты',
    'about.cmd_vet': 'Проверить код на подозрительные конструкции',

    // Ссылки и заметки
    'about.docs_title': 'Полезные ссылки',
    'about.docs_official': 'Официальный сайт',
    'about.docs_tour': 'Tour of Go — интерактивный туториал',
    'about.docs_playground': 'Go Playground — запуск кода в браузере',
    'about.docs_pkg': 'pkg.go.dev — документация всех пакетов',

    // LESSON
    'lesson.theory': '📖 Теория',
    'lesson.practice': '⌨ Практика',
    'lesson.quiz': '❓ Квиз',
    'lesson.back': '← Назад',
    'lesson.to_practice': 'К практике →',
    'lesson.to_quiz': 'К квизу →',
    'lesson.question_h': 'Вопрос',
    'lesson.check': 'Проверить',
    'lesson.checking': 'Проверяем...',
    'lesson.next': 'Следующий урок →',
    'lesson.task_loading': 'Загрузка задания...',
    'lesson.no_practice': 'Практика для этого урока ещё не добавлена.',
    'lesson.no_theory': 'Теория для этого урока пока не добавлена.',
    'lesson.reset': 'Сбросить',
    'lesson.fill_all': 'Заполни все ячейки перед проверкой',
    'lesson.practice_correct': '✓ Отлично! Код собран правильно.',
    'lesson.practice_wrong': '✗ Не совсем верно. Проверь токены и попробуй снова.',
    'lesson.practice_done': '✓ Готово',
    'lesson.quiz_correct': '✓ Правильно! Отличная работа!',
    'lesson.quiz_wrong': '✗ Неверно. Попробуй ещё раз в следующий раз!',
    'lesson.cells_full': 'Все ячейки заполнены — нажми «Проверить» или сбрось',

    // DISCUSS
    'discuss.title': 'Обсуждения',
    'discuss.subtitle': 'Делись знаниями и задавай вопросы',
    'discuss.create': 'Создать пост',
    'discuss.placeholder': 'Что хочешь обсудить?',
    'discuss.publish': 'Опубликовать',
    'discuss.tag_general': 'Общее',
    'discuss.tag_question': 'Вопрос',
    'discuss.tag_advice': 'Совет',
    'discuss.tag_wins': 'Успехи',
    'discuss.tag_bug': 'Баг',
    'discuss.empty': 'Пока никто не написал',
    'discuss.empty_sub': 'Будь первым, напиши что-нибудь!',
    'discuss.delete': 'Удалить',
    'discuss.posted': '✓ Пост опубликован',
    'discuss.write_first': 'Напиши что-нибудь сначала',
    'discuss.time_now': 'только что',
    'discuss.time_min': 'мин назад',
    'discuss.time_hr': 'ч назад',
    'discuss.time_days': 'дн назад',

    // PROGRESS
    'progress.title': 'Прогресс',
    'progress.subtitle': 'История твоих ответов',
    'progress.general': 'Общий прогресс',
    'progress.history': 'История ответов',
    'progress.empty': 'Ещё нет истории',
    'progress.empty_sub': 'Пройди первый урок!',
    'progress.load_err': 'Не удалось загрузить прогресс',
    'progress.correct_res': '✓ Верно',
    'progress.wrong_res': '✗ Неверно',
    'progress.percent_done': '% пройдено',

    // LEADERBOARD
    'leaderboard.title': 'Таблица лидеров',
    'leaderboard.subtitle': 'Топ 10 пользователей по XP',
    'leaderboard.empty': 'Пока никого нет',
    'leaderboard.load_err': 'Не удалось загрузить',

    // SETTINGS
    'settings.title': 'Настройки',
    'settings.subtitle': 'Управление профилем и аккаунтом',
    'settings.avatar': 'Аватарка',
    'settings.basic': 'Основная информация',
    'settings.username': 'Никнейм',
    'settings.username_ph': 'Твой никнейм',
    'settings.bio': 'О себе',
    'settings.bio_ph': 'Расскажи о себе...',
    'settings.country': 'Страна',
    'settings.country_ph': 'Выбери страну',
    'settings.save': 'Сохранить',
    'settings.security': 'Безопасность',
    'settings.old_pass': 'Старый пароль',
    'settings.new_pass': 'Новый пароль',
    'settings.change_pass': 'Сменить пароль',
    'settings.account': 'Аккаунт',
    'settings.logout': 'Выйти из аккаунта',
    'settings.saved': '✓ Профиль сохранён!',
    'settings.save_err': 'Ошибка при сохранении',
    'settings.fill_both': 'Заполни оба поля',
    'settings.new_pass_len': 'Новый пароль минимум 6 символов',
    'settings.pass_changed': '✓ Пароль изменён!',
    'settings.wrong_old': 'Неверный старый пароль',

    // VIDEOS
    'video.title': 'Видео-уроки',
    'video.subtitle': 'Полезные YouTube-видео для изучения Go',
    'video.watch': 'Смотреть на YouTube →',

    // ACHIEVEMENTS
    'ach.first_step': 'Первый шаг',
    'ach.first_step_d': 'Пройди первый урок',
    'ach.streak': 'На волне',
    'ach.streak_d': 'Стрик 3 дня подряд',
    'ach.newbie': 'Новичок',
    'ach.newbie_d': 'Набери 50 XP',
    'ach.student': 'Студент',
    'ach.student_d': 'Пройди 5 уроков',
    'ach.junior': 'Джуниор',
    'ach.junior_d': 'Набери 150 XP',
    'ach.middle': 'Мидл',
    'ach.middle_d': 'Набери 300 XP',
    'ach.honor': 'Отличник',
    'ach.honor_d': 'Пройди 10 уроков правильно',
    'ach.marathon': 'Марафонец',
    'ach.marathon_d': 'Пройди все 20 уроков',

    // VICTORY
    'victory.title': 'Курс пройден!',
    'victory.subtitle': 'Ты прошёл все уроки. Отличная работа!',
    'victory.xp': 'XP заработано',
    'victory.correct': 'Правильных',
    'victory.total': 'Всего уроков',
    'victory.continue': 'Продолжить →',
  },

  en: {
    'auth.eyebrow': 'Career-Ready Curriculum',
    'auth.headline_1': 'LAUNCH YOUR',
    'auth.headline_2': 'CODING CAREER',
    'auth.description': 'Master Go through interactive lessons, drag-and-drop practice, and quizzes. No fluff — only what you actually need on the job.',
    'auth.cta': 'Get Started',
    'auth.tag_year': '[ 2026 ]',
    'auth.tag_title': 'Taught by Industry Professionals',
    'auth.tag_desc': 'Modern Go, practical approach',
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.password_hint': 'At least 6 characters',
    'auth.login_btn': 'Sign In',
    'auth.register_btn': 'Create Account',
    'auth.err_fields': 'Fill in all fields',
    'auth.err_pass_len': 'Password must be at least 6 characters',
    'auth.err_login': 'Wrong email or password',
    'auth.err_register': 'This email is already registered',
    'auth.logging_in': 'Signing in...',
    'auth.creating': 'Creating...',

    'nav.profile': 'Profile',
    'nav.lessons': 'Lessons',
    'nav.progress': 'Progress',
    'nav.leaderboard': 'Leaderboard',
    'nav.discuss': 'Discussions',
    'nav.videos': 'Videos',
    'nav.about': 'About',
    'nav.menu': 'Menu',

    'menu.profile': '👤 My Profile',
    'menu.settings': '⚙️ Settings',
    'menu.discuss': '💬 Discussions',
    'menu.logout': '↗ Log Out',

    'profile.title': 'Profile',
    'profile.subtitle': 'Your stats and achievements',
    'profile.xp': 'XP',
    'profile.level': 'Level',
    'profile.streak': 'Streak',
    'profile.completed': 'Lessons done',
    'profile.correct': 'Correct',
    'profile.accuracy': 'Accuracy',
    'profile.achievements': 'Achievements',
    'profile.next_level': 'To next level',
    'profile.go_lessons': 'Go to lessons →',
    'profile.progress': 'Progress',
    'profile.days': 'd.',

    'dashboard.title': 'Go Course',
    'dashboard.subtitle': 'Learn Go programming from scratch',
    'dashboard.stat_total': 'Total lessons',
    'dashboard.stat_done': 'Done',
    'dashboard.stat_correct': 'Correct answers',
    'dashboard.all_lessons': 'All lessons',
    'dashboard.search': '🔍 Search lessons...',
    'dashboard.cat_all': 'All',
    'dashboard.cat_basics': 'Basics',
    'dashboard.cat_goroutines': 'Goroutines',
    'dashboard.cat_types': 'Types',
    'dashboard.cat_web': 'Web',
    'dashboard.cat_stdlib': 'Standard lib',
    'dashboard.diff_easy': 'Easy',
    'dashboard.diff_medium': 'Medium',
    'dashboard.diff_hard': 'Hard',
    'dashboard.lesson_word': 'Lesson',
    'dashboard.done': '✓ Done',
    'dashboard.todo': 'Not done',
    'dashboard.empty': 'No lessons yet',
    'dashboard.load_err': 'Failed to load lessons',
    'dashboard.server_hint': 'Make sure the server is running on localhost:8080',

    'about.subtitle': 'A quick introduction',
    'about.title': 'About Go',
    'about.history_text': 'Go (also known as Golang) was born at Google in 2007. Three engineers — Robert Griesemer, Rob Pike, and Ken Thompson — created it with a simple goal: a language with minimal syntax but maximum practical value, solving the slow compilation of C++ and simplifying large server-side development. Go went open source in 2009, and version 1.0 shipped in 2012. Today it is one of the most in-demand backend languages in the industry.',
    'about.year_label': 'Created',
    'about.year_value': '2009 · Google',
    'about.authors_label': 'Creators',
    'about.authors_value': 'Rob Pike, Ken Thompson, Robert Griesemer',
    'about.mascot_label': 'Mascot',
    'about.mascot_value': 'Gopher 🐹',
    'about.companies_label': 'Used by',
    'about.companies_value': 'Google, Uber, Netflix, Cloudflare',
    'about.why_title': 'Why people choose Go',
    'about.why_1': 'Simple, minimal syntax',
    'about.why_2': 'Blazing-fast compilation into a single binary',
    'about.why_3': 'Built-in concurrency with goroutines',
    'about.why_4': 'Garbage collector with low overhead',
    'about.why_5': 'Large standard library out of the box',
    'about.where_title': 'Where it is used',
    'about.where_text': 'Go has become the foundation of modern cloud infrastructure. Docker, Kubernetes, Terraform, CockroachDB, Hugo, Caddy and dozens of other popular projects are written in Go. Backend services at Google, Uber, Twitch, Dropbox, Netflix, Cloudflare and hundreds of other companies worldwide run on Go.',
    'about.projects_title': 'Notable Go projects',

    'about.cta_more': 'Learn more about Go →',

    'about.page_title': 'About Go',
    'about.page_subtitle': 'History, installation, IDE setup',

    'about.install_title': 'Installing Go',
    'about.install_intro': 'Go installs on Windows, macOS, and Linux. The official download page is go.dev/dl/. The distribution is around 100 MB and installs in a couple of minutes.',

    'about.win_title': 'Windows',
    'about.win_s1': 'Go to go.dev/dl/ and download the .msi installer for Windows.',
    'about.win_s2': 'Run the installer. Install Go into the default folder C:\\Program Files\\Go.',
    'about.win_s3': 'Open PowerShell or CMD and verify the installation:',

    'about.mac_title': 'macOS',
    'about.mac_s1': 'The easiest way is via Homebrew:',
    'about.mac_s2': 'Alternatively, download the .pkg from go.dev/dl/ and run the installer.',
    'about.mac_s3': 'Verify the installation:',

    'about.linux_title': 'Linux',
    'about.linux_s1': 'Download the tar.gz archive from go.dev/dl/ and extract it to /usr/local:',
    'about.linux_s2': 'Add Go to PATH (via ~/.bashrc or ~/.zshrc):',
    'about.linux_s3': 'Restart the terminal and check:',

    'about.check_caption': 'If you see something like "go version go1.22 ..." — Go is installed correctly.',

    'about.vscode_title': 'Setting up VS Code',
    'about.vscode_intro': 'VS Code is the most popular editor for Go — lightweight, fast, free. Setup takes about 5 minutes.',
    'about.vscode_s1': 'Download VS Code from code.visualstudio.com and install it.',
    'about.vscode_s2': 'Open VS Code, press Ctrl+Shift+X (Cmd+Shift+X on Mac) — the Extensions panel opens.',
    'about.vscode_s3': 'Find the Go extension by Go Team at Google and install it.',
    'about.vscode_s4': 'Open any .go file. VS Code will prompt to install helper tools — click Install All. This adds gopls (language server), dlv (debugger), gofmt and others.',
    'about.vscode_s5': 'Done. You now have autocomplete, go-to-definition, debugger, and format-on-save.',

    'about.goland_title': 'Setting up GoLand',
    'about.goland_intro': 'GoLand is a JetBrains IDE made specifically for Go. Paid (but there is a student license and a 30-day trial). Offers deeper refactoring out of the box than VS Code.',
    'about.goland_s1': 'Download GoLand from jetbrains.com/go. Students can get a free license via JetBrains Student Pack.',
    'about.goland_s2': 'Run the installer and accept the license.',
    'about.goland_s3': 'On first launch GoLand auto-detects your Go installation and picks up GOPATH/GOROOT.',
    'about.goland_s4': 'Create a new project: File → New → Project → Go. Choose location and SDK.',
    'about.goland_s5': 'All set. GoLand prompts to download modules, formats code on save, and suggests refactorings.',

    'about.first_title': 'Your first program',
    'about.first_intro': 'Create a file main.go in any folder and paste this code:',
    'about.first_run': 'Run from the terminal:',
    'about.first_result': 'You should see: Hello, World!',

    'about.cmd_title': 'Essential Go commands',
    'about.cmd_run': 'Run a program without building a binary',
    'about.cmd_build': 'Compile into an executable',
    'about.cmd_mod_init': 'Create a module (new project)',
    'about.cmd_mod_tidy': 'Add or clean dependencies in go.mod',
    'about.cmd_get': 'Install a third-party library',
    'about.cmd_fmt': 'Format code to the Go standard',
    'about.cmd_test': 'Run tests',
    'about.cmd_vet': 'Check the code for suspicious constructs',

    'about.docs_title': 'Useful links',
    'about.docs_official': 'Official site',
    'about.docs_tour': 'Tour of Go — interactive tutorial',
    'about.docs_playground': 'Go Playground — run code in your browser',
    'about.docs_pkg': 'pkg.go.dev — docs for all packages',

    'lesson.theory': '📖 Theory',
    'lesson.practice': '⌨ Practice',
    'lesson.quiz': '❓ Quiz',
    'lesson.back': '← Back',
    'lesson.to_practice': 'To practice →',
    'lesson.to_quiz': 'To quiz →',
    'lesson.question_h': 'Question',
    'lesson.check': 'Check',
    'lesson.checking': 'Checking...',
    'lesson.next': 'Next lesson →',
    'lesson.task_loading': 'Loading task...',
    'lesson.no_practice': 'Practice for this lesson is not added yet.',
    'lesson.no_theory': 'Theory for this lesson is not added yet.',
    'lesson.reset': 'Reset',
    'lesson.fill_all': 'Fill all slots before checking',
    'lesson.practice_correct': '✓ Excellent! Code is assembled correctly.',
    'lesson.practice_wrong': '✗ Not quite right. Check the tokens and try again.',
    'lesson.practice_done': '✓ Done',
    'lesson.quiz_correct': '✓ Correct! Great job!',
    'lesson.quiz_wrong': '✗ Wrong. Try again next time!',
    'lesson.cells_full': 'All slots filled — press "Check" or reset',

    'discuss.title': 'Discussions',
    'discuss.subtitle': 'Share knowledge and ask questions',
    'discuss.create': 'Create a post',
    'discuss.placeholder': 'What do you want to discuss?',
    'discuss.publish': 'Publish',
    'discuss.tag_general': 'General',
    'discuss.tag_question': 'Question',
    'discuss.tag_advice': 'Advice',
    'discuss.tag_wins': 'Wins',
    'discuss.tag_bug': 'Bug',
    'discuss.empty': 'No one has posted yet',
    'discuss.empty_sub': 'Be the first to write something!',
    'discuss.delete': 'Delete',
    'discuss.posted': '✓ Post published',
    'discuss.write_first': 'Write something first',
    'discuss.time_now': 'just now',
    'discuss.time_min': 'min ago',
    'discuss.time_hr': 'h ago',
    'discuss.time_days': 'd ago',

    'progress.title': 'Progress',
    'progress.subtitle': 'Your answers history',
    'progress.general': 'Overall progress',
    'progress.history': 'Answers history',
    'progress.empty': 'No history yet',
    'progress.empty_sub': 'Complete your first lesson!',
    'progress.load_err': 'Failed to load progress',
    'progress.correct_res': '✓ Correct',
    'progress.wrong_res': '✗ Wrong',
    'progress.percent_done': '% done',

    'leaderboard.title': 'Leaderboard',
    'leaderboard.subtitle': 'Top 10 users by XP',
    'leaderboard.empty': 'No one here yet',
    'leaderboard.load_err': 'Failed to load',

    'settings.title': 'Settings',
    'settings.subtitle': 'Manage profile and account',
    'settings.avatar': 'Avatar',
    'settings.basic': 'Basic info',
    'settings.username': 'Username',
    'settings.username_ph': 'Your username',
    'settings.bio': 'About',
    'settings.bio_ph': 'Tell us about yourself...',
    'settings.country': 'Country',
    'settings.country_ph': 'Choose country',
    'settings.save': 'Save',
    'settings.security': 'Security',
    'settings.old_pass': 'Old password',
    'settings.new_pass': 'New password',
    'settings.change_pass': 'Change password',
    'settings.account': 'Account',
    'settings.logout': 'Log out',
    'settings.saved': '✓ Profile saved!',
    'settings.save_err': 'Save failed',
    'settings.fill_both': 'Fill both fields',
    'settings.new_pass_len': 'New password must be at least 6 characters',
    'settings.pass_changed': '✓ Password changed!',
    'settings.wrong_old': 'Wrong old password',

    'video.title': 'Video lessons',
    'video.subtitle': 'Useful YouTube videos to learn Go',
    'video.watch': 'Watch on YouTube →',

    'ach.first_step': 'First step',
    'ach.first_step_d': 'Complete the first lesson',
    'ach.streak': 'On fire',
    'ach.streak_d': '3-day streak',
    'ach.newbie': 'Newbie',
    'ach.newbie_d': 'Earn 50 XP',
    'ach.student': 'Student',
    'ach.student_d': 'Complete 5 lessons',
    'ach.junior': 'Junior',
    'ach.junior_d': 'Earn 150 XP',
    'ach.middle': 'Middle',
    'ach.middle_d': 'Earn 300 XP',
    'ach.honor': 'Honors',
    'ach.honor_d': 'Get 10 correct lessons',
    'ach.marathon': 'Marathoner',
    'ach.marathon_d': 'Complete all 20 lessons',

    'victory.title': 'Course completed!',
    'victory.subtitle': "You've finished all lessons. Awesome job!",
    'victory.xp': 'XP earned',
    'victory.correct': 'Correct',
    'victory.total': 'Total lessons',
    'victory.continue': 'Continue →',
  },

  kz: {
    'auth.eyebrow': 'Нарық сұранысына сай курс',
    'auth.headline_1': 'БАҒДАРЛАМАЛАУ',
    'auth.headline_2': 'МАМАНДЫҒЫН БАСТА',
    'auth.description': 'Go тілін интерактивті сабақтар, drag-and-drop тәжірибе және квиздер арқылы үйрен. Артық сөз жоқ — тек жұмыста керек дүние.',
    'auth.cta': 'Бастау',
    'auth.tag_year': '[ 2026 ]',
    'auth.tag_title': 'Тәжірибелі инженерлерден',
    'auth.tag_desc': 'Заманауи Go тәсілдері',
    'auth.signin': 'Кіру',
    'auth.signup': 'Тіркелу',
    'auth.email': 'Email',
    'auth.password': 'Құпиясөз',
    'auth.password_hint': 'Кемінде 6 таңба',
    'auth.login_btn': 'Кіру',
    'auth.register_btn': 'Аккаунт жасау',
    'auth.err_fields': 'Барлық өрістерді толтыр',
    'auth.err_pass_len': 'Құпиясөз кемінде 6 таңба',
    'auth.err_login': 'Email немесе құпиясөз қате',
    'auth.err_register': 'Бұл email тіркелген',
    'auth.logging_in': 'Кіріп жатырмыз...',
    'auth.creating': 'Жасап жатырмыз...',

    'nav.profile': 'Профиль',
    'nav.lessons': 'Сабақтар',
    'nav.progress': 'Үлгерім',
    'nav.leaderboard': 'Көшбасшылар',
    'nav.discuss': 'Талқылау',
    'nav.videos': 'Бейне',
    'nav.about': 'Тіл туралы',
    'nav.menu': 'Мәзір',

    'menu.profile': '👤 Менің профилім',
    'menu.settings': '⚙️ Баптаулар',
    'menu.discuss': '💬 Талқылау',
    'menu.logout': '↗ Шығу',

    'profile.title': 'Профиль',
    'profile.subtitle': 'Сенің статистикаң мен жетістіктерің',
    'profile.xp': 'XP',
    'profile.level': 'Деңгей',
    'profile.streak': 'Стрик',
    'profile.completed': 'Аяқталған сабақтар',
    'profile.correct': 'Дұрыс',
    'profile.accuracy': 'Дәлдік',
    'profile.achievements': 'Жетістіктер',
    'profile.next_level': 'Келесі деңгейге дейін',
    'profile.go_lessons': 'Сабақтарға өту →',
    'profile.progress': 'Үлгерім',
    'profile.days': 'күн',

    'dashboard.title': 'Go курсы',
    'dashboard.subtitle': 'Go тілін нөлден үйрен',
    'dashboard.stat_total': 'Барлық сабақтар',
    'dashboard.stat_done': 'Аяқталды',
    'dashboard.stat_correct': 'Дұрыс жауаптар',
    'dashboard.all_lessons': 'Барлық сабақтар',
    'dashboard.search': '🔍 Сабақтан іздеу...',
    'dashboard.cat_all': 'Барлығы',
    'dashboard.cat_basics': 'Негіздер',
    'dashboard.cat_goroutines': 'Горутиналар',
    'dashboard.cat_types': 'Типтер',
    'dashboard.cat_web': 'Веб',
    'dashboard.cat_stdlib': 'Стд. кітапхана',
    'dashboard.diff_easy': 'Оңай',
    'dashboard.diff_medium': 'Орташа',
    'dashboard.diff_hard': 'Қиын',
    'dashboard.lesson_word': 'Сабақ',
    'dashboard.done': '✓ Аяқталды',
    'dashboard.todo': 'Аяқталмаған',
    'dashboard.empty': 'Әзірше сабақ жоқ',
    'dashboard.load_err': 'Сабақтарды жүктеу мүмкін болмады',
    'dashboard.server_hint': 'Сервер localhost:8080-де іске қосулы екенін тексер',

    'about.subtitle': 'Қысқаша таныстыру',
    'about.title': 'Go тілі туралы',
    'about.history_text': 'Go (немесе Golang) тілі 2007 жылы Google компаниясында пайда болды. Оны үш инженер — Роберт Гризмер, Роб Пайк және Кен Томпсон жасады. Олардың мақсаты қарапайым еді: минималды синтаксисі бар, бірақ практикалық пайдасы жоғары тіл жасау — C++ тілінің баяу компиляциясы мәселесін шешу және үлкен серверлік жүйелерді әзірлеуді жеңілдету. Go 2009 жылы ашық бастапқы код ретінде шығарылды, ал 2012 жылы 1.0 тұрақты нұсқасы шықты. Бүгінде бұл backend-әзірлеудегі ең сұранысқа ие тілдердің бірі.',
    'about.year_label': 'Жасалған жыл',
    'about.year_value': '2009 · Google',
    'about.authors_label': 'Жасаушылар',
    'about.authors_value': 'Роб Пайк, Кен Томпсон, Роберт Гризмер',
    'about.mascot_label': 'Талисман',
    'about.mascot_value': 'Gopher 🐹',
    'about.companies_label': 'Қолданатын компаниялар',
    'about.companies_value': 'Google, Uber, Netflix, Cloudflare',
    'about.why_title': 'Go-ны не үшін таңдайды',
    'about.why_1': 'Қарапайым және минималистік синтаксис',
    'about.why_2': 'Бір бинарлық файлға өте жылдам компиляция',
    'about.why_3': 'Горутиналар арқылы кіріктірілген көппроцессорлық',
    'about.why_4': 'Үстеме шығынсыз қоқыс жинаушы',
    'about.why_5': 'Үлкен стандартты кітапхана',
    'about.where_title': 'Қайда қолданылады',
    'about.where_text': 'Go заманауи cloud-инфрақұрылымның негізіне айналды. Docker, Kubernetes, Terraform, CockroachDB, Hugo, Caddy және басқа да ондаған танымал жобалар Go-да жазылған. Google, Uber, Twitch, Dropbox, Netflix, Cloudflare сияқты әлемнің жүздеген компанияларының backend-сервистері Go-да жұмыс істейді.',
    'about.projects_title': 'Go-дағы танымал жобалар',

    'about.cta_more': 'Go туралы көбірек білу →',

    'about.page_title': 'Go тілі туралы',
    'about.page_subtitle': 'Тарихы, орнатылуы, орта баптауы',

    'about.install_title': 'Go-ны орнату',
    'about.install_intro': 'Go Windows, macOS және Linux жүйелеріне орнатылады. Ресми жүктеу беті — go.dev/dl/. Дистрибутивтің көлемі шамамен 100 МБ, бірнеше минутта орнатылады.',

    'about.win_title': 'Windows',
    'about.win_s1': 'go.dev/dl/ сайтына кір және Windows үшін .msi орнатушыны жүкте.',
    'about.win_s2': 'Орнатушыны іске қос. Go-ны әдепкі C:\\Program Files\\Go қалтасына орнат.',
    'about.win_s3': 'PowerShell немесе CMD ашып, орнатуды тексер:',

    'about.mac_title': 'macOS',
    'about.mac_s1': 'Ең оңай тәсіл — Homebrew арқылы:',
    'about.mac_s2': 'Балама — go.dev/dl/ сайтынан .pkg жүктеп, орнатушыны іске қосу.',
    'about.mac_s3': 'Орнатуды тексеру:',

    'about.linux_title': 'Linux',
    'about.linux_s1': 'go.dev/dl/ сайтынан tar.gz архивін жүктеп, /usr/local-ге аш:',
    'about.linux_s2': 'Go-ны PATH-қа қос (~/.bashrc немесе ~/.zshrc арқылы):',
    'about.linux_s3': 'Терминалды қайта іске қос және тексер:',

    'about.check_caption': 'Егер "go version go1.22 ..." сияқты нәрсе көрсең — Go дұрыс орнатылған.',

    'about.vscode_title': 'VS Code баптау',
    'about.vscode_intro': 'VS Code — Go үшін ең танымал редактор. Жеңіл, жылдам, тегін. Баптау 5 минутқа созылады.',
    'about.vscode_s1': 'code.visualstudio.com сайтынан VS Code-ты жүктеп орнат.',
    'about.vscode_s2': 'VS Code-ты ашып, Ctrl+Shift+X (Mac-те Cmd+Shift+X) бас — Extensions панелі ашылады.',
    'about.vscode_s3': 'Go Team at Google авторынан Go кеңейтуін тауып орнат.',
    'about.vscode_s4': 'Кез келген .go файлды аш. VS Code қосымша құралдарды орнатуды ұсынады — Install All бас. Бұл gopls (language server), dlv (debugger), gofmt және басқаларын қосады.',
    'about.vscode_s5': 'Дайын. Енді сенде автотолтыру, кодқа өту, отладчик және сақтау кезінде автоформаттау бар.',

    'about.goland_title': 'GoLand баптау',
    'about.goland_intro': 'GoLand — JetBrains компаниясының арнайы Go үшін жасалған IDE-сі. Ақылы (бірақ студенттік лицензия және 30 күндік триал бар). VS Code-қа қарағанда тереңірек рефакторингті ұсынады.',
    'about.goland_s1': 'jetbrains.com/go сайтынан GoLand-ты жүкте. Студенттер JetBrains Student Pack арқылы тегін лицензия ала алады.',
    'about.goland_s2': 'Орнатушыны іске қосып, лицензияны қабылда.',
    'about.goland_s3': 'Алғаш іске қосылғанда GoLand орнатылған Go-ны өзі тауып, GOPATH/GOROOT-ты қабылдайды.',
    'about.goland_s4': 'Жаңа жоба жаса: File → New → Project → Go. Жолды және SDK-ны көрсет.',
    'about.goland_s5': 'Барлығы дайын. GoLand модульдерді жүктеу қажет болғанда хабарлайды, кодты сақтау кезінде форматтайды және рефакторингтерді ұсынады.',

    'about.first_title': 'Алғашқы бағдарлама',
    'about.first_intro': 'Кез келген қалтада main.go файлын жасап, осы кодты қой:',
    'about.first_run': 'Терминалдан іске қос:',
    'about.first_result': 'Шығаруы керек: Hello, World!',

    'about.cmd_title': 'Go-ның негізгі командалары',
    'about.cmd_run': 'Бинарлық файл құрмастан бағдарламаны іске қосу',
    'about.cmd_build': 'Орындалатын файлға компиляциялау',
    'about.cmd_mod_init': 'Модуль жасау (жаңа жоба)',
    'about.cmd_mod_tidy': 'go.mod-та тәуелсіздіктерді қосу/жою',
    'about.cmd_get': 'Үшінші тарап кітапханасын орнату',
    'about.cmd_fmt': 'Go стандарты бойынша кодты форматтау',
    'about.cmd_test': 'Тесттерді іске қосу',
    'about.cmd_vet': 'Кодты күмәнді конструкцияларға тексеру',

    'about.docs_title': 'Пайдалы сілтемелер',
    'about.docs_official': 'Ресми сайт',
    'about.docs_tour': 'Tour of Go — интерактивті оқу құралы',
    'about.docs_playground': 'Go Playground — браузерде код іске қосу',
    'about.docs_pkg': 'pkg.go.dev — барлық пакеттердің құжаттамасы',

    'lesson.theory': '📖 Теория',
    'lesson.practice': '⌨ Тәжірибе',
    'lesson.quiz': '❓ Квиз',
    'lesson.back': '← Артқа',
    'lesson.to_practice': 'Тәжірибеге →',
    'lesson.to_quiz': 'Квизге →',
    'lesson.question_h': 'Сұрақ',
    'lesson.check': 'Тексеру',
    'lesson.checking': 'Тексеріп жатырмыз...',
    'lesson.next': 'Келесі сабақ →',
    'lesson.task_loading': 'Тапсырма жүктелуде...',
    'lesson.no_practice': 'Бұл сабаққа тәжірибе әлі қосылмаған.',
    'lesson.no_theory': 'Бұл сабаққа теория әлі қосылмаған.',
    'lesson.reset': 'Тазарту',
    'lesson.fill_all': 'Тексерместен бұрын барлық ұяларды толтыр',
    'lesson.practice_correct': '✓ Тамаша! Код дұрыс жинақталды.',
    'lesson.practice_wrong': '✗ Толық дұрыс емес. Токендерді тексеріп қайта көр.',
    'lesson.practice_done': '✓ Дайын',
    'lesson.quiz_correct': '✓ Дұрыс! Жарайсың!',
    'lesson.quiz_wrong': '✗ Қате. Келесі жолы тағы көр!',
    'lesson.cells_full': 'Барлық ұяшықтар толды — «Тексеру» бас немесе тазарт',

    'discuss.title': 'Талқылау',
    'discuss.subtitle': 'Білімімен бөліс, сұрақ қой',
    'discuss.create': 'Пост жасау',
    'discuss.placeholder': 'Не туралы талқылағың келеді?',
    'discuss.publish': 'Жариялау',
    'discuss.tag_general': 'Жалпы',
    'discuss.tag_question': 'Сұрақ',
    'discuss.tag_advice': 'Кеңес',
    'discuss.tag_wins': 'Жетістік',
    'discuss.tag_bug': 'Қате',
    'discuss.empty': 'Әзірше ешкім жазбаған',
    'discuss.empty_sub': 'Бірінші болып жаз!',
    'discuss.delete': 'Өшіру',
    'discuss.posted': '✓ Пост жарияланды',
    'discuss.write_first': 'Алдымен бірдеңе жаз',
    'discuss.time_now': 'дәл қазір',
    'discuss.time_min': 'мин бұрын',
    'discuss.time_hr': 'сағ бұрын',
    'discuss.time_days': 'күн бұрын',

    'progress.title': 'Үлгерім',
    'progress.subtitle': 'Жауаптарың тарихы',
    'progress.general': 'Жалпы үлгерім',
    'progress.history': 'Жауаптар тарихы',
    'progress.empty': 'Әзірше тарих жоқ',
    'progress.empty_sub': 'Бірінші сабақты аяқта!',
    'progress.load_err': 'Үлгерімді жүктеу мүмкін болмады',
    'progress.correct_res': '✓ Дұрыс',
    'progress.wrong_res': '✗ Қате',
    'progress.percent_done': '% аяқталды',

    'leaderboard.title': 'Көшбасшылар тізімі',
    'leaderboard.subtitle': 'XP бойынша топ 10 пайдаланушы',
    'leaderboard.empty': 'Әзірше ешкім жоқ',
    'leaderboard.load_err': 'Жүктеу мүмкін болмады',

    'settings.title': 'Баптаулар',
    'settings.subtitle': 'Профиль мен аккаунтты басқару',
    'settings.avatar': 'Аватар',
    'settings.basic': 'Негізгі ақпарат',
    'settings.username': 'Лақап ат',
    'settings.username_ph': 'Сенің лақап атың',
    'settings.bio': 'Өзім туралы',
    'settings.bio_ph': 'Өзің туралы айт...',
    'settings.country': 'Ел',
    'settings.country_ph': 'Елді таңда',
    'settings.save': 'Сақтау',
    'settings.security': 'Қауіпсіздік',
    'settings.old_pass': 'Ескі құпиясөз',
    'settings.new_pass': 'Жаңа құпиясөз',
    'settings.change_pass': 'Құпиясөз өзгерту',
    'settings.account': 'Аккаунт',
    'settings.logout': 'Аккаунттан шығу',
    'settings.saved': '✓ Профиль сақталды!',
    'settings.save_err': 'Сақтау кезінде қате',
    'settings.fill_both': 'Екі өрісті де толтыр',
    'settings.new_pass_len': 'Жаңа құпиясөз кемінде 6 таңба',
    'settings.pass_changed': '✓ Құпиясөз өзгертілді!',
    'settings.wrong_old': 'Ескі құпиясөз қате',

    'video.title': 'Бейне сабақтар',
    'video.subtitle': 'Go үйренуге пайдалы YouTube видеолары',
    'video.watch': 'YouTube-та қарау →',

    'ach.first_step': 'Алғашқы қадам',
    'ach.first_step_d': 'Бірінші сабақты аяқта',
    'ach.streak': 'Толқында',
    'ach.streak_d': '3 күн қатарынан стрик',
    'ach.newbie': 'Жаңадан үйренуші',
    'ach.newbie_d': '50 XP жина',
    'ach.student': 'Студент',
    'ach.student_d': '5 сабақты аяқта',
    'ach.junior': 'Джуниор',
    'ach.junior_d': '150 XP жина',
    'ach.middle': 'Мидл',
    'ach.middle_d': '300 XP жина',
    'ach.honor': 'Үздік',
    'ach.honor_d': '10 сабақты дұрыс аяқта',
    'ach.marathon': 'Марафоншы',
    'ach.marathon_d': 'Барлық 20 сабақты аяқта',

    'victory.title': 'Курс аяқталды!',
    'victory.subtitle': 'Сен барлық сабақтарды өттің. Жарайсың!',
    'victory.xp': 'XP жиналды',
    'victory.correct': 'Дұрыс',
    'victory.total': 'Барлық сабақтар',
    'victory.continue': 'Жалғастыру →',
  }
}

// ── API ──
let currentLang = localStorage.getItem('goedu_lang') || 'ru'

function t(key) {
  const dict = I18N[currentLang] || I18N.ru
  return dict[key] !== undefined ? dict[key] : (I18N.ru[key] !== undefined ? I18N.ru[key] : key)
}

function setLang(lang) {
  if (!I18N[lang]) return
  currentLang = lang
  localStorage.setItem('goedu_lang', lang)
  document.documentElement.setAttribute('lang', lang)
  applyLang()
  // обновить переключатели в обоих местах
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang)
  })
  // перерисовать динамические части
  if (typeof renderLessons === 'function') renderLessons()
  // Перерисовать открытый урок (теорию + практику + заголовок), если он активен
  if (typeof currentLesson !== 'undefined' && currentLesson &&
      document.getElementById('view-lesson')?.classList.contains('active')) {
    const content = window.LESSON_CONTENT && window.LESSON_CONTENT[currentLesson.id]
    const localized = (content && lang !== 'ru') ? (content['title_' + lang] || currentLesson.title) : currentLesson.title
    const titleEl = document.getElementById('lesson-title-display')
    if (titleEl) titleEl.textContent = localized
    if (typeof renderTheory === 'function') renderTheory(currentLesson)
    // Перерисовать квиз если он на экране и ещё не отвечен (нет .correct/.wrong)
    if (typeof renderQuiz === 'function') {
      const answered = document.querySelector('.quiz-option.correct, .quiz-option.wrong')
      if (!answered) renderQuiz(currentLesson)
    }
    // Перерисовываем практику только если её ещё не начинали (чтобы не сбрасывать прогресс)
    if (typeof renderPractice === 'function' && typeof practiceState !== 'undefined') {
      const allEmpty = practiceState && Object.values(practiceState.slotValues || {}).every(v => v == null)
      if (allEmpty || !practiceState) renderPractice(currentLesson)
      else {
        // Хотя бы task переведём без сброса прогресса
        const data = window.LESSON_CONTENT?.[currentLesson.id]?.practice
        const taskEl = document.getElementById('practice-task')
        if (data && taskEl) taskEl.textContent = tr(data, 'task') || data.task
      }
    }
  }
  if (typeof renderDiscussList === 'function') renderDiscussList()
  if (typeof loadProfile === 'function' && document.getElementById('view-profile')?.classList.contains('active')) {
    loadProfile()
  }
  if (typeof renderVideos === 'function') renderVideos()
}

function getLang() { return currentLang }

// Применить переводы ко всем элементам с data-i18n
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const attr = el.getAttribute('data-i18n-attr')
    if (attr) {
      el.setAttribute(attr, t(key))
    } else {
      el.textContent = t(key)
    }
  })
}

window.t = t
window.setLang = setLang
window.getLang = getLang
window.applyLang = applyLang