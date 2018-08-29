import Sequelize from 'sequelize';
import BaseModel from './base';
import { User } from './User';
import { Group } from './Group';

class GroupUser extends BaseModel {
    static init(sequelize) {
        return super.init({
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: User,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                }
            },
            group_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: Group,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                }
            }
        },{
            tableName: 'group_users',
            sequelize,
        });
    }

    static associate(models){
    }
}

export { GroupUser };

