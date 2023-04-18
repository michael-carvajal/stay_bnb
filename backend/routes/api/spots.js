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
    const { user } = req;

    try {
        if (user) {
            const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
            return res.status(201).json(newSpot)
        }

    } catch (error) {
        error.status = 400;
        next(error)
    }

})

router.post('/:spotId/images', async (req, res, next) => {
    const { user } = req;
    const { url, preview } = req.body;
    const id = req.params.spotId
try {
    const currSpot = await Spot.findByPk(id)
    console.log(currSpot, currSpot.ownerId);


    if (!user) {
        return res.status(401).json({
            "message": "Authentication required"
        })
    } else {

        if (user.id !== currSpot.ownerId) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        } else {
            console.log('hello');

            try {
                const newSpotImage = await SpotImage.create({ spotId: id, url, preview});
                        console.log('2');
                const lastItem = await SpotImage.count();
                const foundNewImage = await SpotImage.findByPk(lastItem, {
                    attributes: ['id', 'url', 'preview']
                })
                        res.json({ foundNewImage})

            } catch (error) {
                res.status(404).json({message: "Spot couldn't be found"})
            }
        }


    }

} catch (error) {
    res.status(500).json({ message: "No spot with provided id" })
}

})

router.get('/current', async (req, res, next) => {
    const { user } = req;
    console.log(user);
    if (user) {

        try {
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

            return res.status(200).json(allSpots);

        } catch (error) {
            res.json({
                "message": "Spot couldn't be found"
            })
        }
    } else return res.json({ user: null });
})
router.get('/:spotId', async (req, res, next) => {
    console.log(req.params.spotId);

    const numOfSpots = await Spot.count();

    if (req.params.spotId > numOfSpots) {
        return res.status(400).json({
            "message": "Spot couldn't be found"
        })
    }
try {
    const spot = await Spot.scope('spotId').findByPk(req.params.spotId, {

        include: [{
            model: Review,
            attributes: [[sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
            ]
        }, {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
        ]
    })
    res.json(spot);
} catch (error) {
    error.status = 400
    next(error)
}
})


///////////////////////// Edit SPOT ////////////////////////////////////
router.put('/:spotId', async (req, res, next) => {
    const { user } = req;
    // console.log(user.id);

    try {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        // console.log(spot.ownerId);
        if (user.id !== spot.ownerId) {
            return res.status(403).json({message: 'Forbiden'})
        }
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


module.exports = router;
