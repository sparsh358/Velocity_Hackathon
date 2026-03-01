const express = require("express");
const { analyzeCountries } = require("../controllers/analyze.controller");

const router = express.Router();

router.get("/analyze", analyzeCountries);
module.exports = router;