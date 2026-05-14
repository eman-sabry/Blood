const admin = require("../config/firebaseAdmin");
const {
    User
} = require("../models");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found in DB"
            });
        }

        req.user = {
            id: user.id, 
            role: user.role
        };

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;