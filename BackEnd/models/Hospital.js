const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const Hospital = sequelize.define("Hospital", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    licenseNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
}, {
    timestamps: true,
});

module.exports = Hospital;