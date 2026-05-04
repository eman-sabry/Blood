const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const DonationHistory = sequelize.define("DonationHistory", {
    donorId: DataTypes.INTEGER,
    hospitalId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    bloodType: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'OnTheWay', 'Cancelled'),
    },
    reason: DataTypes.STRING,
}, {
    timestamps: true,
});


module.exports = DonationHistory;