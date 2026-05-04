const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.get("/", hospitalController.getAllHospitals);
router.post("/", hospitalController.createHospital);
router.patch('/:id', hospitalController.approveHospital);
module.exports = router;