import Sequelize from 'sequelize';

class BaseModel extends sequelize.Model {

    exist(criteria){
        return this.count(criteria);
    }
}

