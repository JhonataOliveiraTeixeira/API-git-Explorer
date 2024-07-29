const express = require('express');
const router = express.Router();
const getUserRepositories = require('./get-user-controller')
const getRepository = require('./get-respositires-from-user');

router.post('/api', getUserRepositories)
router.get('/fetch-repository', getRepository)

module.exports = router;