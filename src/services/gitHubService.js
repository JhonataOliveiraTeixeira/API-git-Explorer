class GitHubService {

    constructor(redisUtils, axios, userRepository, transformData) {
        this.redisUtils = redisUtils
        this.axios = axios
        this.userRepository = userRepository
        this.transformData = transformData
        this.BASE_URL = 'https://api.github.com'
    }


    async getUserFromGitHub(username) {
        try {

            const response = await this.axios.get(`${this.BASE_URL}/users/${username}/repos`)
            const repoLinks = this.transformData.transform(response.data)

            const userExistInRegisDB = await this.redisUtils.fetchRegisData(username)

            if (userExistInRegisDB) {
                return { from: 'Regis Data Base', response: userExistInRegisDB }
            } else {
                await this.redisUtils.redisUtils(username, repoLinks)

            }

            const userAlreadExist = await this.userRepository.findByUser(username)
            console.log(`passou do 28`)

            if (userAlreadExist) {
                const existingRepoLinks = userAlreadExist.Repositories.map(repo => repo.html_url)
                const newRepoLinks = repoLinks.map(repo => repo.html_url)

                const repositoriesChanged = !existingRepoLinks.every(url => newRepoLinks.includes(url))

                if (repositoriesChanged) {
                    const response = await this.userRepository.update(repoLinks, username)
                    return { Response: response }
                } else {
                    return { Response: 'repository already updated', response: response }
                }
            } else {
                const response = await this.userRepository.create(repoLinks, username)
                return { Response: response }
            }
        } catch (error) {
            if (error.response) {
                throw new Error(`Erro: ${error.response.status}`)
            } else if (error.request) {
                throw new Error('Erro: Reponse server not recieve')
            } else {
                throw new Error(`Erro: 1 ${error.message}`)
            }
        }
    }

    async getRepositoriesFromUser(username, repoName) {
        try {
            console.log(`nbão passou do 59`)

            const userAlreadExist = await this.userRepository.findByUser(username)
            if (!userAlreadExist) {
                throw new Error(`User not found`)
            }

            const repository = userAlreadExist.Repositories.find((repo) => repo.name === repoName)

            if (!repository) {
                throw new Error(`Repository not found`)
            }

            return { Response: repository }

        } catch (error) {
            if (error.response) {
                throw new Error(`Erro ${error.response.status}: ${error.response.data.message}`)
            } else if (error.request) {
                throw new Error('User not found')
            } else {
                throw new Error(`Erro: ${error.message}`)
            }
        }
    }

}

module.exports = GitHubService
