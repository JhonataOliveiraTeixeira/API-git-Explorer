const express = require('express');
const router = express.Router();
const getUser = require('./get-user-controller');

router.post('/get-user', getUser)

module.exports = router;