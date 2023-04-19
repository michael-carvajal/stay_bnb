const express = require('express');
const router = express.Router();
const fn = require('fn')
const sequelize = require('sequelize')
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');

router.get('', async (req, res, next) => {
    // console.log('here is 1');

    // try {
    //     const allSpots = await Spot.findAll({
    //         include: [{
    //             model: SpotImage,
    //             attributes: ['url']
    //         }],
    //         order : [['id']]
    //     });

    //     console.log('here is 2');
    //     const spotsArray = [];

    //     await Promise.all(allSpots.forEach(async spot => {
    //         console.log('here is 3');
    //         console.log(spot.id);

    //         const eachSpot = await Spot.findByPk(spot.id, {
    //             include: {
    //                 model: Review,
    //                 attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
    //             }
    //         });

    //         console.log('here is 4');
    //         const newSpotObj = eachSpot.toJSON();
    //         const avgRating = newSpotObj.Reviews[0]
    //         const oldSpotObj = spot.toJSON();

    //         console.log('here is 5');

    //         if (typeof avgRating !=='object' ) {
    //             console.log('here is 6');
    //             oldSpotObj.avgRating = null
    //             console.log(oldSpotObj.id);
    //             spotsArray.push(oldSpotObj)
    //         } else {
    //             console.log('here is 7');
    //             const updatedObj = {
    //                 ...oldSpotObj,
    //                 ...avgRating
    //             }
    //             console.log(updatedObj.id);
    //             spotsArray.push(updatedObj)
    //         }


    //     }));
    //     res.json(spotsArray);

    // } catch (error) {
    //     next(error)
    // }
    // const allSpots = await Spot.findAll({
    //     include: [{
    //         model: SpotImage,
    //         attributes: ['url']
    //     }],
    //     attributes: [
    //         'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng',
    //         'name', 'description', 'price', 'createdAt', 'updatedAt',
    //         [sequelize.fn('AVG', sequelize.col('Review.stars')), 'avgRating']
    //     ],
    //     group: ['Spot.id', 'SpotImages.id', 'Reviews.id']
    // });

    // res.json(allSpots);
    const allSpots = await Spot.findAll({
        include: [{
            model: SpotImage,
            attributes: ['url']
        }],
        attributes: [
            'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng',
            'name', 'description', 'price', 'createdAt', 'updatedAt',
        ],
        group: ['Spot.id', 'SpotImages.id']
    });

    const spotsWithAvgRating = await Promise.all(allSpots.map(async spot => {
        const avgRating = await Review.findOne({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
            where: { spotId: spot.id }
        });
        const ratingObj = avgRating.toJSON()
        console.log(ratingObj);
        return {
            ...spot.toJSON(),
            ...ratingObj
        };
    }));

    res.json({ Spots: spotsWithAvgRating });

});

router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    try {
        const spotReviews = await Review.findOne({
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']

            }
            ],
            where: {
                spotId : spotId
            }

        })
        if (spotReviews === null) {
            res.status(404).json({
                "message": "Spot couldn't be found"
            });
        } else {
            res.json(spotReviews);
        }

    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
})

router.post('', async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    // console.log( address, city, state, country, lat, lng, name, description, price);
    const { user } = req;
    const ownerId = user.id;
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
                    const newSpotImage = await SpotImage.create({ spotId: id, url, preview });
                    console.log('2');
                    const lastItem = await SpotImage.count();
                    const foundNewImage = await SpotImage.findByPk(lastItem, {
                        attributes: ['id', 'url', 'preview']
                    })
                    res.json({ foundNewImage })

                } catch (error) {
                    res.status(404).json({ message: "Spot couldn't be found" })
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
            // const allSpots = await Spot.findByPk(user.id,{
            //     include: [{
            //         model: SpotImage,
            //         attributes: ['url']
            //     },
            //     {
            //         model: Review,
            //         attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
            //     }],

            // });

            // return res.status(200).json(allSpots);
            const allSpots = await Spot.findAll({
                where: {
                    ownerId: user.id
                },
                include: [{
                    model: SpotImage,
                    attributes: ['url']
                }],
                attributes: [
                    'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng',
                    'name', 'description', 'price', 'createdAt', 'updatedAt',
                ],
                group: ['Spot.id', 'SpotImages.id']
            });

            const spotsWithAvgRating = await Promise.all(allSpots.map(async spot => {
                const avgRating = await Review.findOne({
                    attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
                    where: { spotId: spot.id }
                });
                const ratingObj = avgRating.toJSON()
                console.log(ratingObj);
                return {
                    ...spot.toJSON(),
                    ...ratingObj
                };
            }));

            res.json({ Spots: spotsWithAvgRating });
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

    // if (req.params.spotId > numOfSpots) {
    //     return res.status(400).json({
    //         "message": "Spot couldn't be found"
    //     })
    // }
    try {
        // const spot = await Spot.findByPk(req.params.spotId, {

        //     include: [{
        //         model: Review,
        //         attributes: [[sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
        //         [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
        //         ]
        //     }, {
        //         model: User,
        //         attributes: ['id', 'firstName', 'lastName']
        //     }, {
        //         model: SpotImage,
        //         attributes: ['id', 'url', 'preview']
        //     }
        //     ]
        // })
        // res.json(spot);


        const spot = await Spot.findByPk(req.params.spotId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                    as: 'Owner' // alias the User model as 'Owner'
                },
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                }
            ]
        });
        if (spot === null) {
            return res.status(404).json({message: "Spot not found"})
        }

        // Get the review stats separately
        const reviewStats = await Review.aggregate('spotId', 'count', {
            distinct: true,
            where: { spotId: req.params.spotId }
        }).then(count => {
            return Review.aggregate('stars', 'avg', {
                where: { spotId: req.params.spotId }
            }).then(avg => ({ numReviews: count, avgStarRating: avg }));
        });

        // Add the review stats to the spot object and return it
        res.json({ ...spot.toJSON(), ...reviewStats });

    } catch (error) {
        error.status = 400
        next(error)
    }
})
///comment
router.post('/:spotId/reviews', async (req, res) => {
    const { user } = req
    const spotId = req.params.spotId;
    const userId = user.id;
    const { review, stars } = req.body;

    if (!user) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    if (!review || !stars) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    try {
        const specificSpot = await Spot.findByPk(spotId, {
            include: {
                model: Review,
                attributes: ['userId']
            }
        })
        const spotObj = specificSpot.toJSON()
        spotObj.Reviews.forEach(review => {
            console.log(review.userId);
            if (review.userId === userId) {
                return res.status(500).json({
                    "message": "User already has a review for this spot"
                })
            }
        });
        // const reviews = await Review.findAll();
        // reviews.forEach(review => {
        //     if (review.spotId === spotId && review.userId === userId) {
        //         return res.status(500).json({
        //             "message": "User already has a review for this spot"
        //         })
        //     }
        // });

        const newReview = await Review.create({ userId, spotId, review, stars })
        res.json(newReview)

    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
})

///////////////////////// Edit SPOT ////////////////////////////////////
router.put('/:spotId', async (req, res, next) => {
    const { user } = req;
    // console.log(user.id);

    try {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (spot === null) {
            return res.status(404).json({ message: 'No spots match provided id' })
        }
        // console.log(spot.ownerId);
        if (user.id !== spot.ownerId) {
            return res.status(403).json({ message: 'Forbidden' })
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
///////////////////////// Delete SPOT ////////////////////////////////////
router.delete('/:spotId', async (req, res, next) => {
    const { user } = req;

    try {
        const spotToDelete = await Spot.findByPk(req.params.spotId)
        if (user.id !== spotToDelete.ownerId) {
            return res.json({
                "message": "Forbidden"
            })
        }
        // console.log(spotToDelete.toJSON());

        await spotToDelete.destroy();

        res.json({
            "message": "Successfully deleted"
        })
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found",
        })
    }
})

module.exports = router;
