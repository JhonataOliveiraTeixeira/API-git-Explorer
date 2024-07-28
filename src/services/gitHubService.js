import axios from 'axios'

const BASE_URL = 'https://api.github.com'

const getUserFromGitHub = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}`)
        return response.data
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

const getRepositoriesFromUser = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}/repos`)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error(`Erro ${response.status}: ${error.response.data.message}`)
        } else if (error.request) {
            throw new Error('User not found')
        }
        else {
            throw new Error(`Erro: ${error.message}`)
        }
    }
}

export { getUserFromGitHub, getRepositoriesFromUser, BASE_URL }