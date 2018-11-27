import Joi from 'joi';

import users from './../data/users';

import pool from './../db/config';

// manage auth
import jwt from 'jsonwebtoken';
import Auth from './../db/jwt';
// IMPORT SECRET DATA
require('dotenv').config();

// create new user
exports.createNewUser = (req, response, next) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        state:'active'
    };
    console.log(user);
    const text = 'INSERT INTO users( name, email, password, state) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [user.name, user.email, user.password, user.state];
    // callback
    pool.query(text, values, (err, res) => {
        if (err) {
            response.send({
                message:`Whoochs, Error occurred. Check if the email doesn't already exists`
            });
        } else {
            response.send({
                message: `Account with ${user.email} has been registered successfully!`
            });
        }
    });
   
    req.setTimeout(10000);
}

// login user
exports.LoginUser = (req, res, next) => {
    // insert code here to actually authenticate, or fake it
    const user = { id: 3 };
  
    // then return a token, secret key should be an env variable
    const token = jwt.sign({ user: user.id }, process.env.SECRET);
    res.json({
      message: 'Authenticated! Use this token in the "Authorization" header',
      token: token
    });
    res.send({
        message:"yes"
    });
}

// validating user
// function validateUser(user){
//     // defining schema
//     const schema = {
//         name: Joi.string().max(30).min(3).required(),
//         email: Joi.string().email().min(6).max(60).required(),
//         password: Joi.string().min(4).max(23).required(),
//         state: Joi.string().required(),
//         role: Joi.string().required(),
//         created_time: Joi.date(),
//     };
//     return Joi.validate(user, schema);
// }