'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       
        models.User.hasMany(Member,{foreignKey: "member_id"})
        models.Group.hasMany(Member,{foreignKey: "gid"})
    }
  }
  Member.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      gid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'groups',
          key: 'id'
        }
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
  }, {
    sequelize,
    tableName: 'members',
    modelName: 'Member',
    timestamps: false
  });
  return Member;
};