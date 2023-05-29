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

### Getting started
To get started, you must have the lates version of node.js and postqresql installed on your machine.


### Installation
1. First, run the command:
**npm install** To install al the project's packages.

2. Second, run all the CREATE TABLE queries in db.sql in a postgresql database client, and add some data to the products table.

3. Then, in example.env, fill in the following environment variables: 
PORT - The port on which the Express.js server will listen on
SESSION_SECRET - Your session secret
DB_PORT - The port on which your database is connected to
DB_USERNAME - The username you used to connect to your database
DB_HOST - The host name you used to connect to your database
DATABASE - Your database's name
DB_PASSWORD - The password you used to connect to your database

### Runing the application
First, make sure that postgresql is started. Then, In the root directory of the project, type 
**node server.js** in the terminal to get the project running.


### Acknowledgements
This project is based on Codecademy's full-stack-engineer career path portfolio project

