'use strict';
const { Op } = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { as: 'Owner',foreignKey: 'ownerId'})
      Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })

      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })

      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        isLat(value) {
          if (this.lat && (this.lat < -90 || this.lat > 90)) {
            throw new Error('Latitude must be between -90 and 90 degrees');
          }
        }
      }
    }
,
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        isLng(value) {
          if (this.lng && (this.lng < -180 || this.lng > 180)) {
            throw new Error('Longitude must be between -180 and 180 degrees');
          }
        }
      }
    }
,
    name: {
      type : DataTypes.STRING,
      validate: {
        len: {
          args: [0, 50],
          msg: "Name must be between 0 and 50 characters long"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
