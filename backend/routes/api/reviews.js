const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');

router.post('/:spotId/review', async (req, res) => {
    const { user } = req
    const spotId = req.params.spotId;
    const userId = user.id;
    const { review, stars } = req.body;

    if (!user) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const newReview = await Review.create({ userId, spotId, review, stars})

})
router.get('/current', async (req, res) => {

})
router.get('', async (req, res) => {
    const allReviews = await Review.findAll({
        order: [['id']]
    })

    res.json(allReviews)
})






module.exports = router;
