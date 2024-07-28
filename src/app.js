const express = require('express');
const app = express()
const getUser = require('./aplication/get-user-controller');
const getRepository = require('./aplication/get-respositires-from-user');

app.use(express.json())

app.post('/api', getUser)
app.get('/api/repository', getRepository)

module.exports = { app }