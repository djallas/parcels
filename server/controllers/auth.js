import Joi from 'joi';

import users from './../data/users';

import pool from './../db/config';

// create new user
exports.createNewUser = (req, response, next) => {
    console.log("hano");
    // const {error} = validateUser(req.body);

    // if(error){
    //     response.status(400).send(error.details[0].message);
    //     return;
    // }
    // const user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     state: req.body.state,
    //     role: req.body.role
    // };
    
    // const text = 'INSERT INTO users( name, email, password, state) VALUES($1, $2, $3, $4) RETURNING *'
    // const values = [user.name, user.email, user.password, user.state];
    // // callback
    // pool.query(text, values, (err, res) => {
    //     if (err) {
    //         response.send({
    //             message: err.stack
    //         });
    //     } else {
    //         response.send({
    //             message: `Account with ${user.email} has been registered successfully!`
    //         });
    //     }
    // });
   
    // req.setTimeout(10000);
}

// login user
exports.LoginUser = (req, res, next) => {
    // defining schema
    const {error} = validateUser(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        state: 'active',
        role: 'client',
        created_time: req.body.created_time
    };
    users.push(user);
    res.send(user);
    req.setTimeout(200);
}

// validating user
function validateUser(user){
    // defining schema
    const schema = {
        name: Joi.string().max(30).min(3).required(),
        email: Joi.string().email().min(6).max(60).required(),
        password: Joi.string().min(4).max(23).required(),
        state: Joi.string().required(),
        role: Joi.string().required(),
        created_time: Joi.date(),
    };
    return Joi.validate(user, schema);
}