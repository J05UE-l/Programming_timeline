-- Ativar extensão de UUID (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_modules TEXT
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR,
  content_id UUID REFERENCES content(id),
  type VARCHAR,
  "order" INT
);

CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id),
  type VARCHAR,
  content TEXT
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercise_id UUID REFERENCES exercises(id),
  question_text TEXT,
  type VARCHAR,
  answer TEXT
);

CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN
);

CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  comment TEXT
);

-- Ativar extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Inserir conteúdos
INSERT INTO content (course_modules) VALUES
('Módulo 1: Fundamentos do JavaScript'),
('Módulo 2: Controle de Fluxo');

-- Inserir usuários
INSERT INTO users (username, email, password) VALUES
('ana_dev', 'ana@example.com', 'senha123'),
('joao_js', 'joao@example.com', '123segredo');

-- Inserir lições
INSERT INTO lessons (title, content_id, type, "order") VALUES
('Introdução ao JavaScript',
 (SELECT id FROM content WHERE course_modules = 'Módulo 1: Fundamentos do JavaScript'),
 'content', 1),

('Variáveis e Tipos de Dados',
 (SELECT id FROM content WHERE course_modules = 'Módulo 1: Fundamentos do JavaScript'),
 'content', 2),

('Condicionais',
 (SELECT id FROM content WHERE course_modules = 'Módulo 2: Controle de Fluxo'),
 'content', 3),

('Desafio: Mini Calculadora',
 (SELECT id FROM content WHERE course_modules = 'Módulo 2: Controle de Fluxo'),
 'challenge', 4);

-- Inserir exercícios
INSERT INTO exercises (lesson_id, type, content) VALUES
((SELECT id FROM lessons WHERE title = 'Introdução ao JavaScript'), 'video', 'https://video.com/introducao-js'),

((SELECT id FROM lessons WHERE title = 'Variáveis e Tipos de Dados'), 'multiple_choice', 'Qual das opções declara uma variável em JS?'),

((SELECT id FROM lessons WHERE title = 'Variáveis e Tipos de Dados'), 'code', 'Declare uma variável chamada nome e atribua "Maria".'),

((SELECT id FROM lessons WHERE title = 'Desafio: Mini Calculadora'), 'code', 'Crie uma função que soma dois números.');

-- Inserir perguntas
INSERT INTO questions (exercise_id, question_text, type, answer) VALUES
((SELECT id FROM exercises WHERE content = 'Qual das opções declara uma variável em JS?'),
 'Como declarar uma variável?', 'multiple_choice', 'let x = 5;'),

((SELECT id FROM exercises WHERE content = 'Declare uma variável chamada nome e atribua "Maria".'),
 'Escreva uma linha de código que declare uma variável "nome" com valor "Maria".', 'code', 'let nome = "Maria";');

-- Inserir progresso
INSERT INTO progress (user_id, lesson_id, completed) VALUES
((SELECT id FROM users WHERE username = 'ana_dev'),
 (SELECT id FROM lessons WHERE title = 'Introdução ao JavaScript'), true),

((SELECT id FROM users WHERE username = 'ana_dev'),
 (SELECT id FROM lessons WHERE title = 'Variáveis e Tipos de Dados'), false),

((SELECT id FROM users WHERE username = 'joao_js'),
 (SELECT id FROM lessons WHERE title = 'Introdução ao JavaScript'), true);

-- Inserir feedback
INSERT INTO feedback (user_id, lesson_id, comment) VALUES
((SELECT id FROM users WHERE username = 'ana_dev'),
 (SELECT id FROM lessons WHERE title = 'Introdução ao JavaScript'),
 'Gostei muito da explicação introdutória!'),

((SELECT id FROM users WHERE username = 'joao_js'),
 (SELECT id FROM lessons WHERE title = 'Variáveis e Tipos de Dados'),
 'As questões podiam ter mais exemplos.');
