const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  uid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "users",
  timestamps: false,
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10); // the 10 means salt rounds -> basically how many times/rounds it gets hashed
});

module.exports = User;
