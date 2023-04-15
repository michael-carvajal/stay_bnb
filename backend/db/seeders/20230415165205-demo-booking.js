'use strict';
const bookings = [{ "spotId": 1, "userId": 3, "startDate": "2023-05-01", "endDate": "2023-05-05" }, { "spotId": 2, "userId": 4, "startDate": "2023-06-01", "endDate": "2023-06-05" }, { "spotId": 3, "userId": 5, "startDate": "2023-07-01", "endDate": "2023-07-05" }, { "spotId": 1, "userId": 5, "startDate": "2023-08-01", "endDate": "2023-08-05" }, { "spotId": 2, "userId": 3, "startDate": "2023-09-01", "endDate": "2023-09-05" }]

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options,  bookings

      , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
