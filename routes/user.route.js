const {
  displaySignup,
  displayBiodata,
} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/signup", displaySignup);

router.post("/biodata", displayBiodata);
module.exports = router;
