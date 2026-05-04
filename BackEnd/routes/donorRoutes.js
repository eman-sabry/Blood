const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");

router.get("/", donorController.getAllDonors);
router.post("/", donorController.createDonor);
router.patch("/:id", donorController.updateDonor);

module.exports = router;