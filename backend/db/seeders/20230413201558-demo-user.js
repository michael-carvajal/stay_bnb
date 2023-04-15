'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe123",
        "email": "johndoe123@example.com",
        "hashedPassword": "a4f7fb8a2e1ba7aef5394f82706bfe99a28a686d7a9749d295e025381a02bfe4"
      },
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "username": "janesmith456",
        "email": "janesmith456@example.com",
        "hashedPassword": "a63a13d7f51b2a8dc7e47ee62ddc8447d041faec1fb95488a6a854c6d7d6b9e8"
      },
      {
        "firstName": "Mark",
        "lastName": "Johnson",
        "username": "markjohnson789",
        "email": "markjohnson789@example.com",
        "hashedPassword": "bcf77a1c2aa21d9dcfe9a4500b68df3e3f1c1606f5b8c7abf54218bb52e7d6d9"
      },
      {
        "firstName": "Sarah",
        "lastName": "Lee",
        "username": "sarahlee101",
        "email": "sarahlee101@example.com",
        "hashedPassword": "33da4a67f3d3b2371d4db54098debd8bfb9d9a4a4bb4ce138947f4d4d1b4f1b2"
      },
      {
        "firstName": "David",
        "lastName": "Nguyen",
        "username": "davidnguyen246",
        "email": "davidnguyen246@example.com",
        "hashedPassword": "b789f68ecb181d6e68a7b62313c0d1e2e9d9f2ca31c14e475d3ef3b92d2147f8"
      }
    ]

, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['davidnguyen246', 'sarahlee101', 'markjohnson789', 'janesmith456', 'johndoe123'] }
    }, {});
  }
};
