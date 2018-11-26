import Joi from 'joi';

import parcels from './../data/parcels';

import pool from './../db/config';


// /GET parcels by user id
 const findParcelsByUserId= (req, res) => {
    // const id = req.params.id;
    // const result = parcels.filter(c => c.id_client == id);
    // if(result.id_client === id){
    //     return result
    // }
    // res.status(2000).send({
    //     parcels:result
    // });

    const id = parseInt(req.params.id); 

    pool.query(`SELECT * from parcels  where id = ${id}`).then(response =>{
        res.status(200).json({
            parcel: response
        });
    }).catch(err =>{
        console.log(err)
    });  

};

// sign up
const signup = (req, res) => {
    const user = {
        id: 23,
        name: res.body.name,
        email: res.body.email,
        password: res.body.password,
        state: 'active'
    };
    const text = 'INSERT INTO users(id, name, email, password, state) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const values = [user.id, user.name, user.email, user.password, user.state]

    // callback
    pool.query(text, values, (err, res) => {
        if (err) {
            response.send({
                message: err.stack
            });
        } else {
            response.status(200).json({
                user: response
            });            
            // response.status(200).send({
            //     message: `Account with ${user.email} has been registered successfully!`
            // });
        }
    });
}

module.exports = {findParcelsByUserId, signup}
