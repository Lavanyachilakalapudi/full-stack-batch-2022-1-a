'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.User.hasMany(Expense, { foreignKey: "created_by" })
        models.Group.hasMany(Expense,{foreignKey:"gid"})
    }
  }
  Expense.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull:false,
      },
      exp_name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      gid:{
        type: DataTypes.INTEGER,
        allowNull:true,
        references:{
          model:'groups',
          key:'id'
        },
      },

  }, {
    sequelize,
    tableName: 'expenses',
    modelName: 'Expense',
    timestamps: false
  });
  return Expense;
};