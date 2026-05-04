const express = require("express");
const router = express.Router();
const historyController = require("../controllers/donationHistoryController");

router.get("/", historyController.getHistory); // Get
router.post("/", historyController.createHistory); // Post
router.patch("/:id", historyController.updateHistory); // Patch
router.delete("/:id", historyController.deleteHistory);
module.exports = router;