var express = require('express');
var router = express.Router();
const quoteRouter = require('./quote');

router.use("/quote", quoteRouter);

router.use("/", (req,res) => {
  res.json({ message: 'Welcome' });
});

module.exports = router;
