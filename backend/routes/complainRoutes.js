// routes/complainRoutes.js
const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  registerComplain,
  fetchComplains,
} = require("../controllers/complainControllers");

const router = express.Router();

router.post("/register", protect, registerComplain);
router.get("/", protect, fetchComplains);

module.exports = router;
