'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'Plans',
      [
        {
          title: 'Start',
          duration: 1,
          price: 129.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Gold',
          duration: 3,
          price: 109.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
