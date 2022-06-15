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
      },
      phoneno:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true
      },
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
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
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
        },
        created_at:{
          type:Sequelize.DATE,
          allowNull:false
        },
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
      },
      gid:{
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'groups',
          key:'id'
        },
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
      divamount:{
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      gid:{
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'groups',
          key:'id'
        },
      },
      settle:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      },
    });

    await queryInterface.createTable('activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull:false
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};