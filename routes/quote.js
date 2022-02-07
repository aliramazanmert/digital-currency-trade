var express = require("express");
var router = express.Router();
const quoteController = require('../controllers/quote')

router.post("/", quoteController.exchangeCurrency);

module.exports = router;
