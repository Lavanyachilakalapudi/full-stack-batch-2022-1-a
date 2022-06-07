'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.User.hasMany(Friend, { foreignKey: "fid" })
        models.User.hasMany(Friend,{foreignKey: "uid"})
    }
  }
  Friend.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      fid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
  }, {
    sequelize,
    tableName: 'friends',
    modelName: 'Friend',
    timestamps: false
  });
  return Friend;
};