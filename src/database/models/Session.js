import Sequelize from 'sequelize';
import BaseModel from './base';

class Session extends BaseModel {
    static init(sequelize) {
        return super.init({
            data: {
                type: Sequelize.STRING,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
        }, {
            tableName: 'sessions',
            sequelize
        })
    };

    static associate(models) {
        this.belongsTo(models.User, { as: 'User', foreignKey: 'user_id' });
    }
}

export { Session };
