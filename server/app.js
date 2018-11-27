// import express
import express from 'express';
// import morgan for http logger
import morgan from 'morgan';
// import body-parser
import bodyParser from 'body-parser';


// import routes handlers
// import queriesRoutes from './v1/routes/queries';
import parcelRoutes from './v1/routes/parcels';
import userRoutes from './v1/routes/users';
import locationRoutes from './v1/routes/locations';
import authRoutes from './v1/routes/auth';
import ErrorController from './controllers/ErrorController';

//import auth middleware

import Auth from './middleware/Auth';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
import cors from 'cors';
app.use(cors());

// ALLOW CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/names', (req,res,next) =>{
    const name = req.body.name;
    res.send({
        name:name
    });
})
// manage authetication

// import jwt from 'jsonwebtoken';

// app.get('/api/protected', Auth.isAutheticated, (req, res) => {
//     jwt.verify(req.token, SECRET, function(err, data) {
//       if (err) {
//         res.sendStatus(403);
//       } else {
//           console.log(data.user);
//         res.json({
//           description: 'Protected information. Congrats!'+data
//         });
//       }
//     });
//   });

  

// Routes which should handle request
app.use('/api/v1/parcels', Auth.verifyToken, parcelRoutes);
// app.use('/api/v1/queries', queriesRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/locations', locationRoutes);

app.use(ErrorController.NotFound);
app.use(ErrorController.InternalServerError);

module.exports = app;