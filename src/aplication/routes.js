const express = require('express');
const router = express.Router();
const getUser = require('./get-user-controller');
const getRepository = require('./get-respositires-from-user');

router.post('/get-user', getUser)
router.get('/get-repository', getRepository)

module.exports = router;