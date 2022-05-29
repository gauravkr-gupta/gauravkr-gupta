This is a simple Node.js project setup using express as framework and mongodb as database which handles user role based authentication using JWT (Json web token)
and basic CRUD to save user information.


## Installation

Use the node package manager to install.

```bash
npm install
```

## Run Project

From project root directory

```bash
node server.js
```

## API

Create User

```bash
POST: http://localhost:8080/user/create

Content-Type: application/json

Body:
{
	"name": "some name",
	"userId": "userid-to-be-given",
	"email": "xxxx@example.com",
	"phoneNumber": 9999999999,
	"password": "password@123"
}
```

Login

```bash
POST: http://localhost:8080/user/login

Content-Type: application/json

Body:
{
	"phoneNumber": 9999999999,
	"password": "password@123"
}
```


