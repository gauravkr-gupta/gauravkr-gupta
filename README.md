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

Create Todo

```bash
POST: http://localhost:8080/todo/create

Header:
Authorization: token(received in response to login request)
Content-Type: application/json

Body:
{
	"todotext": "Here goes text for todo",
}
```

Update Todo

```bash
POST: http://localhost:8080/todo/update

Header:
Authorization: token(received in response to login request)
Content-Type: application/json

Body:
{
    "id": "id of todo to be edited"
	"todotext": "Here goes text for todo",
}
```

List Todo of a user

```bash
GET: http://localhost:8080/todo/list

Header:
Authorization: token(received in response to login request)

```


