'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.User.hasMany(Participant, { foreignKey: "user_id" })
        models.Expense.hasMany(Participant, { foreignKey: "expense_id" })

    }
  }
  Participant.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      expense_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'expenses',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      }
  }, {
    sequelize,
    tableName: 'participants',
    modelName: 'Participant',
    timestamps: false
  });
  return Participant;
};