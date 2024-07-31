const axios = require('axios')
const { create, findByUser, update } = require('../repositories/user-repository')

const BASE_URL = 'https://api.github.com'

const getUserFromGitHub = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}/repos`)
        const repoLinks = response.data.map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            issuesOpen: repo.open_issues_count,
            html_url: repo.html_url
        }))

        const userAlreadExist = await findByUser(username)

        if (userAlreadExist) {
            const existingRepoLinks = userAlreadExist.Repositories.map(repo => repo.html_url)
            const newRepoLinks = repoLinks.map(repo => repo.html_url)

            const repositoriesChanged = !existingRepoLinks.every(url => newRepoLinks.includes(url))

            if (repositoriesChanged) {
                const response = await update(repoLinks, username)
                return { Response: response }
            } else {
                return { Response: 'repository already updated', response: response }
            }
        } else {
            const response = await create(repoLinks, username)
            return { Response: response }
        }
    } catch (error) {
        if (error.response) {
            throw new Error(`Erro: ${error.response.status}`)
        } else if (error.request) {
            throw new Error('Erro: Sem resposta do servidor')
        } else {
            throw new Error(`Erro: ${error.message}`)
        }
    }
}

const getRepositoriesFromUser = async (username, repoName) => {
    try {
        const userAlreadExist = await findByUser(username)
        if (!userAlreadExist) {
            throw new Error(`Usuário não encontrado`)
        }

        const repository = userAlreadExist.Repositories.find((repo) => repo.name === repoName)

        if (!repository) {
            throw new Error(`Repositorio não encontrado`)
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

module.exports = { getRepositoriesFromUser, getUserFromGitHub }
