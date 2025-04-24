const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./User");

const Recipe = sequelize.define("Recipe", {
  rid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  type: DataTypes.STRING,
  cookingtime: DataTypes.STRING,
  ingredients: DataTypes.TEXT,
  instructions: DataTypes.TEXT,
  image: DataTypes.STRING,
  uid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "uid",
    }
  }
}, {
  tableName: "recipes",
  timestamps: false,
});

User.hasMany(Recipe, { foreignKey: "uid" });
Recipe.belongsTo(User, { foreignKey: "uid" });

module.exports = Recipe;
