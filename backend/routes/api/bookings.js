const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking , Spot, SpotImage} = require('../../db/models');

router.get('',async(req, res) => {
    const allBookings = await Booking.findAll();

    res.json(allBookings)
})
router.get('/spotImages/spot',async(req, res) => {
   try {
     const url = await SpotImage.findAll({
         where: {

            spotId: 1

         },

     })
     res.json(url)
   } catch (error) {
        res.json(error)
   }
})
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const allBookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    });

    try {
        const bookingsWithPreview = await Promise.all(allBookings.map( async booking => {
            const bookingObj = booking.toJSON();
            console.log(bookingObj.spotId);

            const url = await SpotImage.findOne({
                where: {
                    spotId: bookingObj.spotId,

                },
                attributes: ['url']
            })
            const urlObj = url.toJSON()
            bookingObj.Spot.previewImage = urlObj.url
            return bookingObj
        }))

        res.json(bookingsWithPreview)
    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = router;
