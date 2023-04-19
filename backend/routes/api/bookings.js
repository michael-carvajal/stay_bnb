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

const _getTimeFormat = (dateType, date) => {
    if (dateType === 'startDate' || dateType === 'endDate') {
        const dateType = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12:false };
        const dateString = dateType.toLocaleDateString('en-US', options);
        const outputString = `${dateString}`
        let newString = outputString.split(',')
        console.log(outputString);
        return newString[0]
    }

    if (dateType === 'createdAt' || dateType === 'updatedAt') {
        const dateType = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateString = dateType.toLocaleDateString('en-US', options);
        const timeString = dateType.toLocaleTimeString('en-US', options);
        const outputString = `${dateString} ${timeString}`;
        let newString = outputString.split(' ');
        console.log(`${newString[0]} ${newString[1]}`);
        return `${newString[0]} ${newString[1]}`
    }
}
const _dateCeck = (start, end, res) => {
    start = start.toDateString()
    end = end.toDateString()

    const newStart = new Date (start)
    const newEnd = new Date (end)

    if (newStart.getTime() >= newEnd.getTime()) {

        return true
    } else return false
}

const _pastCheck = (start, end, res,) => {
    const date = new Date();
    // console.log(date);
    start = start.toDateString()
    const newStart = new Date(start)
    console.log(date.getTime(), newStart.getTime(), date.getTime() < newStart.getTime());
    if (date.getTime() > newStart.getTime()) {
        return true
    } else return false
}
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    const bookingId = req.params.bookingId
    const bookingToEdit = await Booking.findByPk(bookingId);
    // console.log(bookingToEdit.toJSON());
    if (bookingToEdit === null) {
        return res.status(404).json({message: "Booking not found"})
    }
    if (bookingToEdit.userId !== user.id) {
        return res.status(404).json({message: "Forbidden"})
    }

    let { startDate, endDate } = req.body

    const startArray = startDate.split('-')
    startDate = new Date(startArray[0], startArray[1], startArray[2])

    const endArray = endDate.split('-')
    endDate = new Date(endArray[0], endArray[1], endArray[2])
    const bookingsForSpot = await Booking.findAll({
        where: {
            spotId: bookingToEdit.spotId
        },
        attributes: ['startDate', 'endDate']
    })
    for (let booking of bookingsForSpot) {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
        // console.log(bookingStart, bookingEnd);

        if ((startDate >= bookingStart && startDate <= bookingEnd) ||
            (endDate >= bookingStart && endDate <= bookingEnd) ||
            (bookingStart >= startDate && bookingStart <= endDate) ||
            (bookingEnd >= startDate && bookingEnd <= endDate)) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": {
                    "endDate": "The specified dates conflict with an existing booking."
                }
            });
        }
    }
    if (_dateCeck(startDate, endDate, res)) {
        return res.status(400).json({
            "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }
    if (_pastCheck(startDate, endDate, res)) {
        return res.status(403).json({ message: "Past bookings can't be modified" })
    }

    await bookingToEdit.update({
        startDate, endDate
    })

    const editedBooking = await Booking.findByPk(bookingId);
    const formatstartDate = _getTimeFormat('startDate', editedBooking.startDate)
    const formatendDate = _getTimeFormat('endDate', editedBooking.endDate)
    const formatcreatedAt = _getTimeFormat('createdAt', editedBooking.createdAt)
    const formatupdatedAt = _getTimeFormat('updatedAt', editedBooking.updatedAt)

    // console.log({
    //     formatstartDate, formatendDate,formatcreatedAt,formatupdatedAt
    // });

    res.json({
        "id": editedBooking.id,
        "spotId": editedBooking.spotId,
        "userId": editedBooking.userId,
        "startDate": formatstartDate,
        "endDate": formatendDate,
        "createdAt": formatcreatedAt,
        "updatedAt": formatupdatedAt
    })
})



module.exports = router;
