// import express
import express from 'express';
// import morgan for http logger
import morgan from 'morgan';
// import body-parser
import bodyParser from 'body-parser';

// import routes handlers
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
// queries
app.get('/cp', (req,res) =>{
    pool.query("CREATE TABLE memb(id SERIAL PRIMARY KEY, firstname VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL)", (err, res) => {
        console.log(res)
        pool.end();
    });
});

app.use(ErrorController.NotFound);
app.use(ErrorController.InternalServerError);

module.exports = app;