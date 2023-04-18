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
                model: ReviewImage,
                attributes: ['id', 'url']
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


router.post('/:reviewId/images', async (req, res) => {
    const reviewId = req.params.reviewId;
    const { user } = req;
    const { url } = req.body;
    if (!user) {
        return res.status(403).json({ message: "Forbidden" })
    }
    const review = Review.findByPk(reviewId);

    if (review.userId !== user.id) {
        return res.status(403).json({ message: "Forbidden" })

    }
    const count = await ReviewImage.count()
    const maxCount = await ReviewImage.count({
        where: {
            reviewId: reviewId
        }
    })
    if (maxCount > 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached"
        })
    }
    try {
        const addReviewImage = await ReviewImage.create({
            reviewId: reviewId,
            url
        })
        console.log(maxCount);
        const newReviewImage = await ReviewImage.findByPk(count, {
            attributes: ['id','url']
        })
        res.json(newReviewImage)

    } catch (error) {
        res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
})
router.get('', async (req, res) => {
    const allReviews = await Review.findAll({
        order: [['id']]
    })


    res.json({Reviews : allReviews})
})






module.exports = router;
