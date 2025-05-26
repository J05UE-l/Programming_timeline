# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Nome do Projeto

#### Autor do projeto

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Este projeto é uma aplicação pedagógica para aprender programação, com viés gamificado e visual. A funcionalidade principal da plataforma é uma linha do tempo tipo árvore, cujo cada nó equivale a um   e as ligações representam a progressão lógica do estudo. O conteúdo é pré-definido pelo seu autor, proporcionando progressão pedagógica bem estruturada e coerente.
Cada lição tem vídeos explicativos e exercícios, com uma metade de múltipla escolha e outra metade de edição do código. No final de cada lição, é respondido por perguntas sobre o material estudado, reforçando-se assim o conhecimento. Há também "desafios", que são provas maiores do conhecimento, comparadas com "chefões" nos jogos.
O progresso do usuário é documentado e armazenado, permitindo seguimento individual do desempenho. A aplicação tem um sistema de feedback, onde os usuários podem opinar sobre as lições.


---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados (Semana 3)

![diagrama de modelagem relacional](/Projeto-individual/assets/Programming%20course.png)

Este diagrama de Entidade-Relacionamento (DER) descreve um banco de dados projetado para gerenciar uma plataforma de aprendizado de programação gamificada. Ele permite o rastreamento de usuários, seu progresso nas lições, exercícios realizados e feedback fornecido, além de catalogar o conteúdo educacional e suas diferentes formas de apresentação.

A estrutura do banco de dados é composta pelas seguintes tabelas principais:

users (Usuários): Armazena informações sobre os usuários da plataforma, incluindo um ID único (pk, tipo UUID), nome de usuário (username, VARCHAR), email (email, VARCHAR) e senha (password, VARCHAR).

content (Conteúdo): Representa os módulos do curso. Contém um ID único (pk, UUID) e a descrição do módulo (course_modules, TEXT).

lessons (Lições): Representa as lições individuais dentro de cada módulo. Inclui um ID único (pk, UUID), título (title, VARCHAR), referência ao conteúdo (content_id, UUID), tipo (type, VARCHAR) e ordem (order, INT).

exercises (Exercícios): Contém os exercícios associados a cada lição. Possui um ID único (pk, UUID), referência à lição (lesson_id, UUID), tipo (type, VARCHAR) e conteúdo (content, TEXT).

questions (Questões): Armazena as questões específicas de cada exercício. Inclui um ID único (pk, UUID), referência ao exercício (exercise_id, UUID), texto da questão (question_text, TEXT), tipo (type, VARCHAR) e resposta (answer, TEXT).

progress (Progresso): Registra o progresso do usuário em cada lição. Contém um ID único (pk, UUID), referência ao usuário (user_id, UUID), referência à lição (lesson_id, UUID) e status de conclusão (completed, BOOLEAN).

feedback (Feedback): Armazena os comentários dos usuários sobre as lições. Possui um ID único (pk, UUID), referência ao usuário (user_id, UUID), referência à lição (lesson_id, UUID) e o comentário (comment, TEXT).

Relacionamentos Chave:

- Um usuário pode ter múltiplos registros de progresso e feedback
- Um módulo de conteúdo pode ter múltiplas lições
- Uma lição pode ter múltiplos exercícios
- Um exercício pode ter múltiplas questões
- O progresso e feedback são sempre associados a um usuário e uma lição específica

Este design de banco de dados é flexível e extensível, permitindo adicionar novos tipos de conteúdo, exercícios e funcionalidades de gamificação, mantendo a integridade e organização dos dados.

Arquivo de modelagem física do banco de dados: [init.sql](/Projeto-individual/scripts/init.sql)

### 3.1.1 BD e Models (Semana 5)

A integração entre a camada de persistência e a lógica de negócio é garantida através dos modelos implementados na pasta models/. Cada modelo representa uma tabela do banco de dados e implementa os métodos necessários para interagir com ela. Abaixo, segue a relação entre os arquivos JavaScript responsáveis pela definição dos modelos e as respectivas tabelas do banco de dados:

models/userModel.js: Define o modelo User, correspondente à tabela users. Implementa métodos para:
- Buscar todos os usuários (getAll)
- Buscar usuário por ID (getById)
- Criar novo usuário (create)
- Atualizar usuário existente (update)
- Deletar usuário (delete)

Estes modelos são utilizados pelos controllers localizados em controllers/, que implementam a lógica de acesso e manipulação dos dados via API. A estrutura do projeto mantém uma separação clara entre definição dos dados (models), regras de negócio (controllers) e rotas de acesso (routes), promovendo organização, reutilização e facilidade de manutenção.

### 3.2. Arquitetura (Semana 5)

![Diagrama de Arquitetura](/Projeto-individual/assets/architecture.png)

A aplicação segue o padrão de arquitetura MVC (Model-View-Controller) e está dividida em duas camadas principais: Front-end e Back-end.

**Front-end**
- **HTML, CSS e JS**: Tecnologias base para a construção da interface do usuário
- **EJS**: Template engine utilizada para renderizar as views dinâmicas
- **Bootstrap**: Framework CSS para estilização e responsividade
- **JavaScript**: Linguagem de programação para interatividade do lado do cliente

**Back-end**
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor
- **Express.js**: Framework para criar a API RESTful que gerencia as requisições e respostas
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações da aplicação
- **EJS**: Template engine para renderização de views no servidor

**Estrutura MVC**

**Model (Camada de Dados)**
- `models/userModel.js`: Implementa a lógica de negócios relacionada aos usuários
- `models/questionModel.js`: Gerencia as questões e suas respostas
- `models/exerciseModel.js`: Controla os exercícios e seus tipos
- `models/lessonModel.js`: Administra as lições e seu conteúdo
- `models/contentModel.js`: Gerencia os módulos de conteúdo
- `models/feedbackModel.js`: Controla o feedback dos usuários
- `models/progressModel.js`: Acompanha o progresso dos usuários

**View (Camada de Apresentação)**
- `views/`: Diretório contendo os templates EJS
  - `views/layouts/`: Templates base para as páginas
  - `views/partials/`: Componentes reutilizáveis
  - `views/pages/`: Páginas específicas da aplicação

**Controller (Camada de Controle)**
- `controllers/userController.js`: Gerencia as operações relacionadas a usuários
- `controllers/questionController.js`: Controla as operações de questões
- `controllers/exerciseController.js`: Administra os exercícios
- `controllers/lessonController.js`: Gerencia as lições
- `controllers/contentController.js`: Controla o conteúdo
- `controllers/feedbackController.js`: Administra o feedback
- `controllers/progressController.js`: Controla o progresso

**Configuração e Rotas**
- `config/database.js`: Configuração da conexão com o banco de dados
- `routes/`: Diretório contendo as definições de rotas
  - `routes/userRoutes.js`: Rotas para operações de usuários
  - `routes/questionRoutes.js`: Rotas para questões
  - `routes/exerciseRoutes.js`: Rotas para exercícios
  - `routes/lessonRoutes.js`: Rotas para lições
  - `routes/contentRoutes.js`: Rotas para conteúdo
  - `routes/feedbackRoutes.js`: Rotas para feedback
  - `routes/progressRoutes.js`: Rotas para progresso
  - `routes/frontRoutes.js`: Rotas para o frontend

**Fluxo de Dados**
1. O usuário interage com a interface no navegador
2. As requisições são enviadas para as rotas apropriadas
3. Os controllers processam as requisições e interagem com os models
4. Os models realizam operações no banco de dados
5. Os resultados são retornados através dos controllers
6. As views são renderizadas com os dados atualizados
7. A resposta é enviada de volta ao usuário

Esta arquitetura modular promove a separação de responsabilidades, facilitando a manutenção, escalabilidade e testes da aplicação.

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---