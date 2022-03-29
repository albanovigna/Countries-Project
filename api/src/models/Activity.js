const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        max: 5,
        min: 1,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    season: {
      type: DataTypes.ENUM('Summer', 'Autumn', 'Winter','Spring'),
    }
  });
};
