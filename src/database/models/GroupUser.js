import Sequelize from 'sequelize';
import BaseModel from './base';

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
            },
            group_id: {
                type: Sequelize.INTEGER,
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

