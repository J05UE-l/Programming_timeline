# WebAPI e Endpoints - Programming Timeline

## Documentação dos Endpoints

Esta documentação descreve todos os endpoints disponíveis na API RESTful do sistema Programming Timeline, uma plataforma de aprendizado.
---

## 1. Usuários (Users)

### 1.1 Listar todos os usuários
- **Endpoint:** `GET /api/users`
- **Descrição:** Retorna lista de todos os usuários cadastrados
- **Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "username": "string",
      "email": "string"
    }
  ]
}
```

### 1.2 Buscar usuário por ID
- **Endpoint:** `GET /api/users/:id`
- **Descrição:** Retorna dados de um usuário específico
- **Parâmetros:** `id` (UUID) - ID do usuário
- **Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string"
  }
}
```

### 1.3 Criar novo usuário
- **Endpoint:** `POST /api/users`
- **Descrição:** Cria um novo usuário no sistema
- **Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "string",
    "email": "string"
  }
}
```

### 1.4 Atualizar usuário
- **Endpoint:** `PUT /api/users/:id`
- **Descrição:** Atualiza dados de um usuário existente
- **Parâmetros:** `id` (UUID) - ID do usuário
- **Body:**
```json
{
  "username": "string",
  "email": "string"
}
```

### 1.5 Deletar usuário
- **Endpoint:** `DELETE /api/users/:id`
- **Descrição:** Remove um usuário do sistema
- **Parâmetros:** `id` (UUID) - ID do usuário

---

## 2. Conteúdo (Content)

### 2.1 Listar todo conteúdo
- **Endpoint:** `GET /api/content`
- **Descrição:** Retorna todos os módulos de conteúdo disponíveis
- **Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "course_modules": "string"
    }
  ]
}
```

### 2.2 Buscar conteúdo por ID
- **Endpoint:** `GET /api/content/:id`
- **Descrição:** Retorna um módulo específico de conteúdo
- **Parâmetros:** `id` (UUID) - ID do conteúdo

### 2.3 Criar novo conteúdo
- **Endpoint:** `POST /api/content`
- **Descrição:** Cria um novo módulo de conteúdo
- **Body:**
```json
{
  "course_modules": "string"
}
```

### 2.4 Atualizar conteúdo
- **Endpoint:** `PUT /api/content/:id`
- **Descrição:** Atualiza um módulo de conteúdo existente
- **Parâmetros:** `id` (UUID) - ID do conteúdo

### 2.5 Deletar conteúdo
- **Endpoint:** `DELETE /api/content/:id`
- **Descrição:** Remove um módulo de conteúdo
- **Parâmetros:** `id` (UUID) - ID do conteúdo

---

## 3. Lições (Lessons)

### 3.1 Listar todas as lições
- **Endpoint:** `GET /api/lessons`
- **Descrição:** Retorna todas as lições disponíveis
- **Query Parameters (opcionais):**
  - `content_id` (UUID) - Filtrar por módulo de conteúdo
- **Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "content_id": "uuid",
      "type": "string",
      "order": "integer"
    }
  ]
}
```

### 3.2 Buscar lição por ID
- **Endpoint:** `GET /api/lessons/:id`
- **Descrição:** Retorna uma lição específica
- **Parâmetros:** `id` (UUID) - ID da lição

### 3.3 Criar nova lição
- **Endpoint:** `POST /api/lessons`
- **Descrição:** Cria uma nova lição
- **Body:**
```json
{
  "title": "string",
  "content_id": "uuid",
  "type": "string",
  "order": "integer"
}
```

### 3.4 Atualizar lição
- **Endpoint:** `PUT /api/lessons/:id`
- **Descrição:** Atualiza uma lição existente
- **Parâmetros:** `id` (UUID) - ID da lição

### 3.5 Deletar lição
- **Endpoint:** `DELETE /api/lessons/:id`
- **Descrição:** Remove uma lição
- **Parâmetros:** `id` (UUID) - ID da lição

---

## 4. Exercícios (Exercises)

### 4.1 Listar todos os exercícios
- **Endpoint:** `GET /api/exercises`
- **Descrição:** Retorna todos os exercícios
- **Query Parameters (opcionais):**
  - `lesson_id` (UUID) - Filtrar por lição
- **Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "lesson_id": "uuid",
      "type": "string",
      "content": "string"
    }
  ]
}
```

### 4.2 Buscar exercício por ID
- **Endpoint:** `GET /api/exercises/:id`
- **Descrição:** Retorna um exercício específico
- **Parâmetros:** `id` (UUID) - ID do exercício

### 4.3 Criar novo exercício
- **Endpoint:** `POST /api/exercises`
- **Descrição:** Cria um novo exercício
- **Body:**
```json
{
  "lesson_id": "uuid",
  "type": "string",
  "content": "string"
}
```

### 4.4 Atualizar exercício
- **Endpoint:** `PUT /api/exercises/:id`
- **Descrição:** Atualiza um exercício existente
- **Parâmetros:** `id` (UUID) - ID do exercício

### 4.5 Deletar exercício
- **Endpoint:** `DELETE /api/exercises/:id`
- **Descrição:** Remove um exercício
- **Parâmetros:** `id` (UUID) - ID do exercício

---

## 5. Questões (Questions)

### 5.1 Listar todas as questões
- **Endpoint:** `GET /api/questions`
- **Descrição:** Retorna todas as questões
- **Query Parameters (opcionais):**
  - `exercise_id` (UUID) - Filtrar por exercício
- **Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exercise_id": "uuid",
      "question_text": "string",
      "type": "string",
      "answer": "string"
    }
  ]
}
```

### 5.2 Buscar questão por ID
- **Endpoint:** `GET /api/questions/:id`
- **Descrição:** Retorna uma questão específica
- **Parâmetros:** `id` (UUID) - ID da questão

### 5.3 Criar nova questão
- **Endpoint:** `POST /api/questions`
- **Descrição:** Cria uma nova questão
- **Body:**
```json
{
  "exercise_id": "uuid",
  "question_text": "string",
  "type": "string",
  "answer": "string"
}
```

### 5.4 Atualizar questão
- **Endpoint:** `PUT /api/questions/:id`
- **Descrição:** Atualiza uma questão existente
- **Parâmetros:** `id` (UUID) - ID da questão

### 5.5 Deletar questão
- **Endpoint:** `DELETE /api/questions/:id`
- **Descrição:** Remove uma questão
- **Parâmetros:** `id` (UUID) - ID da questão

### 5.6 Verificar resposta
- **Endpoint:** `POST /api/questions/:id/check`
- **Descrição:** Verifica se a resposta do usuário está correta
- **Parâmetros:** `id` (UUID) - ID da questão
- **Body:**
```json
{
  "user_answer": "string"
}
```
- **Resposta:**
```json
{
  "success": true,
  "correct": true,
  "message": "string"
}
```

---

## 6. Progresso (Progress)

### 6.1 Listar progresso do usuário
- **Endpoint:** `GET /api/progress`
- **Descrição:** Retorna o progresso de um usuário
- **Query Parameters:**
  - `user_id` (UUID) - ID do usuário
- **Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "lesson_id": "uuid",
      "completed": "boolean"
    }
  ]
}
```

### 6.2 Atualizar progresso
- **Endpoint:** `POST /api/progress`
- **Descrição:** Marca uma lição como concluída
- **Body:**
```json
{
  "user_id": "uuid",
  "lesson_id": "uuid",
  "completed": true
}
```

### 6.3 Estatísticas de progresso
- **Endpoint:** `GET /api/progress/stats/:user_id`
- **Descrição:** Retorna estatísticas gerais do progresso do usuário
- **Parâmetros:** `user_id` (UUID) - ID do usuário
- **Resposta:**
```json
{
  "success": true,
  "data": {
    "total_lessons": "integer",
    "completed_lessons": "integer",
    "progress_percentage": "number"
  }
}
```

---

## 7. Feedback

### 7.1 Listar feedback
- **Endpoint:** `GET /api/feedback`
- **Descrição:** Retorna feedback das lições
- **Query Parameters (opcionais):**
  - `lesson_id` (UUID) - Filtrar por lição
  - `user_id` (UUID) - Filtrar por usuário

### 7.2 Criar feedback
- **Endpoint:** `POST /api/feedback`
- **Descrição:** Cria um novo feedback para uma lição
- **Body:**
```json
{
  "user_id": "uuid",
  "lesson_id": "uuid",
  "comment": "string"
}
```

### 7.3 Atualizar feedback
- **Endpoint:** `PUT /api/feedback/:id`
- **Descrição:** Atualiza um feedback existente
- **Parâmetros:** `id` (UUID) - ID do feedback

### 7.4 Deletar feedback
- **Endpoint:** `DELETE /api/feedback/:id`
- **Descrição:** Remove um feedback
- **Parâmetros:** `id` (UUID) - ID do feedback

---

## 8. Rotas Frontend

### 8.1 Página inicial
- **Endpoint:** `GET /`
- **Descrição:** Renderiza a página inicial da aplicação

### 8.2 Dashboard do usuário
- **Endpoint:** `GET /dashboard`
- **Descrição:** Renderiza o dashboard com progresso do usuário

### 8.3 Timeline de lições
- **Endpoint:** `GET /timeline`
- **Descrição:** Renderiza a linha do tempo com as lições

### 8.4 Página da lição
- **Endpoint:** `GET /lesson/:id`
- **Descrição:** Renderiza uma lição específica
- **Parâmetros:** `id` (UUID) - ID da lição

### 8.5 Exercícios
- **Endpoint:** `GET /exercise/:id`
- **Descrição:** Renderiza um exercício específico
- **Parâmetros:** `id` (UUID) - ID do exercício

---

Esta documentação serve como referência para desenvolvimento e integração com a API do Programming Timeline. 