const express = require('express')
const router = express.Router()
const getUserRepositories = require('./get-user-controller')
const fetchRepository = require('./fetch-repositories-from user')

router.post('/api', getUserRepositories)
router.post('/fetch-repository', fetchRepository)

module.exports = router