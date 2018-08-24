import Sequelize from 'sequelize';

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            chat_id: {
                type: Sequelize.STRING
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
        }, {
            tableName: 'users',
            sequelize
        })
    };

    static associate(models) {
    }
}

export { User };
