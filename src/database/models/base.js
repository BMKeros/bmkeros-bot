import Sequelize from 'sequelize';

class BaseModel extends Sequelize.Model {
    static exists(criteria){
        return this.count({
            where: criteria
        }).then(count => count > 0);
    }
}

export default BaseModel;
