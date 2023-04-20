const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');


router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const { user } = req;
  try {
      const spotImageToDelete = await SpotImage.findByPk(imageId, {
          include: {
              model: Spot,
              attributes: ['ownerId']
          }
      })

      if (user.id !== spotImageToDelete.Spot.ownerId) {
          return res.status(403).json({ message: "Spot must belong to the current user"})
      }

      await spotImageToDelete.destroy();

      res.json({
          "message": "Successfully deleted"
      })
  } catch (error) {
      res.status(404).json({
          "message": "Spot Image couldn't be found"
      })
  }

})



module.exports = router;
