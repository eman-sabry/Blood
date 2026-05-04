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
exports.updateHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({
            where: {
                userId: req.params.userId
            }
        });

        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found"
            });
        }

        await hospital.update(req.body);

        res.status(200).json(hospital);
    } catch (error) {
        res.status(500).json({
            message: error.message
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