const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const admins = sequelize.define("admins", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
    timestamps: false
});
module.exports = admins;
