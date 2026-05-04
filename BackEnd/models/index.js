const sequelize = require("../config/db");
const Admin = require("./Admin");
const User = require("./User");
const Donor = require("./Donor");
const Hospital = require("./Hospital");
const BloodRequest = require("./BloodRequest");
const BloodStock = require("./BloodStock");
const DonationHistory = require("./DonationHistory");
const Notification = require("./Notification");

/* ================= USERS -> PROFILES ================= */

User.hasOne(Donor, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});
Donor.belongsTo(User, {
    foreignKey: "userId"
});

User.hasOne(Hospital, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});
Hospital.belongsTo(User, {
    foreignKey: "userId"
});
/* Admin relation */
User.hasOne(Admin, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Admin.belongsTo(User, {
    foreignKey: "userId",
});

/* ================= HOSPITAL ================= */

Hospital.hasMany(BloodRequest, {
    foreignKey: "hospitalId"
});
BloodRequest.belongsTo(Hospital, {
    foreignKey: "hospitalId"
});

Hospital.hasMany(BloodStock, {
    foreignKey: "hospitalId"
});
BloodStock.belongsTo(Hospital, {
    foreignKey: "hospitalId"
});

/* ================= DONOR ================= */

Donor.hasMany(DonationHistory, {
    foreignKey: "donorId"
});
DonationHistory.belongsTo(Donor, {
    foreignKey: "donorId"
});

/* ================= NOTIFICATIONS ================= */

User.hasMany(Notification, {
    foreignKey: "userId"
});
Notification.belongsTo(User, {
    foreignKey: "userId"
});

/* ================= SYNC   alter: true ================= */

const syncDB = async () => {
    try {
        await sequelize.sync({
            force: false
        });
        console.log("✅ Database synced successfully");
    } catch (err) {
        console.log("❌ DB Error:", err);
    }
};

module.exports = {
    sequelize,
    syncDB,
    Admin,
    User,
    Donor,
    Hospital,
    BloodRequest,
    BloodStock,
    DonationHistory,
    Notification,
};