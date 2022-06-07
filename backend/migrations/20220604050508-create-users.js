'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      }
    });

    await queryInterface.createTable('friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
    });

    await queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupname: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
    });

    await queryInterface.createTable('members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'groups',
          key: 'id'
        }
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
    });

    await queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      exp_name:{
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expense_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'expenses',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      },
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};