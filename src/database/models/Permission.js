import Sequelize from 'sequelize';
import BaseModel from './base';

class Permission extends BaseModel {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING
            },
        }, {
            tableName: 'permission',
            sequelize
        })
    };

    static associate(models) {
    }
}
export { Permission };
