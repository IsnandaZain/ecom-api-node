import express from 'express';
import bodyParser from 'body-parser';
import routes from '../server/routes/index.route';
import validator from 'express-validation';

const app = express();

require('dotenv').config();

app.set('port', process.env.APP_PORT || 3000);
app.set('host', process.env.APP_HOST || 'localhost');

app.use(bodyParser.json({limit: '1024kb'}));
app.use(bodyParser.urlencoded({limit: '1024kb', extended: true}));
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/json'
}));

// hooks for before and after request
app.use( function(req, res, next) {
    // hook After Request
    function afterResponse(){
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);

        console.log("Request is finish!");
        
    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    // hooks Before Request
    console.log("Request is start!");

    const authorizationHeader = req.headers['Authorization'];
    if (authorizationHeader) {
        console.log("Token is found!");
    } else {
        console.log("Token is not found!");
    }
    next();
});

// mount all routes on /api/v1 path
app.use('/api/v1', routes);

export default app;