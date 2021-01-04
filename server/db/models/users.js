const crypto = require('crypto');
const { db } = require('../db');
const Sequelize = require('sequelize');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

// Instance methods

// Checks that the password is correct
User.prototype.correctPassword = function (userPwd) {
  return User.encryptPassword(userPwd, this.salt()) === this.password;
};

//Class methods

// crypto.randomBytes(16) generates cryptographically strong pseudo-random data. The size argument is a number indicating the number of bytes to generate. toString changes it to a string
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

module.exports = User;
