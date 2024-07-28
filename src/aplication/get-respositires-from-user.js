const { getRepositoriesFromUser } = require("../services/gitHubService")

async function getRepository(req, res) {

    const { username } = req.body

    try {
        const result = await getRepositoriesFromUser(username)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getRepository