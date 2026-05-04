const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const Donor = sequelize.define("Donor", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    bloodType: DataTypes.STRING,
    gender: DataTypes.STRING,
    lastDonation: DataTypes.DATE,
    diseases: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    donationsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image: DataTypes.STRING,
}, {
    timestamps: true,
});

module.exports = Donor;