'use strict';
const bookings = [
  { "spotId": 1, "userId": 3, "startDate": new Date(2023, 5, 1), "endDate": new Date(2023, 5, 5) },
  { "spotId": 2, "userId": 4, "startDate": new Date(2023, 6, 1), "endDate": new Date(2023, 6, 5) },
  { "spotId": 3, "userId": 5, "startDate": new Date(2023, 7, 1), "endDate": new Date(2023, 7, 5) },
  { "spotId": 1, "userId": 5, "startDate": new Date(2023, 8, 1), "endDate": new Date(2023, 8, 5) },
  { "spotId": 2, "userId": 3, "startDate": new Date(2023, 9, 1), "endDate": new Date(2023, 9, 5) }
];

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
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
