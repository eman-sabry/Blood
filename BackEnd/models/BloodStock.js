const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const BloodStock = sequelize.define("BloodStock", {
    hospitalId: DataTypes.INTEGER,
    bloodType: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE,
    receivedDate: DataTypes.DATE,
}, {
    timestamps: true,
});

module.exports = BloodStock;