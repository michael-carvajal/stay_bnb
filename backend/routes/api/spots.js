const express = require('express');
const router = express.Router();
const fn = require('fn')
const sequelize = require('sequelize')
const { Spot, SpotImage, User, Review } = require('../../db/models');

router.get('', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        include: [{
            model: SpotImage,
            attributes: ['url']
        },
        {
            model: Review,
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        }],
        group: ['Spot.id']
    });

    res.json(allSpots);
})

router.post('', async (req, res, next) => {
    const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
    // console.log(ownerId, address, city, state, country, lat, lng, name, description, price);
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    res.json(newSpot)
})
router.post('/:spotId/images', async (req, res, next) => {
    const { url, preview } = req.body;
    const id = req.params.spotId
    console.log('hello');
    const newSpotImage = await SpotImage.create({ spotId: id, url, preview });
    console.log('2');
    const allSpotImages = await SpotImage.findAll();
    res.json({ newSpotImage, allSpotImages })
})
router.get('/current', async (req, res, next) => {
    const { user } = req;
    console.log(user);
    if (user) {
        const allSpots = await Spot.findByPk(user.id,{
            include: [{
                model: SpotImage,
                attributes: ['url']
            },
            {
                model: Review,
                attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
            }],
            group: ['Spot.id']
        });

        return res.json(allSpots);
    } else return res.json({ user: null });
})
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: User
        }
    })
    res.json(spot);
})
router.put('/:spotId', async (req, res, next) => {
    try {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot not found" });
        }

        const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
        const itemsTobeUpdated = [
            { ownerId },
            { address },
            { city },
            { state },
            { country },
            { lat },
            { lng },
            { name },
            { description },
            { price },
        ].filter((item) => {
            const propValue = Object.values(item)[0];
            if (propValue !== undefined) {
                return item;
            }
        });

        const updatedSpot = await spot.update({ ...Object.assign({}, ...itemsTobeUpdated) });


        console.log(itemsTobeUpdated);
        const newSpot = await Spot.findByPk(spotId);
        res.json(newSpot);
    } catch (error) {
        next(error);
    }
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
