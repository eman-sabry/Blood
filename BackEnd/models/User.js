const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    phone: DataTypes.STRING,

    role: {
        type: DataTypes.ENUM("admin", "donor", "hospital"),
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },

    image: DataTypes.STRING,
}, {
    timestamps: true,
});

module.exports = User;