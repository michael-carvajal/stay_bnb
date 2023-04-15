'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        "ownerId": 1,
        "address": "123 Main St",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "lat": 40.71427,
        "lng": -74.00597,
        "name": "Cozy Apartment",
        "description": "A comfortable apartment in the heart of the city.",
        "price": 100.0
      },
      {
        "ownerId": 2,
        "address": "456 Elm St",
        "city": "San Francisco",
        "state": "CA",
        "country": "USA",
        "lat": 37.77493,
        "lng": -122.41942,
        "name": "Sunny Condo",
        "description": "A beautiful condo with plenty of natural light.",
        "price": 150.0
      },
      {
        "ownerId": null,
        "address": "789 Oak St",
        "city": "Miami",
        "state": "FL",
        "country": "USA",
        "lat": 25.76168,
        "lng": -80.19179,
        "name": "Beach House",
        "description": "A cozy beach house with a great view of the ocean.",
        "price": 200.0
      },
      {
        "ownerId": null,
        "address": "1011 Pine St",
        "city": "Seattle",
        "state": "WA",
        "country": "USA",
        "lat": 47.60801,
        "lng": -122.33584,
        "name": "Mountain Cabin",
        "description": "A rustic cabin with beautiful views of the mountains.",
        "price": 175.0
      },
      {
        "ownerId": null,
        "address": "1213 Maple St",
        "city": "Los Angeles",
        "state": "CA",
        "country": "USA",
        "lat": 34.05223,
        "lng": -118.24368,
        "name": "Luxury Villa",
        "description": "A luxurious villa with all the amenities you could want.",
        "price": 300.0
      }
    ]


      , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
