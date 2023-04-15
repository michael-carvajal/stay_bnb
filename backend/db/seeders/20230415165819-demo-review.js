'use strict';
const reviews = [{ "spotId": 1, "userId": 3, "review": "Great spot, would definitely stay again!", "stars": 5 }, { "spotId": 2, "userId": 4, "review": "Decent spot, nothing too special.", "stars": 3 }, { "spotId": 3, "userId": 5, "review": "Terrible experience, would not recommend.", "stars": 1 }, { "spotId": 1, "userId": 4, "review": "Had a good time, thanks for the stay!", "stars": 4 }, { "spotId": 2, "userId": 3, "review": "Amazing location, loved the view!", "stars": 5 }]

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, reviews

      , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
