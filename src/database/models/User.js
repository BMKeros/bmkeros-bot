import Sequelize from 'sequelize';
import BaseModel from './base';
import {Group} from "./Group";

class User extends BaseModel {
    static init(sequelize) {
        return super.init({
            chat_id: {
                type: Sequelize.STRING
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
        }, {
            tableName: 'users',
            sequelize
        })
    };

    static associate(models) {
        //this.belongsToMany(models.Group, {through: 'user_groups'});
    }
}

//User.belongsToMany(Group);

export { User };
