const { cliente } = require("../config/redis");

async function redisUtils(username, data) {
    const expireInOneMinute = 60
    const stringJson = JSON.stringify(data)
    const response = await cliente.hSet(username, 'data', stringJson)

    if (!response) {
        throw new Error(`Error in save user`)
    }

    await cliente.expire(username, expireInOneMinute)

    return response

}

async function fecthRegisData(username) {
    const response = await cliente.hGet(username, 'data')

    return response
}


module.exports = { redisUtils, fecthRegisData }
