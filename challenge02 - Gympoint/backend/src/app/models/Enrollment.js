import Sequelize, { Model } from 'sequelize';

class Enrollments extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'studentId' });
    // this.belongsTo(models.Plan, { foreignKey: 'planId' });
  }
}

export default Enrollments;
