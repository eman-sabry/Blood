const {
    User,
    Donor,
    Hospital,
    Admin
} = require("../models");

const sequelize = require("../config/db");

exports.getMe = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let profile = null;

        if (user.role === "donor") {
            profile = await Donor.findOne({
                where: {
                    userId: user.id
                }
            });
        }

        if (user.role === "hospital") {
            profile = await Hospital.findOne({
                where: {
                    userId: user.id
                }
            });
        }
        if (user.role === "admin") {
            profile = await Admin.findOne({
                where: {
                    userId: user.id
                }
            });
        }

        res.json({
            user: {
                ...user.toJSON(),
                profile
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.registerDonor = async (req, res) => {
    const {
        user,
        donor
    } = req.body;

    const t = await sequelize.transaction();

    try {
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: "donor",
            status: "approved",
            image: user.image || null,
        }, {
            transaction: t
        });

        const newDonor = await Donor.create({
            ...donor,
            userId: newUser.id,
        }, {
            transaction: t
        });

        await t.commit();

        res.status(201).json({
            message: "Donor created",
            user: newUser,
            donor: newDonor
        });

    } catch (err) {
        await t.rollback();
        res.status(500).json({
            message: err.message
        });
    }
};



exports.registerHospital = async (req, res) => {
    const {
        user,
        hospital
    } = req.body;

    const t = await sequelize.transaction();

    try {
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: "hospital",
            status: "pending",
            image: user.image || null,
        }, {
            transaction: t
        });

        const newHospital = await Hospital.create({
            ...hospital,
            userId: newUser.id,
        }, {
            transaction: t
        });

        await t.commit();

        res.status(201).json({
            message: "Hospital created",
            user: newUser,
            hospital: newHospital
        });

    } catch (err) {
        await t.rollback();
        res.status(500).json({
            message: err.message
        });
    }
};


exports.registerAdmin = async (req, res) => {
    const {
        user,
        admin
    } = req.body;

    const t = await sequelize.transaction();

    try {
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: "admin",
            status: "approved",
            image: user.image || null,
        }, {
            transaction: t
        });

        const newAdmin = await Admin.create({
            userId: newUser.id,
            secretCode: admin.secretCode,
        }, {
            transaction: t
        });

        await t.commit();

        res.status(201).json({
            message: "Admin created",
            user: newUser,
            admin: newAdmin,
        });

    } catch (err) {
        await t.rollback();
        res.status(500).json({
            message: err.message
        });
    }
};