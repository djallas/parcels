// import express
import express from 'express';
// import morgan for http logger
import morgan from 'morgan';
// import body-parser
import bodyParser from 'body-parser';

// import routes handlers
import parcelRoutes from './v1/routes/parcels';
import userRoutes from './v1/routes/users';
import locationRoutes from './v1/routes/locations';
import authRoutes from './v1/routes/auth';
import ErrorController from './controllers/ErrorController';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// ALLOW CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// manage swagger document
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// auth

// import jwt from 'jsonwebtoken';

// app.get('/ap', (req, res) =>{
//     res.json({ 
//        text: "my api" 
//     })
// })

// // auth
// app.get('/ap/login', (req, res) =>{
//     const user = { id: 3};
//     const token = jwt.sign({ user }, 'my_secret_key');    
//     res.json({ 
//        token:token
//     })
// })
// // auth
// app.get('/ap/protect', ensureToken, (req, res) =>{
//     res.json({ 
//        text: "protected" 
//     })
// })

// function ensureToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(" ");
//         const bearerHeader = bearer[1];
//         req.token = bearerToken;
//         next();
//     }else{
//         res.sentStatus(403);
//     }
// }

// Routes which should handle request
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/locations', locationRoutes);

app.use(ErrorController.NotFound);
app.use(ErrorController.InternalServerError);

module.exports = app;