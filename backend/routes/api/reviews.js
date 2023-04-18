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

    res.json({ Reviews: reviews })
})




router.get('', async (req, res) => {
    const allReviews = await Review.findAll({
        order: [['id']]
    })
    res.json({Reviews : allReviews})
})






module.exports = router;
