// Контент уроков для GoEdu.
// Темы синхронизированы с init.sql (20 уроков в БД).
// Каждый урок: title_en/title_kz + theory[] + practice{} + quiz{}.
// quiz.options идут в том же порядке что в БД (важно — answer индекс должен совпадать).

window.LESSON_CONTENT = {

  1: {
    title_en: 'Variables in Go',
    title_kz: 'Go тіліндегі айнымалылар',
    theory: [
      { type: 'h2',
        text: 'Переменные в Go',
        text_en: 'Variables in Go',
        text_kz: 'Go тіліндегі айнымалылар' },
      { type: 'p',
        text: 'В Go переменные объявляются двумя способами: через ключевое слово var или через короткое объявление :=. Тип задаётся явно или выводится автоматически.',
        text_en: 'In Go, variables are declared in two ways: with the var keyword or with the short := form. The type is either declared explicitly or inferred.',
        text_kz: 'Go-да айнымалылар екі тәсілмен жарияланады: var кілт сөзі арқылы немесе қысқа := арқылы. Тип айқын көрсетіледі немесе автоматты түрде шығарылады.' },
      { type: 'h3', text: 'Через var', text_en: 'With var', text_kz: 'var арқылы' },
      { type: 'code', text: 'var x int = 5\nvar name string = "Alex"\nvar isActive bool = true' },
      { type: 'p',
        text: 'Если значение указано — тип можно опустить, Go выведет его сам.',
        text_en: 'If a value is given, the type can be omitted — Go will infer it.',
        text_kz: 'Егер мән берілсе, типті жазбауға болады — Go оны өзі анықтайды.' },
      { type: 'code', text: 'var x = 5            // int\nvar name = "Alex"    // string' },
      { type: 'h3', text: 'Короткая форма :=', text_en: 'Short form :=', text_kz: 'Қысқа жазылым :=' },
      { type: 'p',
        text: 'Внутри функций удобнее использовать короткую запись:',
        text_en: 'Inside functions the short form is more convenient:',
        text_kz: 'Функциялар ішінде қысқа жазылымды қолданған ыңғайлы:' },
      { type: 'code', text: 'x := 5\nname := "Alex"' },
      { type: 'p',
        text: 'Это сразу и объявление, и присваивание. Работает только внутри функций.',
        text_en: 'This both declares and assigns at once. Works only inside functions.',
        text_kz: 'Бұл бір мезгілде жариялау да, меншіктеу де. Тек функциялар ішінде жұмыс істейді.' },
      { type: 'h3', text: 'Константы', text_en: 'Constants', text_kz: 'Тұрақтылар' },
      { type: 'code', text: 'const Pi = 3.14159\nconst MaxUsers = 1000' }
    ],
    practice: {
      task: 'Объяви переменную x с типом int значением 5 через var.',
      task_en: 'Declare a variable x of type int with value 5 using var.',
      task_kz: 'var арқылы 5 мәні бар int типті x айнымалысын жарияла.',
      template: '⟦1⟧ x ⟦2⟧ = 5',
      slots: { '1': 'var', '2': 'int' },
      tokens: ['var', 'let', 'const', 'int', 'string', 'float']
    },
    quiz: {
      question_en: 'How do you correctly declare a variable in Go?',
      question_kz: 'Go-да айнымалыны қалай дұрыс жариялау керек?',
      options_en: ['let x = 5', 'var x int', 'x = int'],
      options_kz: ['let x = 5', 'var x int', 'x = int']
    }
  },

  2: {
    title_en: 'Data types',
    title_kz: 'Деректер типтері',
    theory: [
      { type: 'h2', text: 'Типы данных', text_en: 'Data types', text_kz: 'Деректер типтері' },
      { type: 'p',
        text: 'В Go есть несколько базовых типов: int — целые числа, float64 — числа с плавающей точкой, string — текстовые строки, bool — логические значения. Go — строго типизированный язык, типы нельзя смешивать без явного приведения.',
        text_en: 'Go has several basic types: int for integers, float64 for floating-point numbers, string for text, bool for true/false. Go is strictly typed — types cannot be mixed without explicit conversion.',
        text_kz: 'Go-да бірнеше негізгі тип бар: int — бүтін сандар, float64 — қалқымалы нүктелі сандар, string — мәтін жолдары, bool — логикалық мәндер. Go — қатаң типтелген тіл, типтерді айқын түрлендірусіз араластыруға болмайды.' },
      { type: 'h3', text: 'Числовые типы', text_en: 'Numeric types', text_kz: 'Сандық типтер' },
      { type: 'code', text: 'var a int = 42\nvar b float64 = 3.14\nvar c uint = 100' },
      { type: 'h3', text: 'Строки', text_en: 'Strings', text_kz: 'Жолдар' },
      { type: 'p',
        text: 'Строки — это неизменяемая последовательность байтов в UTF-8. Объявляются двойными кавычками:',
        text_en: 'Strings are immutable sequences of bytes in UTF-8. Declared with double quotes:',
        text_kz: 'Жолдар — UTF-8-дегі өзгермейтін байттар тізбегі. Қос тырнақшамен жарияланады:' },
      { type: 'code', text: 's := "Hello, Go"\nmulti := `multiline\nstring`' },
      { type: 'h3', text: 'Булев тип', text_en: 'Boolean', text_kz: 'Логикалық тип' },
      { type: 'code', text: 'var ok bool = true\ndone := false' },
      { type: 'h3', text: 'Преобразование типов', text_en: 'Type conversion', text_kz: 'Типтерді түрлендіру' },
      { type: 'p',
        text: 'В Go нет неявного приведения — нужно конвертировать вручную:',
        text_en: 'Go has no implicit conversion — you must convert manually:',
        text_kz: 'Go-да жасырын түрлендіру жоқ — қолмен түрлендіру керек:' },
      { type: 'code', text: 'var i int = 42\nvar f float64 = float64(i)' }
    ],
    practice: {
      task: 'Объяви переменную name типа string со значением "Go".',
      task_en: 'Declare a variable name of type string with value "Go".',
      task_kz: '"Go" мәні бар string типті name айнымалысын жарияла.',
      template: 'var name ⟦1⟧ = ⟦2⟧',
      slots: { '1': 'string', '2': '"Go"' },
      tokens: ['string', 'int', 'bool', '"Go"', 'Go', '`Go`']
    },
    quiz: {
      question_en: 'Which data type stores text in Go?',
      question_kz: 'Go-да мәтінді сақтайтын тип қайсысы?',
      options_en: ['int', 'string', 'bool'],
      options_kz: ['int', 'string', 'bool']
    }
  },

  3: {
    title_en: 'Functions in Go',
    title_kz: 'Go-дағы функциялар',
    theory: [
      { type: 'h2', text: 'Функции в Go', text_en: 'Functions in Go', text_kz: 'Go-дағы функциялар' },
      { type: 'p',
        text: 'Функции в Go объявляются с помощью ключевого слова func. Функции могут возвращать несколько значений — это уникальная особенность Go.',
        text_en: 'Functions in Go are declared with the func keyword. A function can return multiple values — a distinctive feature of Go.',
        text_kz: 'Go-да функциялар func кілт сөзі арқылы жарияланады. Функция бірнеше мәнді қайтара алады — бұл Go-ның ерекшелігі.' },
      { type: 'h3', text: 'Базовая форма', text_en: 'Basic form', text_kz: 'Негізгі форма' },
      { type: 'code', text: 'func add(a int, b int) int {\n    return a + b\n}' },
      { type: 'h3', text: 'Сокращённые параметры', text_en: 'Short parameter list', text_kz: 'Қысқа параметрлер тізімі' },
      { type: 'p',
        text: 'Если параметры одного типа подряд, тип можно указать один раз:',
        text_en: 'If consecutive parameters share a type, write it once:',
        text_kz: 'Қатарынан бір типті параметрлер болса, типті бір рет жазуға болады:' },
      { type: 'code', text: 'func add(a, b int) int {\n    return a + b\n}' },
      { type: 'h3', text: 'Несколько возвратов', text_en: 'Multiple returns', text_kz: 'Бірнеше қайтару' },
      { type: 'code', text: 'func divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New("division by zero")\n    }\n    return a / b, nil\n}' }
    ],
    practice: {
      task: 'Объяви функцию add, которая принимает два int и возвращает int.',
      task_en: 'Declare a function add that takes two ints and returns an int.',
      task_kz: 'Екі int қабылдап int қайтаратын add функциясын жарияла.',
      template: '⟦1⟧ add(a, b ⟦2⟧) int {\n    return a + b\n}',
      slots: { '1': 'func', '2': 'int' },
      tokens: ['func', 'function', 'def', 'int', 'string', 'void']
    },
    quiz: {
      question_en: 'Which keyword is used to declare a function?',
      question_kz: 'Функцияны жариялау үшін қандай кілт сөз қолданылады?',
      options_en: ['function', 'def', 'func'],
      options_kz: ['function', 'def', 'func']
    }
  },

  4: {
    title_en: 'Loops in Go',
    title_kz: 'Go-дағы циклдар',
    theory: [
      { type: 'h2', text: 'Циклы в Go', text_en: 'Loops in Go', text_kz: 'Go-дағы циклдар' },
      { type: 'p',
        text: 'В Go есть только один вид цикла — for, но он очень гибкий и покрывает все случаи.',
        text_en: 'Go has only one loop — for, but it is flexible enough to cover all cases.',
        text_kz: 'Go-да тек бір цикл бар — for, бірақ ол өте икемді және барлық жағдайды қамтиды.' },
      { type: 'h3', text: 'Классическая форма', text_en: 'Classic form', text_kz: 'Классикалық форма' },
      { type: 'code', text: 'for i := 0; i < 10; i++ {\n    fmt.Println(i)\n}' },
      { type: 'h3', text: 'Как while', text_en: 'As a while loop', text_kz: 'while ретінде' },
      { type: 'code', text: 'for x < 100 {\n    x++\n}' },
      { type: 'h3', text: 'Бесконечный', text_en: 'Infinite', text_kz: 'Шексіз' },
      { type: 'code', text: 'for {\n    if shouldStop {\n        break\n    }\n}' },
      { type: 'h3', text: 'range', text_en: 'range', text_kz: 'range' },
      { type: 'code', text: 'nums := []int{10, 20, 30}\nfor i, v := range nums {\n    fmt.Println(i, v)\n}' }
    ],
    practice: {
      task: 'Напиши цикл от 0 до 9.',
      task_en: 'Write a loop from 0 to 9.',
      task_kz: '0-ден 9-ға дейінгі цикл жаз.',
      template: '⟦1⟧ i := 0; i < 10; i⟦2⟧ {\n    fmt.Println(i)\n}',
      slots: { '1': 'for', '2': '++' },
      tokens: ['for', 'while', 'loop', '++', '--', '+=1']
    },
    quiz: {
      question_en: 'Which loop exists in Go?',
      question_kz: 'Go-да қандай цикл бар?',
      options_en: ['while', 'for', 'foreach'],
      options_kz: ['while', 'for', 'foreach']
    }
  },

  5: {
    title_en: 'Arrays and slices',
    title_kz: 'Массивтер мен слайстар',
    theory: [
      { type: 'h2', text: 'Массивы и слайсы', text_en: 'Arrays and slices', text_kz: 'Массивтер мен слайстар' },
      { type: 'p',
        text: 'Массив в Go имеет фиксированный размер. Слайс — гибкая динамическая структура, самая используемая коллекция в Go.',
        text_en: 'Arrays in Go have a fixed size. Slices are flexible dynamic structures and the most-used collection in Go.',
        text_kz: 'Go-да массив ұзындығы бекітілген. Слайс — икемді динамикалық құрылым, Go-дағы ең көп қолданылатын жинақ.' },
      { type: 'h3', text: 'Массив', text_en: 'Array', text_kz: 'Массив' },
      { type: 'code', text: 'var arr [5]int               // массив из 5 нулей\nfruits := [3]string{"apple", "banana", "cherry"}' },
      { type: 'h3', text: 'Слайс', text_en: 'Slice', text_kz: 'Слайс' },
      { type: 'code', text: 's := []int{1, 2, 3}\ns = append(s, 4)\ns = append(s, 5, 6, 7)' },
      { type: 'h3', text: 'len и cap', text_en: 'len and cap', text_kz: 'len және cap' },
      { type: 'list',
        items: [
          'len(s) — текущее количество элементов',
          'cap(s) — ёмкость подложенного массива'
        ],
        items_en: [
          'len(s) — current number of elements',
          'cap(s) — capacity of the underlying array'
        ],
        items_kz: [
          'len(s) — элементтердің ағымдағы саны',
          'cap(s) — астыңғы массивтің сыйымдылығы'
        ] },
      { type: 'h3', text: 'Срез от среза', text_en: 'Slicing a slice', text_kz: 'Слайстан слайс' },
      { type: 'code', text: 'a := []int{10, 20, 30, 40, 50}\nb := a[1:4]   // [20 30 40]\nc := a[:3]    // [10 20 30]' }
    ],
    practice: {
      task: 'Добавь число 4 в конец слайса nums.',
      task_en: 'Append number 4 to the slice nums.',
      task_kz: 'nums слайсының соңына 4 санын қос.',
      template: 'nums := []int{1, 2, 3}\nnums = ⟦1⟧(nums, ⟦2⟧)',
      slots: { '1': 'append', '2': '4' },
      tokens: ['append', 'push', 'add', '4', '"4"', 'len']
    },
    quiz: {
      question_en: 'How do you add an element to a slice?',
      question_kz: 'Слайсқа элементті қалай қосады?',
      options_en: ['s.push(4)', 'append(s, 4)', 's.add(4)'],
      options_kz: ['s.push(4)', 'append(s, 4)', 's.add(4)']
    }
  },

  6: {
    title_en: 'Goroutines',
    title_kz: 'Горутиналар',
    theory: [
      { type: 'h2', text: 'Горутины', text_en: 'Goroutines', text_kz: 'Горутиналар' },
      { type: 'p',
        text: 'Горутины — это лёгкие потоки выполнения. Они потребляют несколько килобайт памяти, поэтому можно запускать тысячи одновременно. Запускаются ключевым словом go перед вызовом функции.',
        text_en: 'Goroutines are lightweight threads of execution. They use only a few kilobytes of memory, so you can run thousands at once. Launched with the go keyword before a function call.',
        text_kz: 'Горутиналар — жеңіл орындау ағындары. Олар бірнеше килобайт жадты пайдаланады, сондықтан мыңдағанын бір уақытта іске қосуға болады. Функция шақыруының алдындағы go кілт сөзімен іске қосылады.' },
      { type: 'h3', text: 'Запуск', text_en: 'Launching', text_kz: 'Іске қосу' },
      { type: 'code', text: 'func say(msg string) {\n    fmt.Println(msg)\n}\n\nfunc main() {\n    go say("hello")\n    say("world")\n}' },
      { type: 'h3', text: 'Анонимные', text_en: 'Anonymous', text_kz: 'Анонимдік' },
      { type: 'code', text: 'go func() {\n    fmt.Println("working in background")\n}()' },
      { type: 'h3', text: 'sync.WaitGroup', text_en: 'sync.WaitGroup', text_kz: 'sync.WaitGroup' },
      { type: 'code', text: 'var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    // work\n}()\nwg.Wait()' }
    ],
    practice: {
      task: 'Запусти функцию work в отдельной горутине.',
      task_en: 'Run the work function in a separate goroutine.',
      task_kz: 'work функциясын жеке горутинада іске қос.',
      template: 'func main() {\n    ⟦1⟧ work()\n}',
      slots: { '1': 'go' },
      tokens: ['go', 'async', 'await', 'thread', 'spawn']
    },
    quiz: {
      question_en: 'How do you launch a goroutine?',
      question_kz: 'Горутинаны қалай іске қосамыз?',
      options_en: ['thread myFunc()', 'async myFunc()', 'go myFunc()'],
      options_kz: ['thread myFunc()', 'async myFunc()', 'go myFunc()']
    }
  },

  7: {
    title_en: 'Structs',
    title_kz: 'Құрылымдар (struct)',
    theory: [
      { type: 'h2', text: 'Структуры (struct)', text_en: 'Structs', text_kz: 'Құрылымдар (struct)' },
      { type: 'p',
        text: 'Структуры в Go позволяют группировать данные разных типов под одним именем. В Go нет классов — структуры заменяют их.',
        text_en: 'Structs in Go group data of different types under a single name. Go has no classes — structs replace them.',
        text_kz: 'Go-да құрылымдар әртүрлі типтегі деректерді бір атаудың астына біріктіреді. Go-да кластар жоқ — олардың орнына struct қолданылады.' },
      { type: 'h3', text: 'Объявление', text_en: 'Declaration', text_kz: 'Жариялау' },
      { type: 'code', text: 'type Person struct {\n    Name string\n    Age  int\n}' },
      { type: 'h3', text: 'Создание', text_en: 'Creating an instance', text_kz: 'Дана жасау' },
      { type: 'code', text: 'p := Person{Name: "Alice", Age: 30}\np2 := Person{"Bob", 25}\np3 := Person{}' },
      { type: 'h3', text: 'Доступ к полям', text_en: 'Accessing fields', text_kz: 'Өрістерге қатынау' },
      { type: 'code', text: 'fmt.Println(p.Name)\np.Age = 31' },
      { type: 'h3', text: 'Методы', text_en: 'Methods', text_kz: 'Әдістер' },
      { type: 'code', text: 'func (p Person) Greet() string {\n    return "Hello, " + p.Name\n}' }
    ],
    practice: {
      task: 'Объяви тип Person с полем Name типа string.',
      task_en: 'Declare a Person type with a string Name field.',
      task_kz: 'string типті Name өрісі бар Person типін жарияла.',
      template: '⟦1⟧ Person ⟦2⟧ {\n    Name string\n    Age  int\n}',
      slots: { '1': 'type', '2': 'struct' },
      tokens: ['type', 'class', 'data', 'struct', 'object', 'record']
    },
    quiz: {
      question_en: 'What is the type for grouping data in Go called?',
      question_kz: 'Go-да деректерді топтастыруға арналған тип қалай аталады?',
      options_en: ['class', 'object', 'struct'],
      options_kz: ['class', 'object', 'struct']
    }
  },

  8: {
    title_en: 'Interfaces',
    title_kz: 'Интерфейстер',
    theory: [
      { type: 'h2', text: 'Интерфейсы', text_en: 'Interfaces', text_kz: 'Интерфейстер' },
      { type: 'p',
        text: 'Интерфейс — это набор методов. Тип автоматически реализует интерфейс, если у него есть все нужные методы. В Go нет ключевого слова implements — это называется утиной типизацией (duck typing).',
        text_en: 'An interface is a set of methods. A type automatically satisfies the interface if it has all the required methods. Go has no implements keyword — this is called duck typing.',
        text_kz: 'Интерфейс — әдістер жиынтығы. Барлық қажетті әдістері бар тип интерфейсті автоматты түрде жүзеге асырады. Go-да implements кілт сөзі жоқ — бұл duck typing деп аталады.' },
      { type: 'h3', text: 'Объявление', text_en: 'Declaration', text_kz: 'Жариялау' },
      { type: 'code', text: 'type Animal interface {\n    Sound() string\n}' },
      { type: 'h3', text: 'Реализация', text_en: 'Implementation', text_kz: 'Жүзеге асыру' },
      { type: 'code', text: 'type Dog struct{ Name string }\n\nfunc (d Dog) Sound() string {\n    return "Woof"\n}\n\nvar a Animal = Dog{Name: "Rex"}\nfmt.Println(a.Sound())' },
      { type: 'h3', text: 'Пустой интерфейс', text_en: 'Empty interface', text_kz: 'Бос интерфейс' },
      { type: 'p',
        text: 'interface{} (или any) — интерфейс без методов, ему удовлетворяет любое значение.',
        text_en: 'interface{} (or any) is the interface with no methods — any value satisfies it.',
        text_kz: 'interface{} (немесе any) — әдіссіз интерфейс, оған кез келген мән сай келеді.' },
      { type: 'code', text: 'func describe(x any) {\n    fmt.Printf("%v (%T)\\n", x, x)\n}' }
    ],
    practice: {
      task: 'Объяви интерфейс Animal с методом Sound, возвращающим string.',
      task_en: 'Declare an Animal interface with a Sound method returning string.',
      task_kz: 'string қайтаратын Sound әдісі бар Animal интерфейсін жарияла.',
      template: 'type Animal ⟦1⟧ {\n    Sound() ⟦2⟧\n}',
      slots: { '1': 'interface', '2': 'string' },
      tokens: ['interface', 'struct', 'class', 'string', 'int', 'void']
    },
    quiz: {
      question_en: 'How does a type implement an interface in Go?',
      question_kz: 'Go-да тип интерфейсті қалай жүзеге асырады?',
      options_en: ['Through the implements keyword', 'Automatically if it has the required methods', 'Through inheritance'],
      options_kz: ['implements кілт сөзі арқылы', 'Қажетті әдістері болса автоматты түрде', 'Мұрагерлік арқылы']
    }
  },

  9: {
    title_en: 'Pointers in Go',
    title_kz: 'Go-дағы көрсеткіштер',
    theory: [
      { type: 'h2', text: 'Указатели в Go', text_en: 'Pointers in Go', text_kz: 'Go-дағы көрсеткіштер' },
      { type: 'p',
        text: 'Указатель хранит адрес переменной в памяти. В Go нет арифметики указателей (как в C), что делает их безопаснее.',
        text_en: 'A pointer stores the memory address of a variable. Go has no pointer arithmetic (unlike C), which makes pointers safer.',
        text_kz: 'Көрсеткіш айнымалының жадтағы мекенжайын сақтайды. Go-да көрсеткіштер арифметикасы жоқ (C-ден айырмашылығы), сондықтан қауіпсіз.' },
      { type: 'h3', text: 'Адрес и разыменование', text_en: 'Address and dereference', text_kz: 'Мекенжай және кері сілтеу' },
      { type: 'code', text: 'x := 42\np := &x         // p — указатель на x\nfmt.Println(*p) // 42' },
      { type: 'h3', text: 'Изменение через указатель', text_en: 'Modifying through pointer', text_kz: 'Көрсеткіш арқылы өзгерту' },
      { type: 'code', text: '*p = 100\nfmt.Println(x)  // 100' },
      { type: 'h3', text: 'Передача в функцию', text_en: 'Passing to function', text_kz: 'Функцияға беру' },
      { type: 'p',
        text: 'Чтобы функция могла изменить переменную — передавай указатель:',
        text_en: 'To let a function modify a variable, pass a pointer:',
        text_kz: 'Функция айнымалыны өзгерте алуы үшін көрсеткішті бер:' },
      { type: 'code', text: 'func increment(n *int) {\n    *n++\n}\n\nx := 5\nincrement(&x)\nfmt.Println(x)   // 6' }
    ],
    practice: {
      task: 'Возьми адрес переменной x и разыменуй указатель p.',
      task_en: 'Take the address of x and dereference pointer p.',
      task_kz: 'x айнымалысының мекенжайын ал және p көрсеткішін кері сілте.',
      template: 'x := 42\np := ⟦1⟧x\nfmt.Println(⟦2⟧p)',
      slots: { '1': '&', '2': '*' },
      tokens: ['&', '*', '@', '$', '#']
    },
    quiz: {
      question_en: 'Which symbol gets the address of a variable?',
      question_kz: 'Айнымалының мекенжайын алу үшін қандай таңба қолданылады?',
      options_en: ['*', '&', '@'],
      options_kz: ['*', '&', '@']
    }
  },

  10: {
    title_en: 'Error handling',
    title_kz: 'Қателерді өңдеу',
    theory: [
      { type: 'h2', text: 'Обработка ошибок', text_en: 'Error handling', text_kz: 'Қателерді өңдеу' },
      { type: 'p',
        text: 'В Go нет исключений. Ошибки возвращаются как обычное значение второй позицией функции. Это сделано осознанно, чтобы программист всегда явно обрабатывал ошибку.',
        text_en: 'Go has no exceptions. Errors are returned as a regular value, usually the second return of a function. This is by design — the programmer must explicitly handle every error.',
        text_kz: 'Go-да ерекше жағдайлар (exceptions) жоқ. Қателер функцияның екінші мәні ретінде қайтарылады. Бұл әдейі жасалған — программист әр қатені айқын өңдеуі тиіс.' },
      { type: 'h3', text: 'Стандартный паттерн', text_en: 'Standard pattern', text_kz: 'Стандартты паттерн' },
      { type: 'code', text: 'result, err := divide(10, 0)\nif err != nil {\n    log.Fatal(err)\n}' },
      { type: 'h3', text: 'Создание ошибки', text_en: 'Creating an error', text_kz: 'Қате жасау' },
      { type: 'code', text: 'import "errors"\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New("division by zero")\n    }\n    return a / b, nil\n}' },
      { type: 'h3', text: 'Форматированные ошибки', text_en: 'Formatted errors', text_kz: 'Форматталған қателер' },
      { type: 'code', text: 'fmt.Errorf("user %d not found", userID)' }
    ],
    practice: {
      task: 'Сравни err с nil и обработай ошибку.',
      task_en: 'Compare err with nil and handle the error.',
      task_kz: 'err-ді nil-мен салыстырып, қатені өңде.',
      template: 'result, err := divide(10, 0)\nif err ⟦1⟧ ⟦2⟧ {\n    log.Fatal(err)\n}',
      slots: { '1': '!=', '2': 'nil' },
      tokens: ['!=', '==', '<>', 'nil', 'null', 'None']
    },
    quiz: {
      question_en: 'How are errors typically handled in Go?',
      question_kz: 'Go-да қателер әдетте қалай өңделеді?',
      options_en: ['With try/catch blocks', 'Through the return value', 'Through a global handler'],
      options_kz: ['try/catch блоктары арқылы', 'Қайтару мәні арқылы', 'Жаһандық өңдеуіш арқылы']
    }
  },

  11: {
    title_en: 'Channels',
    title_kz: 'Арналар (channels)',
    theory: [
      { type: 'h2', text: 'Каналы (channels)', text_en: 'Channels', text_kz: 'Арналар (channels)' },
      { type: 'p',
        text: 'Каналы — это основной способ общения между горутинами. Девиз Go: «Не общайтесь через разделяемую память — разделяйте память через общение».',
        text_en: 'Channels are the primary way to communicate between goroutines. The Go motto: "Don\'t communicate by sharing memory — share memory by communicating."',
        text_kz: 'Арналар — горутиналар арасындағы байланыстың негізгі жолы. Go ұраны: «Ортақ жад арқылы байланыспа — байланыс арқылы жадты ортақтас».' },
      { type: 'h3', text: 'Создание', text_en: 'Creation', text_kz: 'Жасау' },
      { type: 'code', text: 'ch := make(chan int)         // небуферизованный\nbuf := make(chan int, 10)    // буфер на 10' },
      { type: 'h3', text: 'Отправка и получение', text_en: 'Send and receive', text_kz: 'Жіберу және алу' },
      { type: 'code', text: 'ch <- 42       // отправить\nv := <-ch      // получить' },
      { type: 'h3', text: 'Пример', text_en: 'Example', text_kz: 'Мысал' },
      { type: 'code', text: 'func main() {\n    ch := make(chan string)\n    go func() {\n        ch <- "hello from goroutine"\n    }()\n    fmt.Println(<-ch)\n}' }
    ],
    practice: {
      task: 'Создай канал int.',
      task_en: 'Create an int channel.',
      task_kz: 'int арнасын жаса.',
      template: 'ch := ⟦1⟧(⟦2⟧ int)',
      slots: { '1': 'make', '2': 'chan' },
      tokens: ['make', 'new', 'create', 'chan', 'channel', 'int']
    },
    quiz: {
      question_en: 'How do you create a channel in Go?',
      question_kz: 'Go-да арнаны қалай жасайды?',
      options_en: ['channel int', 'make(chan int)', 'new(chan int)'],
      options_kz: ['channel int', 'make(chan int)', 'new(chan int)']
    }
  },

  12: {
    title_en: 'Maps',
    title_kz: 'Карталар (maps)',
    theory: [
      { type: 'h2', text: 'Maps (словари)', text_en: 'Maps', text_kz: 'Карталар (maps)' },
      { type: 'p',
        text: 'Map — это коллекция пар ключ-значение, аналог dict в Python или Map в JS. Доступ по ключу — O(1) в среднем.',
        text_en: 'A map is a collection of key-value pairs, similar to dict in Python or Map in JS. Lookup by key is O(1) on average.',
        text_kz: 'Map — кілт-мән жұптарының жинағы, Python-дағы dict немесе JS-тегі Map-тың аналогы. Кілт бойынша қатынау орта есеппен O(1).' },
      { type: 'h3', text: 'Создание', text_en: 'Creation', text_kz: 'Жасау' },
      { type: 'code', text: 'm := map[string]int{\n    "one": 1,\n    "two": 2,\n}\n\nm2 := make(map[string]int)' },
      { type: 'h3', text: 'Чтение и запись', text_en: 'Read and write', text_kz: 'Оқу және жазу' },
      { type: 'code', text: 'm["three"] = 3\nfmt.Println(m["one"])' },
      { type: 'h3', text: 'Проверка ключа', text_en: 'Checking for a key', text_kz: 'Кілтті тексеру' },
      { type: 'p',
        text: 'Чтобы отличить отсутствие от настоящего нуля, используется второй параметр ok:',
        text_en: 'To distinguish a missing key from a real zero, use the second ok parameter:',
        text_kz: 'Жоқтықты шын нөлден ажырату үшін екінші ok параметрі қолданылады:' },
      { type: 'code', text: 'val, ok := m["unknown"]\nif !ok {\n    fmt.Println("key not found")\n}' },
      { type: 'h3', text: 'Удаление', text_en: 'Deletion', text_kz: 'Жою' },
      { type: 'code', text: 'delete(m, "one")' }
    ],
    practice: {
      task: 'Проверь существует ли ключ "key" в карте m.',
      task_en: 'Check if the key "key" exists in map m.',
      task_kz: 'm картасында "key" кілті бар-жоғын тексер.',
      template: 'val, ⟦1⟧ := m["key"]\nif ⟦2⟧ok {\n    fmt.Println("missing")\n}',
      slots: { '1': 'ok', '2': '!' },
      tokens: ['ok', 'err', 'found', '!', '?', '~']
    },
    quiz: {
      question_en: 'How do you check if a key exists in a map?',
      question_kz: 'Картада кілт бар-жоғын қалай тексеру керек?',
      options_en: ['m.has(key)', 'val, ok := m[key]', 'm.contains(key)'],
      options_kz: ['m.has(key)', 'val, ok := m[key]', 'm.contains(key)']
    }
  },

  13: {
    title_en: 'Defer',
    title_kz: 'Defer',
    theory: [
      { type: 'h2', text: 'Defer', text_en: 'Defer', text_kz: 'Defer' },
      { type: 'p',
        text: 'defer откладывает выполнение функции до момента возврата из текущей функции. Часто используется для закрытия ресурсов, например файлов или сетевых соединений.',
        text_en: 'defer postpones a function call until the surrounding function returns. It is commonly used to close resources such as files or network connections.',
        text_kz: 'defer функция шақыруын ағымдағы функциядан қайту сәтіне дейін кейінге қалдырады. Әдетте файлдар немесе желілік қосылыстар сияқты ресурстарды жабу үшін қолданылады.' },
      { type: 'h3', text: 'Закрытие файла', text_en: 'Closing a file', text_kz: 'Файлды жабу' },
      { type: 'code', text: 'f, err := os.Open("data.txt")\nif err != nil {\n    log.Fatal(err)\n}\ndefer f.Close()\n// работа с файлом' },
      { type: 'h3', text: 'Порядок выполнения', text_en: 'Execution order', text_kz: 'Орындалу реті' },
      { type: 'p',
        text: 'Если несколько defer — выполняются в обратном порядке (LIFO, как стек).',
        text_en: 'If there are multiple defers, they run in reverse order (LIFO, like a stack).',
        text_kz: 'Бірнеше defer болса, олар кері ретпен орындалады (LIFO, стек сияқты).' },
      { type: 'code', text: 'defer fmt.Println("1")\ndefer fmt.Println("2")\ndefer fmt.Println("3")\n// Вывод: 3, 2, 1' },
      { type: 'h3', text: 'Зачем это нужно', text_en: 'Why it matters', text_kz: 'Не үшін керек' },
      { type: 'p',
        text: 'defer гарантирует, что очистка ресурсов произойдёт даже если функция завершится из-за ошибки или panic.',
        text_en: 'defer guarantees cleanup runs even if the function exits early because of an error or panic.',
        text_kz: 'defer функция қате немесе panic салдарынан мерзімінен бұрын аяқталса да тазарту орындалатынына кепілдік береді.' }
    ],
    practice: {
      task: 'Отложи закрытие файла через defer.',
      task_en: 'Defer the file Close call.',
      task_kz: 'defer арқылы файлды жабуды кейінге қалдыр.',
      template: 'f, _ := os.Open("data.txt")\n⟦1⟧ f.⟦2⟧()',
      slots: { '1': 'defer', '2': 'Close' },
      tokens: ['defer', 'delay', 'later', 'Close', 'Open', 'End']
    },
    quiz: {
      question_en: 'In what order do multiple defers execute?',
      question_kz: 'Бірнеше defer қандай ретпен орындалады?',
      options_en: ['In forward order', 'In reverse order (LIFO)', 'Simultaneously'],
      options_kz: ['Тура ретпен', 'Кері ретпен (LIFO)', 'Бір мезгілде']
    }
  },

  14: {
    title_en: 'Panic and Recover',
    title_kz: 'Panic және Recover',
    theory: [
      { type: 'h2', text: 'Panic и Recover', text_en: 'Panic and Recover', text_kz: 'Panic және Recover' },
      { type: 'p',
        text: 'panic останавливает выполнение программы — используй только в критических ситуациях. recover позволяет перехватить панику и продолжить работу.',
        text_en: 'panic stops program execution — use it only for critical situations. recover lets you catch a panic and keep running.',
        text_kz: 'panic бағдарлама орындалуын тоқтатады — тек сын жағдайларда қолдан. recover panic-ті ұстап, жұмысты жалғастыруға мүмкіндік береді.' },
      { type: 'h3', text: 'panic', text_en: 'panic', text_kz: 'panic' },
      { type: 'code', text: 'func mustOpen(path string) {\n    if path == "" {\n        panic("empty path")\n    }\n}' },
      { type: 'h3', text: 'recover внутри defer', text_en: 'recover inside defer', text_kz: 'defer ішіндегі recover' },
      { type: 'p',
        text: 'recover работает ТОЛЬКО внутри функции, отложенной через defer.',
        text_en: 'recover only works inside a function deferred via defer.',
        text_kz: 'recover тек defer арқылы кейінге қалдырылған функция ішінде жұмыс істейді.' },
      { type: 'code', text: 'defer func() {\n    if r := recover(); r != nil {\n        fmt.Println("recovered:", r)\n    }\n}()' },
      { type: 'h3', text: 'Когда использовать', text_en: 'When to use', text_kz: 'Қашан қолдану керек' },
      { type: 'p',
        text: 'panic — для непредвиденных ситуаций. Для обычных ошибок используй возврат error.',
        text_en: 'panic is for unexpected situations. For normal errors, return an error value.',
        text_kz: 'panic — күтпеген жағдайлар үшін. Қалыпты қателер үшін error мәнін қайтар.' }
    ],
    practice: {
      task: 'Перехвати панику через recover внутри defer.',
      task_en: 'Catch a panic via recover inside defer.',
      task_kz: 'defer ішіндегі recover арқылы panic-ті ұста.',
      template: 'defer func() {\n    if r := ⟦1⟧(); r != ⟦2⟧ {\n        fmt.Println("recovered")\n    }\n}()',
      slots: { '1': 'recover', '2': 'nil' },
      tokens: ['recover', 'catch', 'rescue', 'nil', 'null', 'false']
    },
    quiz: {
      question_en: 'Where can recover be used?',
      question_kz: 'recover-ді қай жерде қолдануға болады?',
      options_en: ['Anywhere in the code', 'Only inside defer', 'Only in main()'],
      options_kz: ['Кодтың кез келген жерінде', 'Тек defer ішінде', 'Тек main() ішінде']
    }
  },

  15: {
    title_en: 'Packages and imports',
    title_kz: 'Пакеттер мен импорттар',
    theory: [
      { type: 'h2', text: 'Пакеты и импорты', text_en: 'Packages and imports', text_kz: 'Пакеттер мен импорттар' },
      { type: 'p',
        text: 'Каждый файл Go принадлежит пакету. Пакет main — особенный: с него начинается исполняемая программа. Все остальные пакеты — библиотеки.',
        text_en: 'Every Go file belongs to a package. The main package is special: it marks an executable program. Every other package is a library.',
        text_kz: 'Әрбір Go файлы пакетке тиесілі. main пакеті ерекше: одан орындалатын бағдарлама басталады. Қалған барлық пакеттер — кітапханалар.' },
      { type: 'h3', text: 'Объявление и импорт', text_en: 'Declaration and import', text_kz: 'Жариялау және импорт' },
      { type: 'code', text: 'package main\n\nimport "fmt"\n\n// или несколько:\nimport (\n    "fmt"\n    "os"\n    "strings"\n)' },
      { type: 'h3', text: 'Экспорт по регистру', text_en: 'Export by case', text_kz: 'Регистр бойынша экспорт' },
      { type: 'p',
        text: 'Имя экспортируется (видно вне пакета), если начинается с заглавной буквы. fmt.Println — экспорт, fmt.println — нет.',
        text_en: 'A name is exported (visible outside the package) if it starts with an uppercase letter. fmt.Println is exported, fmt.println is not.',
        text_kz: 'Атау бас әріптен басталса экспортталады (пакеттен тыс көрінеді). fmt.Println — экспорт, fmt.println — жоқ.' },
      { type: 'code', text: 'func MyFunc() {}   // публичная\nfunc myFunc() {}   // приватная' }
    ],
    practice: {
      task: 'Создай главный пакет программы и импортируй fmt.',
      task_en: 'Declare the main package and import fmt.',
      task_kz: 'Бағдарламаның негізгі пакетін жасап, fmt-ні импортта.',
      template: '⟦1⟧ main\n\n⟦2⟧ "fmt"',
      slots: { '1': 'package', '2': 'import' },
      tokens: ['package', 'module', 'using', 'import', 'include', 'require']
    },
    quiz: {
      question_en: 'How do you make a function public in Go?',
      question_kz: 'Go-да функцияны қалай ашық (public) жасайды?',
      options_en: ['Add the word public', 'Start the name with an uppercase letter', 'Add the word export'],
      options_kz: ['public сөзін қос', 'Атауды бас әріптен баста', 'export сөзін қос']
    }
  },

  16: {
    title_en: 'Working with strings',
    title_kz: 'Жолдармен жұмыс',
    theory: [
      { type: 'h2', text: 'Работа со строками', text_en: 'Working with strings', text_kz: 'Жолдармен жұмыс' },
      { type: 'p',
        text: 'Пакет strings содержит много полезных функций для работы со строками. Это часть стандартной библиотеки Go.',
        text_en: 'The strings package contains many useful string functions. It is part of the Go standard library.',
        text_kz: 'strings пакетінде жолдармен жұмыс істеуге арналған көптеген пайдалы функциялар бар. Бұл Go стандартты кітапханасының бөлігі.' },
      { type: 'h3', text: 'Частые функции', text_en: 'Common functions', text_kz: 'Жиі қолданылатын функциялар' },
      { type: 'code', text: 'strings.Contains(s, "Go")    // true/false\nstrings.ToUpper(s)           // верхний регистр\nstrings.Split(s, ",")        // []string\nstrings.TrimSpace(s)         // убрать пробелы\nstrings.Replace(s, "a", "b", -1)' },
      { type: 'h3', text: 'Конкатенация', text_en: 'Concatenation', text_kz: 'Біріктіру' },
      { type: 'code', text: 's := "Hello, " + name\n// или через fmt:\ns := fmt.Sprintf("Hello, %s!", name)' },
      { type: 'h3', text: 'Длина', text_en: 'Length', text_kz: 'Ұзындық' },
      { type: 'p',
        text: 'len(s) возвращает длину строки в байтах, не в символах! Для подсчёта символов используй utf8.RuneCountInString.',
        text_en: 'len(s) returns the length in bytes, not characters! To count characters, use utf8.RuneCountInString.',
        text_kz: 'len(s) ұзындықты байтпен қайтарады, таңбамен емес! Таңбаларды санау үшін utf8.RuneCountInString қолдан.' }
    ],
    practice: {
      task: 'Преобразуй строку s в верхний регистр.',
      task_en: 'Convert the string s to uppercase.',
      task_kz: 's жолын жоғарғы регистрге түрлендір.',
      template: 'result := ⟦1⟧.⟦2⟧(s)',
      slots: { '1': 'strings', '2': 'ToUpper' },
      tokens: ['strings', 'string', 'str', 'ToUpper', 'Upper', 'Capitalize']
    },
    quiz: {
      question_en: 'Which package provides functions for working with strings?',
      question_kz: 'Жолдармен жұмыс істеу функциялары қандай пакетте?',
      options_en: ['strutil', 'strings', 'string'],
      options_kz: ['strutil', 'strings', 'string']
    }
  },

  17: {
    title_en: 'Struct methods',
    title_kz: 'Құрылым әдістері',
    theory: [
      { type: 'h2', text: 'Методы структур', text_en: 'Struct methods', text_kz: 'Құрылым әдістері' },
      { type: 'p',
        text: 'К структуре можно прикреплять методы. Между func и именем метода указывается получатель (receiver) — переменная типа, к которому привязан метод.',
        text_en: 'You can attach methods to a struct. Between func and the method name you put the receiver — a variable of the type the method is bound to.',
        text_kz: 'Құрылымға әдістерді бекітуге болады. func пен әдіс атауының арасында receiver — әдіс байланған типтің айнымалысы көрсетіледі.' },
      { type: 'h3', text: 'Value receiver', text_en: 'Value receiver', text_kz: 'Мәндік receiver' },
      { type: 'p',
        text: 'Метод с value receiver работает с копией — оригинал не меняется:',
        text_en: 'A method with a value receiver works on a copy — the original is not modified:',
        text_kz: 'Мәндік receiver-мен әдіс көшірмемен жұмыс істейді — түпнұсқа өзгермейді:' },
      { type: 'code', text: 'func (p Person) Greet() string {\n    return "Hello, " + p.Name\n}' },
      { type: 'h3', text: 'Pointer receiver', text_en: 'Pointer receiver', text_kz: 'Көрсеткішті receiver' },
      { type: 'p',
        text: 'Pointer receiver нужен когда метод должен изменять структуру:',
        text_en: 'A pointer receiver is needed when the method must modify the struct:',
        text_kz: 'Әдіс құрылымды өзгертуі керек болғанда көрсеткішті receiver қажет:' },
      { type: 'code', text: 'func (p *Person) SetName(n string) {\n    p.Name = n\n}' },
      { type: 'h3', text: 'Когда какой', text_en: 'Which to use', text_kz: 'Қайсысын таңдау' },
      { type: 'list',
        items: [
          'Pointer — если метод изменяет структуру',
          'Pointer — если структура большая (избегаем копирования)',
          'Для единообразия — выбери один стиль для всех методов типа'
        ],
        items_en: [
          'Pointer — if the method modifies the struct',
          'Pointer — if the struct is large (avoid copying)',
          'For consistency — use one style for all methods on a type'
        ],
        items_kz: [
          'Көрсеткіш — егер әдіс құрылымды өзгертсе',
          'Көрсеткіш — егер құрылым үлкен болса (көшіруден аулақ болу үшін)',
          'Біркелкілік үшін — типтің барлық әдістеріне бір стильді таңда'
        ] }
    ],
    practice: {
      task: 'Допиши pointer receiver для метода SetName.',
      task_en: 'Complete the pointer receiver for the SetName method.',
      task_kz: 'SetName әдісі үшін көрсеткішті receiver-ді аяқта.',
      template: 'func (p ⟦1⟧Person) ⟦2⟧(n string) {\n    p.Name = n\n}',
      slots: { '1': '*', '2': 'SetName' },
      tokens: ['*', '&', '@', 'SetName', 'Set', 'Name']
    },
    quiz: {
      question_en: 'When should you use a pointer receiver?',
      question_kz: 'Көрсеткішті receiver-ді қашан қолдану керек?',
      options_en: ['Always', 'When the method modifies the struct', 'Never'],
      options_kz: ['Әрқашан', 'Әдіс құрылымды өзгерткенде', 'Ешқашан']
    }
  },

  18: {
    title_en: 'Working with files',
    title_kz: 'Файлдармен жұмыс',
    theory: [
      { type: 'h2', text: 'Работа с файлами', text_en: 'Working with files', text_kz: 'Файлдармен жұмыс' },
      { type: 'p',
        text: 'Пакет os содержит функции для работы с файловой системой. Это часть стандартной библиотеки Go.',
        text_en: 'The os package provides file system functions. It is part of the Go standard library.',
        text_kz: 'os пакетінде файлдық жүйемен жұмыс істеу функциялары бар. Бұл Go стандартты кітапханасының бөлігі.' },
      { type: 'h3', text: 'Чтение', text_en: 'Reading', text_kz: 'Оқу' },
      { type: 'code', text: 'data, err := os.ReadFile("file.txt")\nif err != nil {\n    log.Fatal(err)\n}\nfmt.Println(string(data))' },
      { type: 'h3', text: 'Запись', text_en: 'Writing', text_kz: 'Жазу' },
      { type: 'code', text: 'content := []byte("Hello, file!")\nerr := os.WriteFile("file.txt", content, 0644)' },
      { type: 'h3', text: 'Открытие потоком', text_en: 'Opening as a stream', text_kz: 'Ағынмен ашу' },
      { type: 'p',
        text: 'Для больших файлов открывай потоком и обязательно закрывай через defer:',
        text_en: 'For large files, open as a stream and always close via defer:',
        text_kz: 'Үлкен файлдар үшін ағынмен аш және defer арқылы міндетті түрде жап:' },
      { type: 'code', text: 'f, err := os.Open("big.log")\nif err != nil {\n    log.Fatal(err)\n}\ndefer f.Close()' }
    ],
    practice: {
      task: 'Прочитай файл config.json через os.ReadFile.',
      task_en: 'Read the file config.json with os.ReadFile.',
      task_kz: 'os.ReadFile арқылы config.json файлын оқы.',
      template: 'data, err := ⟦1⟧.⟦2⟧("config.json")',
      slots: { '1': 'os', '2': 'ReadFile' },
      tokens: ['os', 'io', 'file', 'ReadFile', 'Open', 'Read']
    },
    quiz: {
      question_en: 'Which package is used to work with files in Go?',
      question_kz: 'Go-да файлдармен жұмыс істеуге қандай пакет қолданылады?',
      options_en: ['io', 'file', 'os'],
      options_kz: ['io', 'file', 'os']
    }
  },

  19: {
    title_en: 'HTTP server in Go',
    title_kz: 'Go-дағы HTTP сервері',
    theory: [
      { type: 'h2', text: 'HTTP сервер на Go', text_en: 'HTTP server in Go', text_kz: 'Go-дағы HTTP сервері' },
      { type: 'p',
        text: 'Go имеет встроенный пакет net/http для HTTP-серверов и клиентов. Не нужны сторонние фреймворки — Go идеально подходит для веб-сервисов.',
        text_en: 'Go has a built-in net/http package for HTTP servers and clients. No third-party framework needed — Go is great for web services.',
        text_kz: 'Go-да HTTP серверлері мен клиенттеріне арналған кіріктірілген net/http пакеті бар. Сыртқы фреймворктар қажет емес — Go веб-сервистерге өте қолайлы.' },
      { type: 'h3', text: 'Простой сервер', text_en: 'Simple server', text_kz: 'Қарапайым сервер' },
      { type: 'code', text: 'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintf(w, "Hello!")\n}\n\nfunc main() {\n    http.HandleFunc("/", handler)\n    http.ListenAndServe(":8080", nil)\n}' },
      { type: 'h3', text: 'Обработчик', text_en: 'Handler', text_kz: 'Өңдеуіш' },
      { type: 'p',
        text: 'Обработчик принимает ResponseWriter и Request. Через w пишем ответ, из r читаем параметры запроса.',
        text_en: 'A handler receives ResponseWriter and Request. Write the response via w, read request parameters from r.',
        text_kz: 'Өңдеуіш ResponseWriter және Request қабылдайды. Жауапты w арқылы жазамыз, сұраныс параметрлерін r-ден оқимыз.' }
    ],
    practice: {
      task: 'Зарегистрируй обработчик для пути "/" и запусти сервер на порту :8080.',
      task_en: 'Register a handler for "/" and start the server on port :8080.',
      task_kz: '"/" жолы үшін өңдеуішті тіркеп, серверді :8080 портында іске қос.',
      template: 'http.⟦1⟧("/", handler)\nhttp.⟦2⟧(":8080", nil)',
      slots: { '1': 'HandleFunc', '2': 'ListenAndServe' },
      tokens: ['HandleFunc', 'Handle', 'Route', 'ListenAndServe', 'Listen', 'Serve']
    },
    quiz: {
      question_en: 'Which package is used for an HTTP server in Go?',
      question_kz: 'Go-да HTTP сервері үшін қандай пакет қолданылады?',
      options_en: ['http', 'web', 'net/http'],
      options_kz: ['http', 'web', 'net/http']
    }
  },

  20: {
    title_en: 'JSON in Go',
    title_kz: 'Go-дағы JSON',
    theory: [
      { type: 'h2', text: 'JSON в Go', text_en: 'JSON in Go', text_kz: 'Go-дағы JSON' },
      { type: 'p',
        text: 'Пакет encoding/json позволяет работать с JSON. Marshal превращает структуру в JSON, Unmarshal — наоборот.',
        text_en: 'The encoding/json package handles JSON. Marshal turns a struct into JSON, Unmarshal does the opposite.',
        text_kz: 'encoding/json пакеті JSON-мен жұмыс істеуге мүмкіндік береді. Marshal құрылымды JSON-ға айналдырады, Unmarshal — керісінше.' },
      { type: 'h3', text: 'Сериализация', text_en: 'Serialization', text_kz: 'Сериализация' },
      { type: 'code', text: 'type User struct {\n    Name string `json:"name"`\n    Age  int    `json:"age"`\n}\n\ndata, _ := json.Marshal(User{Name: "Alex", Age: 25})\nfmt.Println(string(data))\n// {"name":"Alex","age":25}' },
      { type: 'h3', text: 'Десериализация', text_en: 'Deserialization', text_kz: 'Десериализация' },
      { type: 'code', text: 'var u User\nerr := json.Unmarshal(data, &u)' },
      { type: 'h3', text: 'Теги', text_en: 'Tags', text_kz: 'Тегтер' },
      { type: 'p',
        text: 'Теги структур управляют именами полей в JSON. omitempty пропускает пустые значения.',
        text_en: 'Struct tags control JSON field names. omitempty skips empty values.',
        text_kz: 'Құрылым тегтері JSON-дағы өріс атауларын басқарады. omitempty бос мәндерді өткізіп жібереді.' },
      { type: 'code', text: 'type User struct {\n    Name string `json:"name"`\n    Bio  string `json:"bio,omitempty"`\n}' },
      { type: 'p',
        text: 'Поздравляю — ты прошёл все 20 уроков! Дальше — пиши свои проекты и читай чужой код.',
        text_en: 'Congratulations — you finished all 20 lessons! Next: build your own projects and read other people\'s code.',
        text_kz: 'Құттықтаймын — сен барлық 20 сабақты аяқтадың! Енді — жеке жобаларыңды жаз және өзгелердің кодын оқы.' }
    ],
    practice: {
      task: 'Сериализуй структуру user в JSON.',
      task_en: 'Marshal the user struct into JSON.',
      task_kz: 'user құрылымын JSON-ға сериализациялау.',
      template: 'data, err := ⟦1⟧.⟦2⟧(user)',
      slots: { '1': 'json', '2': 'Marshal' },
      tokens: ['json', 'encoding', 'go', 'Marshal', 'Encode', 'Stringify']
    },
    quiz: {
      question_en: 'Which package is used to work with JSON in Go?',
      question_kz: 'Go-да JSON-мен жұмыс істеуге қандай пакет қолданылады?',
      options_en: ['json', 'encoding/json', 'go/json'],
      options_kz: ['json', 'encoding/json', 'go/json']
    }
  }

}