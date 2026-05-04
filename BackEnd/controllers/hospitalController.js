const {
    Hospital,
    User
} = require("../models/index");


exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.findAll({
            include: [{
                model: User
            }]
        });
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
exports.approveHospital = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            status
        } = req.body; // ستكون قيمتها "approved"

        const hospital = await Hospital.findByPk(id);

        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found"
            });
        }

        // تحديث الحالة
        hospital.status = status;
        await hospital.save();

        res.status(200).json({
            message: "Hospital approved successfully",
            hospital
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// Create Hospital Profile (Post)
exports.createHospital = async (req, res) => {
    try {
        const newHospital = await Hospital.create(req.body);
        res.status(201).json(newHospital);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};