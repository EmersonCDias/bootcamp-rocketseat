'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'Admins',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password: bcrypt.hashSync('123456', 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
