const {
    Notification
} = require("../models/index");

// Get All Notifications
exports.getNotifications = async (req, res) => {
    try {
      
        const {
            userId
        } = req.query;

        const notifications = await Notification.findAll({
            where: userId ? {
                userId
            } : {},
            order: [
                ["createdAt", "DESC"]
            ] // الأحدث أولاً
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const result = await Notification.destroy({
            where: {
                id: id
            }
        });

        if (!result) {
            return res.status(404).json({
                error: "Notification not found"
            });
        }

        res.status(200).json({
            message: "Notification deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete notification: " + error.message
        });
    }
};
// Create Notification (Post)
exports.createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.markAsReadById = async (req, res) => {
    try {
        const {
            id
        } = req.params; 
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }
        // Assuming 'status' is the field to mark as read, not 'isRead'
        notification.status = "Read";
        await notification.save();

        res.status(200).json({
            message: "Notification marked as read",
            notification
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};