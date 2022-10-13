
This registration / logging system requires the following modules:
    "@mui/icons-material": "^5.8.4",
    "@mui/lab": "^5.0.0-alpha.100",
    "@mui/material": "^5.8.7",
    "react-crypt-gsm": "^1.0.4",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "^5.0.1",
    "react-toastify": "^9.0.8",

You will have to create an .env file in the backend with the following variables:
REACT_DATABASE_PASSWORD = which will contain the database password.
TOKEN_KEY = this representing the key with which the unique token for authorization will be generated.
The login system has the following options: creating an account with the following fields: name, first name, email and password, if the email already exists you will receive an alert in the upper right part of the screen. If the password is smaller than 6 characters, you will not be able to create the account, and if the email does not meet the requirements for the form of an email, you will not be able to create the account.

Once the account is created you will be able to log in with it, if the account exists you will be redirected to a page in case the password or email is wrong, you will receive an alert in the upper right. If all fields from the register / login are not completed, you will not be able to send the data, the submit button will be disabled.

To start the application you will need 2 terminals
1. For the frontend in which we will run the commands "cd fronted" and "npm start" exactly in this order.
2. For the backend in which we will run the commands "cd backend" and "nodemon server.js" exactly in this order.
