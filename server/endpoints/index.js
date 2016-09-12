const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
router.use('/students', require('./students'));

module.exports = router;
