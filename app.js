const express = require('express')
const path = require('path')
const favicon = require('express-favicon')

require('dotenv').config()
const config = require('./config')
const PORT = config.port
const mongoose = require('mongoose')

const app = express()
app.use(favicon(__dirname + '/client/build/favicon.ico'))
app.use(express.json({ extended: true }))

app.use('/api/tests', require('./api/tests'))
app.use('/api/users', require('./api/users'))
app.use('/api/passings', require('./api/passings'))
app.use('/api/results', require('./api/results'))

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

async function start() {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }
    catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()