const {
    User,
    Donor,
    Hospital,
    Admin,
    Notification
} = require("../models");


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [Donor, Hospital]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.createUserByAdmin = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [Donor, Hospital, Admin]
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update(req.body);
        res.json(user);

    } catch (err) {
        console.log("UPDATE USER ERROR:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.destroy();
        res.status(200).json({
            message: "User and related profiles deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
