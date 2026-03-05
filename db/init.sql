CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  theory TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  answer INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed lessons (вставить, если таблица пустая)
INSERT INTO lessons (title, theory, question, options, answer)
SELECT
  'Переменные в Go',
  'В Go переменные объявляются через var или :=',
  'Как правильно объявить переменную?',
  '["let x = 5","var x int","x = int"]'::jsonb,
  1
WHERE NOT EXISTS (SELECT 1 FROM lessons);

INSERT INTO lessons (title, theory, question, options, answer)
SELECT
  'Типы данных',
  'Частые типы: int, float64, string, bool',
  'Какой тип хранит текст?',
  '["int","string","bool"]'::jsonb,
  1
WHERE (SELECT COUNT(*) FROM lessons) = 1;