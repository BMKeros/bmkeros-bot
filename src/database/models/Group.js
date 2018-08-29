import Sequelize from 'sequelize';
import BaseModel from './base';
import { GroupUser } from './GroupUser';
import { User } from './User';

class Group extends BaseModel {
    static init(sequelize) {
        return super.init({
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
            },
            owner_id: {
                type: Sequelize.INTEGER,
            },
        }
        ,{
            tableName: 'groups',
            sequelize,
        });
    }

    static associate(models) {
        this.belongsToMany(models.User, { as: 'Members', through: { model: GroupUser, unique: false }, foreignKey: 'group_id', otherKey: 'user_id'});

        this.belongsTo(models.User, { as: 'Owner', foreignKey: 'owner_id' });
    }
}

export { Group };

