'use strict';
const images = [{
  "reviewId": 1,
  "url": "https://www.example.com/review1"
},
  {
    "reviewId": 2,
    "url": "https://www.example.com/review2"
  },
  {
    "reviewId": 3,
    "url": "https://www.example.com/review3"
  },
  {
    "reviewId": 4,
    "url": "https://www.example.com/review4"
  },
  {
    "reviewId": 5,
    "url": "https://www.example.com/review5"
  }
]
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, images

      , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
