
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Congrats, you made it.',
  });
});

module.exports = router;
