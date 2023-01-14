
# Task-manager-api

Task-manager-api is a Node.js application that provides an API for board with tasks  managment. 

## Version
1.0.0

## Installation
Clone the repository and install the dependencies: 
```bash 
git clone https://github.com/Raul-code1/task-manager-v1-api


npm install 
``` 
Start the application: 
```bash 
npm start  # or npm run dev for development mode with nodemon 
```  

 ## Dependencies 

 * bcryptjs ^2.4.3  
 * cors ^2.8.5  
 * dotenv ^16.0.3  
 * express ^4.18.2  
 * express-async-errors ^3.1.1  
 * helmet ^6.0.1  
 * http-status-codes ^2.2.0  
 * jsonwebtoken ^9.0


------------------------------------------------------------

# Task Manager Backend

This is the backend for a task manager application. It is built using Node.js, Express, MongoDB and other packages.

## Getting Started

To get started, clone the repository and install the dependencies: 
```bash 
git clone https://github.com/Raul-code1/task-manager-v1-api.git 
cd task-manager-backend 
npm install 
``` 
Then create a `.env` file with your environment variables and start the server:   
-MONGO_URI
-PORT
-JWT_SECRET
-JWT_EXPIRE
```bash 
npm start 
``` 

 ## Features

 - Authentication using JWT tokens.  
 - Create and manage boards and tasks.  
 - Security features such as helmet, xss-clean and cors.  

 ## Routes

 - `/auth`: authentication routes for signup and login.  
 - `/board`: routes for creating, updating, deleting boards and tasks (requires authentication).  

 ## Dependencies

 - [express](https://www.npmjs.com/package/express): web framework for Node.js  
 - [mongoose](https://www.npmjs.com/package/mongoose): object modeling for MongoDB  
 - [dotenv](https://www.npmjs.com/package/dotenv): loading environment variables from a .env file  
