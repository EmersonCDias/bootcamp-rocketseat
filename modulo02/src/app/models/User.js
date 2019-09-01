import Sequelize, { Model } from 'sequelize';
import bcript from 'bcryptjs';

class User extends Model {
  // O parâmetro "sequelize" é a conexão com o banco de dados
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    );

    // Trecho de código sempre executado
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcript.compare(password, this.password_hash);
  }
}

export default User;