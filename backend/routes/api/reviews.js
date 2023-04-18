const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, SpotImage, ReviewImage, User} = require('../../db/models');


router.get('/current', async (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(403).json({message: "Forbidden"})
    }
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes : ['id','firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage
            }
        ]
    })

    const spotsWithPreview = await Promise.all(reviews.map(async review => {
        const url = await SpotImage.findByPk(review.spotId, {
            attributes: ['url']
        })
        const urlObj = url.toJSON();
        const reviewObj = review.toJSON();

        // console.log(urlObj.url);
        console.log(reviewObj.Spot);
        reviewObj.Spot.previewImage = urlObj.url
        return reviewObj
    }));
    res.json({ Reviews: spotsWithPreview })
})



// const spotsWithAvgRating = await Promise.all(allSpots.map(async spot => {
//     const avgRating = await Review.findOne({
//         attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
//         where: { spotId: spot.id }
//     });
//     const ratingObj = avgRating.toJSON()
//     console.log(ratingObj);
//     return {
//         ...spot.toJSON(),
//         ...ratingObj
//     };
// }));

router.get('', async (req, res) => {
    const allReviews = await Review.findAll({
        order: [['id']]
    })
    res.json({Reviews : allReviews})
})






module.exports = router;
