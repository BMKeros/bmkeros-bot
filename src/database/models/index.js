import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import dotenv from 'dotenv';
import { basePath } from '../../../config/project';

dotenv.config();

const sequelize = new Sequelize('', null, null, {
    dialect: 'sqlite',
    storage: path.resolve(basePath, process.env.DB_PATH)
});
// Load each model file
const models = Object.assign({}, ...fs.readdirSync(__dirname)
    .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
    .map(function (file) {
        if (file) {
            const model = require(path.join(__dirname, file));
            const nameModel = file.split('.')[0];
            return {
                [nameModel]: model[nameModel].init(sequelize),
            };
        }
    })
);

// Load model associations
for (const model of Object.keys(models)) {
    typeof models[model].associate === 'function' && models[model].associate(models);
}

module.exports = models;
