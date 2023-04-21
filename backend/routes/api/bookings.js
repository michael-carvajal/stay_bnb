const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const _getTimeFormat = (dateType, date) => {
    if (dateType === 'startDate' || dateType === 'endDate') {
        const dateType = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateString = dateType.toLocaleDateString('en-US', options);
        const outputString = `${dateString}`
        let newString = outputString.split(',')
        // console.log(outputString);
        return newString[0]
    }

    if (dateType === 'createdAt' || dateType === 'updatedAt') {
        const dateType = new Date(date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateString = dateType.toLocaleDateString('en-US', options);
        const timeString = dateType.toLocaleTimeString('en-US', options);
        const outputString = `${dateString} ${timeString}`;
        let newString = outputString.split(' ');
        // console.log(`${newString[0]} ${newString[1]}`);
        return `${newString[0]} ${newString[1]}`
    }
}
router.get('', async (req, res) => {
    const allBookings = await Booking.findAll();

    res.json(allBookings)
})
router.get('/spotImages/spot', async (req, res) => {
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
        const bookingsWithPreview = await Promise.all(allBookings.map(async booking => {
            const bookingObj = booking.toJSON();
            // console.log(bookingObj.spotId);

            const url = await Spot.findOne({
                where: {
                    id: bookingObj.spotId,
                },
                include: {
                    model: SpotImage,
                    attributes: ['url'],

                },
                attributes: []
            })
            const urlObj = url.toJSON()
            // bookingObj.Spot.previewImage = urlObj.url
            console.log(urlObj.SpotImages[0].url);
            let start = bookingObj.startDate;
            let end = bookingObj.endDate;
            start = new Date(start);
            end = new Date(end)
            // const editedBooking = await Booking.findByPk(bookingId);
            const formatstartDate = _getTimeFormat('startDate', start)
            const formatendDate = _getTimeFormat('endDate', end)
            const formatcreatedAt = _getTimeFormat('createdAt', bookingObj.createdAt)
            const formatupdatedAt = _getTimeFormat('updatedAt', bookingObj.updatedAt)
            let previewImage;
            if (urlObj.SpotImages[0].url === undefined) {
                bookingObj.Spot.previewImage = null
            } else {
                bookingObj.Spot.previewImage = urlObj.SpotImages[0].url
            }
            return {
                id: bookingObj.id,
                spotId: bookingObj.spotId,
                Spot: bookingObj.Spot,
                userId: user.id,
                startDate: formatstartDate,
                endDate: formatendDate,
                createdAt: formatcreatedAt,
                updatedAt: formatupdatedAt,
            }
        }))

        // console.log(bookingsWithPreview);
        res.json({ Bookings: bookingsWithPreview })
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})


const _dateCeck = (start, end, res) => {
    start = start.toDateString()
    end = end.toDateString()

    const newStart = new Date(start)
    const newEnd = new Date(end)

    if (newStart.getTime() >= newEnd.getTime()) {

        return true
    } else return false
}

// const _pastCheck = (start, end, res,) => {
//     const date = new Date();
//     // console.log(date);
//     start = start.toDateString()
//     const newStart = new Date(start)
//     console.log(date.getTime(), newStart.getTime(), date.getTime() < newStart.getTime());
//     if (date.getTime() > newStart.getTime()) {
//         return true
//     } else return false
// }
const _pastCheck2 = (start, end, res,) => {
    const date = new Date();
    // console.log(date);
    start = start.toDateString()
    const newStart = new Date(start)
    console.log(date.getTime(), newStart.getTime(), date.getTime() < newStart.getTime());
    if (date.getTime() > newStart.getTime()) {
        return true
    } else return false
}

const _presentCheck = (start, end) => {
    const date = new Date();

    console.log({
        date: date.getDate(),
        currentDate: date,
        start: start.getDate(),
        end: end.getDate(),
        boolStart: date.getTime() > start.getTime(),
        boolEnd: date.getTime() < end.getTime(),
        dateType: typeof date.getTime(),
        startType: typeof start.getTime(),
    });

    if (date.getTime() > start.getTime() && date.getTime() < end.getTime()) {
        return true;
    } else {
        return false;
    }
}

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    const bookingId = req.params.bookingId
    const bookingToEdit = await Booking.findByPk(bookingId);
    // console.log(bookingToEdit.toJSON());
    if (bookingToEdit === null) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }
    if (bookingToEdit.userId !== user.id) {
        return res.status(404).json({ message: "Forbidden" })
    }

    let { startDate, endDate } = req.body

    const startArray = startDate.split('-')
    startDate = new Date(startArray[0], startArray[1] -1, startArray[2])

    const endArray = endDate.split('-')
    endDate = new Date(endArray[0], endArray[1] -1, endArray[2])
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
    if (_pastCheck2(bookingToEdit.startDate, endDate, res)) {
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


router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const { user } = req;
    try {
        const bookingToDelete = await Booking.findByPk(bookingId, {
            include: {
                model: Spot,
                attributes: ['id', 'ownerId']
            }
        })
        if (bookingToDelete === null) {
            return res.status(404).json({
                message: "Booking couldn't be found"
            })
        }
        // console.log('booking spot owner and user and Spot.id' + bookingToDelete.Spot.ownerId + ' ' + bookingToDelete.userId + ' ', + bookingToDelete.Spot.id);
        // console.log('input spot and user ' +   );

        if (bookingToDelete.userId !== user.id && bookingToDelete.Spot.ownerId !== bookingToDelete.userId) {
            return res.status(403).json({
                message: "Forbidden"
            })

        }


        console.log(bookingToDelete.startDate, bookingToDelete.endDate);
        // console.log(startDate, endDate);
        if (_presentCheck(bookingToDelete.startDate, bookingToDelete.endDate)) {
            return res.status(403).json({
                "message": "Bookings that have been started can't be deleted"
            })
        }

        await bookingToDelete.destroy();
        res.json({
            "message": "Successfully deleted"
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
})


module.exports = router;
