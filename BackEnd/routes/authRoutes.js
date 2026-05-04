const express = require("express");
const router = express.Router();
const {
  registerDonor,
  registerHospital,
  registerAdmin,
  getMe
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/me", verifyToken, getMe);

router.post("/register-donor", registerDonor);

router.post("/register-hospital", registerHospital);

router.post("/register-admin", registerAdmin);

module.exports = router;