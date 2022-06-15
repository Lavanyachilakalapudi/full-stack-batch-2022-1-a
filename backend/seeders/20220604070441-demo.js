'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users',[{
     username:'lavanya',
     password:'1234',
     email:'l@gmail.com'
   },
   {
    username:'srija',
    password:'1234',
    email:'s@gmail.com'
   },
   {
    username:'vijay',
    password:'1234',
    email:'vijju@gmail.com'
   }
   ])
    await queryInterface.bulkInsert('friends',[{
    fid: 1,
    uid: 2
   },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
