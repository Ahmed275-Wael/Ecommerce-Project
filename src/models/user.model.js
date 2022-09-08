'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Token }) {
      // define association here
      this.hasOne(Token, { onDelete: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
    }

    static async isEmailTaken(email) {
      return await this.findOne({ where: { email } }) ? true : false;
    }

    static async isPhoneTaken(phone) {
      return await this.findOne({ where: { phone } }) ? true : false;
    }

    async isPasswordMatch(password) {
      return await bcrypt.compare(password, this.password);
    }

  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    hooks: {
      beforeSave: async (user, options) => {
        user.password = await bcrypt.hash(user.password, 8);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};