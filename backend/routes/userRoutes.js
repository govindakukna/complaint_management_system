const express = require("express");
const {registerUser,loginUser} = require("../controllers/userControllers")

const router = express.Router();

router.route("/signup").post(registerUser);
router.post("/",loginUser);

module.exports = router;
