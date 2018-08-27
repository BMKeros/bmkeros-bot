import Sequelize from 'sequelize';
import BaseModel from './base';
import {User} from './User';

class Group extends BaseModel {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING
            },
            owner: {
                type: Sequelize.INTEGER,
                allowNull: false,
                /*references: {
                    // This is a reference to another model
                    model: User,
                    // This is the column name of the referenced model
                    key: 'id',
                    // This declares when to check the foreign key constraint. PostgreSQL only.
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                }*/
            },
        }, {
            tableName: 'groups',
            sequelize
        })
    };

    static associate(models) {

    }
}

Group.hasMany(User, { as: 'members' });

export {Group};
