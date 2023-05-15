'use strict';
const seedImages = ['https://i.imgur.com/482dvW1_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/0vWcL75_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/f6xLS0B_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/K8zsFeh_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/uhEVBn1_d.webp?maxwidth=1520&fidelity=grand', 'https://i.imgur.com/fqE1UNC_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/e1gMEyR_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/bJuMg1z_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/cCLMizF_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/0i7Ux8c_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/KBoltaT_d.webp?maxwidth=1520&fidelity=grand']

const moreImages = [
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2189666/pexels-photo-2189666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2566860/pexels-photo-2566860.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2282445/pexels-photo-2282445.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2098405/pexels-photo-2098405.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/259593/pexels-photo-259593.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/3330118/pexels-photo-3330118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
];

const images = [{
  "spotId": 1,
  "url": moreImages[0],
  "preview": true
},
{
  "spotId": 1,
  "url": moreImages[1],
  "preview": false
},
{
  "spotId": 1,
  "url": moreImages[2],
  "preview": false
},
{
  "spotId": 1,
  "url": moreImages[3],
  "preview": false
},
{
  "spotId": 1,
  "url": moreImages[4],
  "preview": false
},
{
  "spotId": 2,
  "url": moreImages[5],
  "preview": true
},
{
  "spotId": 2,
  "url": moreImages[6],
  "preview": false
},
{
  "spotId": 2,
  "url": moreImages[7],
  "preview": false
},
{
  "spotId": 2,
  "url": moreImages[8],
  "preview": false
},
{
  "spotId": 2,
  "url": moreImages[9],
  "preview": false
},
{
  "spotId": 3,
  "url": moreImages[10],
  "preview": true
},
{
  "spotId": 3,
  "url": moreImages[11],
  "preview": false
},
{
  "spotId": 3,
  "url": moreImages[12],
  "preview": false
},
{
  "spotId": 3,
  "url": moreImages[13],
  "preview": false
},
{
  "spotId": 3,
  "url": moreImages[14],
  "preview": false
},
{
  "spotId": 4,
  "url": moreImages[15],
  "preview": true
},
{
  "spotId": 4,
  "url": moreImages[16],
  "preview": false
},
{
  "spotId": 4,
  "url": moreImages[17],
  "preview": false
},
{
  "spotId": 4,
  "url": moreImages[18],
  "preview": false
},
{
  "spotId": 4,
  "url": moreImages[19],
  "preview": false
},
  {
  "spotId": 5,
  "url": moreImages[20],
  "preview": true
}
  , {
  "spotId": 5,
  "url": moreImages[21],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[22],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[23],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[24],
  "preview": false
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
