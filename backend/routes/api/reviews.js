const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, Spot, SpotImage, ReviewImage, User } = require('../../db/models');


router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(403).json({ message: "Forbidden" })
    }

    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
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
console.log(reviews);
    const spotsWithPreview = await Promise.all(reviews.map(async review => {
        try {
            const url = await SpotImage.findByPk(review.spotId, {
                attributes: ['url']
            })
            const urlObj = url.toJSON();
            const reviewObj = review.toJSON();

            // console.log(urlObj.url);
            console.log(reviewObj.Spot);
            reviewObj.Spot.previewImage = urlObj.url
            return reviewObj
        } catch (error) {
            const reviewObj = review.toJSON();
            reviewObj.Spot.previewImage = null
            return reviewObj
        }
    }));
    res.json({ Reviews: spotsWithPreview })
})

///////////////////edit Review ////////////
router.put('/:reviewId', requireAuth,async (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(403).json({ message: "Forbidden" })
    }
    const { review, stars } = req.body;
    const reviewId = req.params.reviewId;

    // if (!review || !stars) {
    //     return res.status(400).json({
    //         "message": "Bad Request",
    //         "errors": {
    //             "review": "Review text is required",
    //             "stars": "Stars must be an integer from 1 to 5",
    //         }
    //     })
    // }
    try {
        if (stars < 1 || stars > 5) {
            throw new Error("Stars must be an integer from 1 to 5");
        }
        if (review === "") {
            throw new Error("Review text is required");

        }
        const reviewToUpdate = await Review.findByPk(reviewId);

        if (reviewToUpdate === null) {
            return res.status(404).json({ message: "Review couldn't be found" })
        }
        if (reviewToUpdate.userId !== user.id) {
            return res.status(403).json({ message: "Forbidden" })
        }

        await reviewToUpdate.update({ review, stars })
        const updatedReview = await Review.findByPk(reviewId);

        res.json(updatedReview)

    } catch (error) {
        res.status(400).json(error.message)
    }

})

//////////////DELETE

router.delete('/:reviewId', requireAuth,async (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(403).json({ message: "Forbidden" })
    }
    const reviewId = req.params.reviewId;

    try {
        const reviewToDelete = await Review.findByPk(reviewId);
        if (reviewToDelete === null) {
            return res.status(404).json({
                message: "Review couldn't be found"
            })
        }
        if (reviewToDelete.userId !== user.id) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        

        await reviewToDelete.destroy();

        res.json({ message: "Successfully deleted" })
    } catch (error) {
        res.status(400).json(error.message)

    }
})
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { user } = req;
    const { url } = req.body;
    console.log(1);
    if (!user) {
        return res.status(403).json({ message: "Forbidden" })
    }
    console.log(2);
    const review = await Review.findByPk(reviewId);
    if (review === null) {

        return res.status(404).json({ message: "Review not found" })
    }
    console.log(review);
    console.log(3);

    if (review.userId !== user.id) {
        return res.status(403).json({ message: "Forbidden" })

    }
    console.log(4);
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
        // console.log(maxCount);
        // const newReviewImage = await ReviewImage.findByPk(count, {
        //     attributes: ['id', 'url']
        // })
        res.json({
            id: addReviewImage.id,
            url: addReviewImage.url
        })

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


    res.json({ Reviews: allReviews })
})






module.exports = router;
