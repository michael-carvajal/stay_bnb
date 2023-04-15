const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');

router.get('', async (req, res, next) => {
    const allSpots = await Spot.findAll();

    res.json(allSpots)
})
router.post('', async (req, res, next) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
    console.log(ownerId, address, city, state, country, lat, lng, name, description, price);
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    res.json(newSpot)
})

// {
//     "ownerId": 1,
//         "address": "123 Main St",
//             "city": "New York",
//                 "state": "NY",
//                     "country": "USA",
//                         "lat": "40.71427",
//                             "lng": "-74.00597",
//                                 "name": "Cozy Apartment",
//                                     "description": "A comfortable apartment in the heart of the city.",
//                                         "price": "100"
// }
module.exports = router;
