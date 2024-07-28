const express = require('express');
const app = express()
const routes = require('./aplication/routes');
const getUser = require('./aplication/get-user-controller');

app.use(express.json())

app.post('/api', getUser)
app.get('/', (req, res) => {
    res.send('Hello Worldb2ewe')
})

module.exports = { app }