import Sequelize from 'sequelize';
import BaseModel from './base';
import { GroupUser } from './GroupUser';

class User extends BaseModel {
    static init(sequelize) {
        return super.init({
            chat_id: {
                type: Sequelize.STRING,
                unique: true,
            },
            first_name: {
                type: Sequelize.STRING,
            },
            last_name: {
                type: Sequelize.STRING,
            },
            username: {
                type: Sequelize.STRING,
                unique: true,
            },
        }, {
            tableName: 'users',
            sequelize,
        })
    };

    static associate(models) {
        this.belongsToMany(models.Group, { as: 'Groups', through: { model: GroupUser, unique: false }, foreignKey: 'user_id', otherKey: 'group_id'});
    }
}

export { User };
