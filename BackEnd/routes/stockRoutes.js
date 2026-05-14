const express = require("express");
const router = express.Router();
const bloodStockController = require("../controllers/bloodStockController");

router.get("/", bloodStockController.getAllStock); 
router.post("/", bloodStockController.addToStock); 
router.patch("/:id", bloodStockController.updateStock); 
router.delete("/:id", bloodStockController.deleteStock);
module.exports = router;