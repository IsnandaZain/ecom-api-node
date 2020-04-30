import Sequelize from 'sequelize'
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

require('sequelize-hierarchy')(Sequelize);

const models = {};
const modelsDir = path.normalize(`${__dirname}/../server/models`);
const modelPostfix = '.model.js';

// connect to mysql db

const connection = new Sequelize(
    process.env.DB_NAME || 'ecomm',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        dialect: 'mysql',
        operatorAliases: false,
        port: process.env.DB_PORT || '3306',
        host: process.env.DB_HOST || 'localhost',
        timezone: '+07:00'
    }
);

// loop through all files in models directory ignoring hidden files
let modelFiles = fs.readdirSync(modelsDir)
    .filter(file => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))

// import model files and save model names
modelFiles.forEach( (file) => {
    console.log(`Loading model file ${file}`);
    if (file.includes(modelPostfix)) {
        const model = connection.import(path.join(modelsDir, file));
        models[model.name] = model;
    }
});

Object.keys(models).forEach( (modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

// assign the sequelize variable to the db object and returning the db
module.exports = _.extend({
    connection,
    Sequelize,
}, models);