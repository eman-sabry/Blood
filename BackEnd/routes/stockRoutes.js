const express = require("express");
const router = express.Router();
const bloodStockController = require("../controllers/bloodStockController");

// المسارات
router.get("/", bloodStockController.getAllStock); // عرض كل المخزون
router.post("/", bloodStockController.addToStock); // إضافة دم جديد للمخزون
router.patch("/:id", bloodStockController.updateStock); // تعديل كمية أو بيانات ستوك معين
router.delete("/:id", bloodStockController.deleteStock);
module.exports = router;