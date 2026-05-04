const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("Admin", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    secretCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
module.exports = Admin;