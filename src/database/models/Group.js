import BaseModel from './base';
import { User } from './User';
import { GroupUser } from './GroupUser';
import Sequelize from 'sequelize';

class Group extends BaseModel {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING
            },
        }
        ,{
            tableName: 'groups',
            sequelize
        });
    }

    static associate(models) {
        this.belongsToMany(models.User, { through: { model: GroupUser, unique: false} });
    }
}

export {Group};
