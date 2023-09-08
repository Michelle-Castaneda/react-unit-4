require('dotenv').config()  //This imports the dotenv module and immediately calls its config function. The purpose of dotenv is to load environment variables from a .env file into 
const jwt = require('jsonwebtoken') //Imports the jsonwebtoken library, which provides functionalities to work with JSON Web Tokens (JWT).
const {SECRET} = process.env //the environment will allow me to access to a secret string. Securely manage secrets and other environment-specific configurations.
//Destructures SECRET from process.env, which means it retrieves the SECRET environment variable. This SECRET is likely used for verifying the JWT.


//This module exports an object that contains one method named isAuthenticated.
module.exports = {
    //next is a function that moves control to the next middleware in line.
    isAuthenticated: (req, res, next) => {  //A middleware function that is meant to be used with Express-like frameworks.
        const headerToken = req.get('Authorization') //declared a headertToken variable that requests 'Authorization'

        if (!headerToken) { // if condition that takes as a parameter if headerToken is not / false
            console.log('ERROR IN auth middleware') //console log a string with a error
            res.sendStatus(401) //log as a response the status 401 which marks an error
        }

        let token //Declares a variable named token. This will be used to store the verified token.

        try { //A try-catch block that attempts to verify the token. If the verification fails it will catch the error.
            token = jwt.verify(headerToken, SECRET) //Uses the verify method from jsonwebtoken to verify the token. The verification uses the SECRET from the environment variables.
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) { //After the verification, checks if the token is still not available or valid. 
            const error = new Error('Not authenticated.') //If it's not, an error is thrown with the message "Not authenticated" and a 401 status code.
            error.statusCode = 401
            throw error
        }

        next()
    }
}


