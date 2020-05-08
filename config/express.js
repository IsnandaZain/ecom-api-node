import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import HttpStatus from 'http-status-codes';

import routes from '../server/routes/index.route';
import * as auth from '../server/helpers/auth';

const app = express();

require('dotenv').config();

app.set('port', process.env.APP_PORT || 3000);
app.set('host', process.env.APP_HOST || 'localhost');

// hooks for before and after request
app.use( async function(req, res, next) {
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

    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const authData = await auth.userInfo(authorizationHeader);
        if(!authData) {
            return res.json({
                "status": HttpStatus.UNAUTHORIZED,
                "messages": "token tidak valid"
            })
        } 
    } else {
        console.log("Token is not found!");
    }
    next();
});

app.use(bodyParser.json({limit: '1024kb'}));
app.use(bodyParser.urlencoded({limit: '1024kb', extended: true}));
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/json'
}));

// routes khusus file
app.use('/files', function(req, res) {
    console.log(req.path);
    let url_path = req.path.split("/");
    let filename = url_path[(url_path.length - 1)];
    let filepath = '../public';
    for (let i=1; i < (url_path.length - 1); i++) filepath += "/" + url_path[i];

    filepath = path.join(__dirname, filepath, filename);
    // make sure file is exists
    fs.exists(filepath, function (data) {
        if (!data) {
            console.log(data);
            return res.json({
                "status": 404,
                "messages": "file tidak ditemukan"
            });
        } else {
            res.attachment(`${filename}`)
            res.sendFile(filepath);
        }
    })
})

// mount all routes on /api/v1 path
app.use('/api/v1', routes);

export default app;