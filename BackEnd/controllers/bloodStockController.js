const {
    BloodStock
} = require("../models/index");

// Get All Stock
exports.getAllStock = async (req, res) => {
    try {
        const stock = await BloodStock.findAll();
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Add to Stock (Post)
exports.addToStock = async (req, res) => {
    try {
        const data = {
            ...req.body,
            hospitalId: Number(req.body.hospitalId),
            quantity: Number(req.body.quantity),
        };
        const entry = await BloodStock.create(data);
        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// Update Stock (Patch)
exports.updateStock = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        await BloodStock.update(req.body, {
            where: {
                id
            }
        });
        res.status(200).json({
            message: "Stock updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// Delete Stock Item
exports.deleteStock = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deleted = await BloodStock.destroy({
            where: {
                id
            }
        });

        if (deleted) {
            res.status(200).json({
                message: "Stock item deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Stock item not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};