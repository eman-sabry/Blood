const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const BloodRequest = sequelize.define("BloodRequest", {
    hospitalId: DataTypes.INTEGER,
    bloodTypeNeeded: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: {
        type: DataTypes.ENUM("Pending", "Accepted", "Completed", "Cancelled"),
        defaultValue: "Pending",
    },
}, {
    timestamps: true,
});

module.exports = BloodRequest;