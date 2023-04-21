'use strict';
const images = [{
  "spotId": 3,
  "url": "https://www.example.com/image1.jpg",
  "preview": true
},
{
  "spotId": 1,
  "url": "https://www.example.com/image2.jpg",
  "preview": true
},
{
  "spotId": 5,
  "url": "https://www.example.com/image3.jpg",
  "preview": true
},
{
  "spotId": 2,
  "url": "https://www.example.com/image4.jpg",
  "preview": true
},
{
  "spotId": 4,
  "url": "https://www.example.com/image5.jpg",
  "preview": true
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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, images

      , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
