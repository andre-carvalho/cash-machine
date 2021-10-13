# Cash Machine

The goal is to simulate the ATM API using TDD, Node.js and Mongo for basic operations like getting account balance, account statement and withdrawing money.

Another software component is a simple client required to use the ATM API.

This project is a challenge proposed by the GSW team as part of the job evaluation process.

The requirements are described in this file: [caixa_eletronico.pdf](./doc/caixa_eletronico.pdf)

## API Features

I use Postman to test API endpoints, so a test collection has been exported and can be found in the [postman](./postman/postman_collection.json) directory.

My Postman reference version: v7.36.5

#### Account endpoints

 - GET http://&lt;host&gt;:&lt;port&gt;/cashmachine/v1/account/extract
 - GET http://&lt;host&gt;:&lt;port&gt;/cashmachine/v1/account/balance
 - GET http://&lt;host&gt;:&lt;port&gt;/cashmachine/v1/account/takeout/&lt;amount&gt;

 - PUT http://&lt;host&gt;:&lt;port&gt;/cashmachine/v1/account/reset

#### Cash Box endpoints

 - GET http://&lt;host&gt;:&lt;port&gt;/cashmachine/v1/cashbox/available/notes

 - PUT http://&lt;host&gt;:&lt;port&gt;/cashmachine/v1/cashbox/reset


#### Client URL

Documents will be created in the datastore after the first call from the client URL.

 - http://&lt;host&gt;:&lt;port&gt;/client

## Installation

 > prerequisites in the development environment:

- node version v14.18.0
- npm version  6.14.15
- mongodb version 5.0

 > steps:

- clone the project
- npm install
- create and set environment variables, see .env file above
- npm start

### Database configuration

The configuration file called .env must be created in the project root before start the server.

```sh
#.env
NODE_ENV="development"
MONGO_HOST="localhost"
MONGO_PORT="27017"
MONGO_DB="cash_machine"
MONGO_USER="admin"
MONGO_PASS="102030"
API_LISTEN_PORT="3000"
```

### Optional

Configurations of Account and Cash Box:

Use the atm-config configuration file at: **./src/config/atm-config.js**

 > **After changing any settings in this file, the Account and Cash Box reset must be performed to take effect.**

#### Database instance

Suggestion to install and run MongoDB in the local machine using docker:

```sh
docker run -p 0.0.0.0:27017:27017/tcp -d --name mongo_latest -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=102030 mongo
```

### Unit tests

To create and run the unit tests, the following software components were used:

 - mocha
 - chai

To run use:

```sh
npm test
```

## Architecture (backend)

- persistence tier: JSON Documents (MongoDB)
- Data access tier: driver, model, DAO (ODM-Mongoose)
- business tier: handler services and class models
- presentation tier: routers and API endpoints

## Architecture (frontend)

- simple web UI: HTML, JavaScript, CSS


## What remains to improve?

 - unit tests and another tests;
 - exception handlers;
 - logging levels to file;
 - include swagger-ui-express to better API presentation

## Feedback

If you have any feedback, please reach me at: afacarvalho@yahoo.com.br

## License

https://opensource.org/licenses/ISC

