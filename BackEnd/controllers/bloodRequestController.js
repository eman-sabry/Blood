const {
    BloodRequest
} = require("../models/index");

// Get All Requests
exports.getRequests = async (req, res) => {
    try {
        const where = {};
        if (req.query.hospitalId) where.hospitalId = req.query.hospitalId;

        const requests = await BloodRequest.findAll({
            where
        });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Create Request
exports.createRequest = async (req, res) => {
    try {
        const newRequest = await BloodRequest.create(req.body);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// Update Request (Patch)
exports.updateRequest = async (req, res) => {
    try {
        await BloodRequest.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// Delete Request
exports.deleteRequest = async (req, res) => {
    try {
        await BloodRequest.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};