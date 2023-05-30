# Ecommerce-API
An API that enables CRUD operations on user, cart, and product data. Can be used to manage shopping over the internet.


### Technologies
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="PostgreSQL" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express.js" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="NPM" width="40" height="40"/>&nbsp;
  
</div>


### Dependencies used
   - bcrypt: ^5.1.0,
   - body-parser: ^1.20.2,
   - cookie-parser: ^1.4.6,
   - cors: ^2.8.5,
   - dotenv: ^16.0.3,
   - express: ^4.18.2,
   - express-session: ^1.17.3,
   - express-validator: ^7.0.1,
   - helmet: ^7.0.0,
   - pg: ^8.11.0,
   - validator: ^13.9.0 <br>
 dev-dependencies:
   - morgan: ^1.10.0,
   - nodemon: ^2.0.22

### Getting started
To get started, you must have the latest version of node.js and postqresql installed on your machine.


### Installation
1. First, run the command:
**npm install** To install all the dependencies required for the prjoject.

2. Second, run all the CREATE TABLE queries in db.sql in a postgresql database client, and add some data to the products table.

3. Then, in example.env, fill in the following environment variables: <br>
PORT - The port on which the Express.js server will listen on <br>
SESSION_SECRET - Your session secret <br>
DB_PORT - The port on which your database is connected to <br>
DB_USERNAME - The username you used to connect to your database <br>
DB_HOST - The host name you used to connect to your database <br>
DATABASE - Your database's name <br>
DB_PASSWORD - The password you used to connect to your database <br>

### Runing the application
First, make sure that postgresql is started. Then, In the root directory of the project, type 
**node server.js** in the terminal to get the project running.


### Acknowledgements
This project is based on Codecademy's full-stack-engineer career path portfolio project

