const { getRepositoriesFromUser } = require("../services/gitHubService")

async function fetchRepository(req, res) {

    const { username, repoName } = req.body

    try {
        const result = await getRepositoriesFromUser(username, repoName)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = fetchRepository