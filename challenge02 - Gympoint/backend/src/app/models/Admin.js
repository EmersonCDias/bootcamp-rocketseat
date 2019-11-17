import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        adminPassword: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async admin => {
      if (admin.adminPassword) {
        admin.password = await bcryptjs.hash(admin.adminPassword, 8);
      }
    });

    return this;
  }

  checkPassword(informedPassword) {
    return bcryptjs.compare(informedPassword, this.password);
  }
}

export default Admin;
