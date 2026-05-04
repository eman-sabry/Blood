const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");


router.get("/", userCtrl.getAllUsers);
router.post('/users', userCtrl.createUserByAdmin);
router.get("/:id", userCtrl.getUserById);

router.patch("/:id", userCtrl.updateUser);

router.delete("/:id", userCtrl.deleteUser);

module.exports = router;