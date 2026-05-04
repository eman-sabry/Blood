const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.get("/", hospitalController.getAllHospitals);
router.post("/", hospitalController.createHospital);
router.patch("/user/:userId", hospitalController.updateHospital);

module.exports = router;