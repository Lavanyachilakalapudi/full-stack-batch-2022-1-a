'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Activity.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      created_at:{
        type:DataTypes.DATE,
        allowNull:false
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull:false
      }
  }, {
    sequelize,
    tableName: 'activities',
    modelName: 'Activity',
    timestamps: false
  });
  return Activity;
};