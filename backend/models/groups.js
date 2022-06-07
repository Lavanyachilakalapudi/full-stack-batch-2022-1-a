'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       
        models.User.hasMany(Group,{foreignKey: "owner_id"})
    }
  }
  Group.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      groupname: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
  }, {
    sequelize,
    tableName: 'groups',
    modelName: 'Group',
    timestamps: false
  });
  return Group;
};