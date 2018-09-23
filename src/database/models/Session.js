import Sequelize from 'sequelize';
import BaseModel from './base';

class Session extends BaseModel {
    static init(sequelize) {
        return super.init({
            data: {
                type: Sequelize.STRING,
                get() {
                    try {
                        return JSON.parse(this.getDataValue('data'));
                    } catch(e) {
                        return null;
                    }
                },
                set(val) {
                    switch(typeof val){
                        case 'object':
                            this.setDataValue('data', JSON.stringify(val));
                            break;
                        case 'string':
                            this.setDataValue('data', val);
                            break;
                        default:
                            this.setDataValue('data', val);
                            break;
                    }
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
        }, {
            tableName: 'sessions',
            sequelize,
        })
    };

    static associate(models) {
        this.belongsTo(models.User, { as: 'User', foreignKey: 'user_id' });
    }
}

export { Session };
