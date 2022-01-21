const { User } = require('../models');

const userData = [
  {
    username: 'person1',
    email: 'person1@email.com',
    password: 'password1'
  },
  {
    username: 'person2',
    email: 'person2@email.com',
    password: 'password2'
  },
  {
    username: 'person3',
    email: 'person3@email.com',
    password: 'password3'
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
