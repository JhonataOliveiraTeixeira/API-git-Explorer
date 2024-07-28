const { app } = require('./app')

const port = 3333
app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
})