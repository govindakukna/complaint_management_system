const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  loginAdmin,
  fetchAllComplains,
  updateComplainStatus,
} = require("../controllers/adminControllers");

router.post('/adminlogin',loginAdmin);
router.get("/", protect, fetchAllComplains);
router.post("/updatecomplainstatus", protect, updateComplainStatus);

module.exports = router;
