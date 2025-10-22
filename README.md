# MiniProjeto II - API de Anotações com Node.js, Express e MongoDB

Este repositório contém uma API RESTful completa, construída com Node.js, Express e TypeScript, utilizando MongoDB como banco de dados. A aplicação implementa um sistema de autenticação de usuários via JWT e uma funcionalidade completa de CRUD para anotações pessoais.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-darkred?style=for-the-badge)](https://mongoosejs.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## ✨ Funcionalidades

* **Autenticação de Usuários:** Sistema completo de registro e login com senhas criptografadas.
* **Autorização com JWT:** Rotas protegidas que exigem um JSON Web Token válido.
* **CRUD de Anotações:** Funcionalidade completa para Criar, Ler, Atualizar e Deletar anotações pessoais.
* **Segurança:** Um usuário só pode acessar, modificar ou deletar as suas próprias anotações.
* **Estrutura Organizada:** O código é dividido em camadas (rotas, controladores, serviços, modelos) para melhor manutenção.
* **Ambiente de Desenvolvimento com Docker:** Utiliza Docker e Docker Compose para rodar uma instância do MongoDB localmente.
* **Pronto para Produção:** Conecta-se a um cluster do MongoDB Atlas para o ambiente de produção.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Linguagem:** TypeScript
* **Banco de Dados:** MongoDB
* **ODM:** Mongoose
* **Autenticação:** JSON Web Token (JWT), bcrypt
* **Containerização:** Docker, Docker Compose
* **Deploy:** Vercel
* **Banco de Dados em Nuvem:** MongoDB Atlas

## 🚀 Como Executar Localmente

Siga os passos abaixo para configurar e rodar o projeto no seu ambiente de desenvolvimento.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/UrielHRO/backend-express-mongoDB.git
    cd seu-repositorio-mongo
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto.
    * Copie o conteúdo do arquivo `.env.example` (se houver):
 

4.  **Inicie o Ambiente Docker:**
    * Certifique-se de que o Docker Desktop está em execução.
    * Execute o comando abaixo para iniciar o contêiner do MongoDB:
    ```bash
    docker-compose up -d
    ```

5.  **Inicie a Aplicação:**
    ```bash
    npm run dev
    ```
    * A API estará disponível em `http://localhost:3000`.

## 📖 Endpoints da API

A URL base para a API é `/api`.

### Autenticação (`/api`)

| Método | Rota               | Descrição              | Autenticação |
| :----- | :----------------- | :--------------------- | :----------- |
| `POST` | `/register`        | Registra um novo usuário. | Nenhuma      |
| `POST` | `/login`           | Autentica um usuário e retorna um token JWT. | Nenhuma      |

### Anotações (`/api/notes`)

| Método   | Rota           | Descrição                                 | Autenticação |
| :------- | :------------- | :---------------------------------------- | :----------- |
| `POST`   | `/`            | Cria uma nova anotação.                   | **Requerida** |
| `GET`    | `/`            | Lista todas as anotações do usuário autenticado. | **Requerida** |
| `GET`    | `/:id`         | Retorna os detalhes de uma anotação específica. | **Requerida** |
| `PUT`    | `/:id`         | Atualiza todos os dados de uma anotação.   | **Requerida** |
| `PATCH`  | `/:id`         | Atualiza parcialmente os dados de uma anotação. | **Requerida** |
| `DELETE` | `/:id`         | Remove uma anotação.                      | **Requerida** |

## 🏗️ Estrutura do Projeto

```
.
├── src/
│   ├── controllers/      # Controla o fluxo das requisições
│   ├── database/         # Configuração de conexão do Mongoose
│   ├── middlewares/      # Middlewares (autenticação, erros)
│   ├── models/           # Definição dos Schemas do Mongoose (User, Note)
│   ├── routes/           # Definição das rotas da API
│   ├── services/         # Lógica de negócio e acesso ao banco
│   └── server.ts         # Ponto de entrada da aplicação
├── .env                  # Variáveis de ambiente (local)
├── docker-compose.yml    # Configuração do ambiente Docker
└── package.json          # Dependências e scripts do projeto
```

## ☁️ Deploy

A aplicação está configurada para deploy contínuo na [Vercel](https://mini-projeto-v1.vercel.app/). Para o ambiente de produção, é necessário configurar a variável de ambiente `MONGO_URI_PROD` no painel da Vercel com a string de conexão do [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
