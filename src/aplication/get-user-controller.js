const { getUserFromGitHub } = require("../services/gitHubService")

async function getUserRepositories(req, res) {

    const { username } = req.body

    try {
        const result = await getUserFromGitHub(username)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getUserRepositories