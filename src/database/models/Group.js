import Sequelize from 'sequelize';
import BaseModel from './base';
import { GroupUser } from './GroupUser';

class Group extends BaseModel {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING,
            },
        }
        ,{
            tableName: 'groups',
            sequelize,
        });
    }

    static associate(models) {
        this.belongsToMany(models.User, { as: 'Members', through: { model: GroupUser, unique: false }, foreignKey: 'group_id', otherKey: 'user_id'});
    }
}

export { Group };

