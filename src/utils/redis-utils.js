class RedisUtils {

    constructor(redisClient) {
        this.redisCliente = redisClient

    }

    async redisUtils(username, data) {
        const expireInOneMinute = 60
        const stringJson = JSON.stringify(data)
        const response = await this.redisCliente.hSet(username, 'data', stringJson)

        if (!response) {
            throw new Error(`Error in save user`)
        }

        await this.redisCliente.expire(username, expireInOneMinute)

        return response

    }

    async fetchRegisData(username) {
        const response = await this.redisCliente.hGet(username, 'data')

        return response
    }
}

module.exports = RedisUtils
