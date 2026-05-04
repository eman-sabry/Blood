const {
    Donor,
    User
} = require("../models/index");

// Get All Donors
exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.findAll({
            include: [{
                model: User
            }]
        });
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByPk(req.params.id);

        if (!donor) {
            return res.status(404).json({
                message: "Donor not found"
            });
        }

        await donor.update(req.body);

        res.status(200).json({
            message: "Donor updated successfully",
            donor
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};

// Create Donor Profile
exports.createDonor = async (req, res) => {
    try {
        const newDonor = await Donor.create(req.body);
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};