const {
    DonationHistory
} = require("../models/index");

// Get All History
exports.getHistory = async (req, res) => {
    try {
        const where = {};
        if (req.query.donorId) where.donorId = req.query.donorId;
        if (req.query.hospitalId) where.hospitalId = req.query.hospitalId;
        if (req.query.requestId) where.requestId = req.query.requestId;
        if (req.query.status) where.status = req.query.status;

        const history = await DonationHistory.findAll({
            where
        });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Create History Entry
exports.createHistory = async (req, res) => {
    try {
        const newRecord = await DonationHistory.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// Update History
exports.updateHistory = async (req, res) => {
    try {
        await DonationHistory.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "History record updated"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// Delete History
exports.deleteHistory = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        await DonationHistory.destroy({
            where: {
                id
            }
        });
        res.status(200).json({
            message: "Record deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};