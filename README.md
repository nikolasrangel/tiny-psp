# tiny psp

implementação de um Payment Service Provider (PSP) para o [desafio técnico da vaga de Software Engineer](https://github.com/pagarme/vagas/tree/master/desafios/software-engineer-backend) na [Pagar.me](https://pagar.me)

## índice

- [introdução](#introdução)
- [tecnologias utilizadas](#tecnologias-utilizadas)
- [requisitos](#requisitos)
- [instalação](#instalação)
	- [copiando o projeto](#copiando-o-projeto)
  - [subindo o servidor](#subindo-o-servidor)
- [endpoints](#endpoints)
- [to-do](#to-do)

## introdução

este projeto destina-se a implementação de um PSP muito simples, cujas responsabilidades são: processar transações, retornar transações criadas, criação de pagáveis e retornar saldo.

## tecnologias utilizadas

a stack de tecnologia no projeto foi a seguinte:

- **[Docker](https://docs.docker.com)** e **[Docker Compose](https://docs.docker.com/compose/)** para a criação do ambiente de desenvolvimento;
- **[Express](https://github.com/expressjs/express)** utilizado para a criação do servidor web da API REST;
- **[PostgreSQL](https://www.postgresql.org)** como banco de dados relacional e **[Sequelize](http://docs.sequelizejs.com)** como ORM (object relational mapper);
- **[Redis](https://redis.io/)** para armazenamento de dados em memória;
- **[Escriba](https://github.com/pagarme/escriba)** como middleware para o Express para o log das requisições HTTP;
- **[Pagar.me JavaScript Style Guide](https://github.com/pagarme/javascript-style-guide)** plugin para o **[ESLint](https://eslint.org/)** como linting;


## requisitos

certifique-se que os seguintes softwares estejam instalados em sua máquina para a correta execução do projeto:
- [Docker](https://docs.docker.com/);
- [Docker Compose](https://docs.docker.com/compose/).

## instalação

a seguir, instruções para a instalação e execução do projeto:

### copiando o projeto

1. **clone o repositório:**
  ```sh
  $ git clone https://github.com/nikolasrangel/tiny-psp.git
  ```

2. **criação do arquivo .env:**

crie um arquivo `.env` na raiz do projeto com as mesmas variáveis do `.env.example`

3. **faça o build da imagem base:**
  ```sh
  $ docker-compose build server
  ```

### subindo o servidor

antes de subir nosso servidor web, é necessário subir previamente o banco Postgres (e executar suas migrações/seeds) e o Redis.

vamos lá:

1. **subindo banco Postgres, realizando as migrações e seed:**
```sh
$ make setup-postgres-db
```

2. **subindo o Redis:**
```sh
$ make start-redis
```

3. **por fim, subindo o servidor HTTP na porta default (3000):**
```sh
$ make server
```

## endpoints

esta seção tem como objetivo explicitar cada endpoint do projeto.

### 1. POST /api/v1/transaction

criação de uma nova transação

**exemplo:**

- requisição:
  > `POST /api/v1/transaction`

  ```json
  Content-Type: application/json

  {
    "amount": 15000,
    "description": "Calça que vira bermuda",
    "payment_method": "debit_card",
    "card_number": "5197364440676122",
    "card_holder_name": "NIKOLAS J R SOUZA",
    "card_expiration_date": "0120",
    "card_cvv": "323",
    "api_key": "ji919n9sahsak"
  }
  ```

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
      "id": 1,
      "amount": 15000,
      "description": "Calça que vira bermuda",
      "payment_method": "debit_card",
      "card_holder_name": "NIKOLAS J R SOUZA",
      "card_expiration_date": "0120",
      "card_cvv": "323",
      "api_key": "ji919n9sahsak",
      "card_last_digits": "6122",
      "card_brand": "mastercard",
      "updatedAt": "2019-06-10T04:02:27.501Z",
      "createdAt": "2019-06-10T04:02:27.501Z"
  }
  ```

### 2. GET /api/v1/transactions

obtendo uma lista das transações já criadas

**exemplo:**

- requisição:
  > `GET /api/v1/transaction`

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  [
    {
        "id": 1,
        "api_key": "ji919n9sahsak",
        "amount": 2000,
        "card_holder_name": "NIKOLAS J R SOUZA",
        "card_expiration_date": "0520",
        "card_last_digits": "6122",
        "card_cvv": "323",
        "card_brand": "mastercard",
        "payment_method": "credit_card",
        "description": "Apple Watch",
        "createdAt": "2019-06-10T00:38:37.479Z",
        "updatedAt": "2019-06-10T00:38:37.479Z"
    },
    {
        "id": 2,
        "api_key": "ji919n9sahsak",
        "amount": 2000,
        "card_holder_name": "NIKOLAS J R SOUZA",
        "card_expiration_date": "0520",
        "card_last_digits": "6122",
        "card_cvv": "323",
        "card_brand": "mastercard",
        "payment_method": "credit_card",
        "description": "Apple Watch",
        "createdAt": "2019-06-10T00:38:38.375Z",
        "updatedAt": "2019-06-10T00:38:38.375Z"
    }
  ]
  ```

### 3. GET /api/v1/balance

obtendo o saldo `available` e `waiting_funds` para o cliente com determinada `api_key`

**obrigatório:** requisição deve conter query string `api_key`

**exemplo:**

- requisição:
  > `GET /api/v1/balance?api_key=xxxxxxx`

- resposta:
  > `200 OK`

  ```json
  Content-Type: application/json

  {
      "object": "balance",
      "available": {
          "amount": 22310
      },
      "waiting_funds": {
          "amount": 28500
      }
  }
  ```

### 4. requisição a endpoint inexistente

ao realizar requisição em uma rota não definida, a API retornará um JSON com mensagem de erro e código HTTP específico (404)

**exemplo**

- requisição:
  > `GET /api/v1/recurso_nao_existente`

- resposta:
  > `404 NOT FOUND`

  ```json
  Content-Type: application/json

  {
      "errors": {
          "message": "Recurso procurado nao foi encontrado."
      }
  }
  ```

## utilizando

após subir o servidor web, ele estará disponível na porta 3000. assim, tem-se as seguintes opções para a realização das requisições HTTP
para teste e validação dos endpoints:

1. **utilizando cURL**:

comandos cURL disponíveis no seguinte caminho: `src/test/manual/curl`

2. **utilizando o [Postman](https://www.getpostman.com/)**:

coleção das requisições no caminho: `src/test/manual/postman-collection v2.1`


**obs:** em `src/test/data` tem-se também exemplos de demais dados para transações e cartões de crédito válidos e inválidos

## to-do
1. criar **testes** unitários e/ou de integração;
2. criar **worker** com rotina diária para verificar transações com status 'waiting_funds';
3. **monitorar** API e melhorar **error handling**.
