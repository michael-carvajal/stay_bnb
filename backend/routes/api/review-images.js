const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, ReviewImage, Review } = require('../../db/models');


router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const { user } = req;
    try {
        const reviewImageToDelete = await ReviewImage.findByPk(imageId, {
            include: {
                model: Review,

            }
        })
        console.log(reviewImageToDelete.toJSON());
        if (user.id !== reviewImageToDelete.Review.userId) {
            return res.status(403).json({ message: "Review must belong to the current user" })
        }

        await reviewImageToDelete.destroy();

        res.json({
            "message": "Successfully deleted"
        })
    } catch (error) {
        res.status(404).json({
            "message": "Review Image couldn't be found"
        })
    }

})



module.exports = router;
