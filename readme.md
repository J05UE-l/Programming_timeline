# Programming timeline

Este é um projeto que tem como objetivo ajudar as pessoas a aprender a programar com um guia de ordem de estudos, ajudando o usuário a não se perder na hora de estudar.

## Requisitos

- Node.js (versão 22.13.X)
- PostgreSQL (versão 17.4.X)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/J05UE-l/Projeto-individual-.git
   cd seu-projeto
```

2. **Instalar as dependências:**
    
```bash
npm install
```
    
3. **Configurar o arquivo `.env`:**
    
Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará todas as tabelas do projeto no seu banco de dados PostgreSQL com UUID como chave primária.
    

Funcionalidades
---------------

**Linha do Tempo de Aprendizado:** Os usuários avançam por lições conectadas em formato de árvore, de forma progressiva.

**Conteúdos Interativos:** Cada lição pode conter vídeos explicativos, exercícios de múltipla escolha e desafios de código.

**Avaliação de Conhecimento:** Exercícios com perguntas práticas testam o conteúdo aprendido a cada etapa.

**Rastreamento de Progresso:** O sistema registra quais lições foram concluídas por cada usuário.

**Desafios Especiais:** Ao final de blocos de conteúdo, o aluno pode enfrentar “desafios” para testar o conhecimento em situações mais completas.

**Sistema de Feedback:** Os usuários podem enviar comentários sobre as lições, contribuindo com sugestões ou críticas.

**Banco de Dados Relacional:** Estrutura robusta com PostgreSQL utilizando UUIDs como identificadores únicos.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`services/`**: Serviços auxiliares do sistema.
* **`assets/`**: Arquivos públicos como imagens e fontes.
* **`scripts/`**: Arquivos de JavaScript públicos.
* **`styles/`**: Arquivos CSS públicos
* **`tests/`**: Arquivos de testes unitários

Contribuição
------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

Licença
-------

Este projeto está licenciado sob a Licença MIT.
