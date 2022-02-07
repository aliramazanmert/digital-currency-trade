var express = require('express');
var router = express.Router();
const quoteRouter = require('./quote');

router.use("/quote", quoteRouter);

module.exports = router;
