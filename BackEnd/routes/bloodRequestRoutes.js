const express = require("express");
const router = express.Router();
const bloodRequestController = require("../controllers/bloodRequestController");


router.get("/", bloodRequestController.getRequests); // Get All
router.post("/", bloodRequestController.createRequest); // Post (Create)
router.patch("/:id", bloodRequestController.updateRequest); // Patch (Update)
router.delete("/:id", bloodRequestController.deleteRequest);

module.exports = router;