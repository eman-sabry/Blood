const {
    DataTypes
} = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
    userId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM("Read", "Unread"),
        defaultValue: "Unread",
    },
    type: DataTypes.STRING,
    requestId: DataTypes.STRING,
}, {
    timestamps: true,
});

module.exports = Notification;