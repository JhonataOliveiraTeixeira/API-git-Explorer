const redis = require('redis')

const cliente = redis.createClient({
    url: 'redis://localhost:6379'
})

cliente.on('error', err => console.log(`Redis client error: ${err}`))

const connectRedis = async () => {
    try {
        await cliente.connect()

        await cliente.flushDb()

        console.log('Connected to Redis')
    } catch (err) {
        console.error('Could not connect to Redis', err)
        throw new Error('Error in save data')
    }
}

connectRedis()

module.exports = { cliente }