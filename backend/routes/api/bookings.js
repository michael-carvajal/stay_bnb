const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');

router.get('',async(req, res) => {
    const allBookings = await Booking.findAll();

    res.json(allBookings)
})




module.exports = router;
