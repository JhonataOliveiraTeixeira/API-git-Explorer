import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { getUserFromGitHub } from './gitHubService.js'

vi.mock('axios')

describe('GitHub Service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('deve buscar informações do usuário', async () => {
        const username = 'octocat'
        const userData = { login: 'octocat', id: 1, name: 'The Octocat' }

        axios.get.mockResolvedValueOnce({ data: userData })

        const user = await getUserFromGitHub(username)

        expect(user).toEqual(userData)

        expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}`)
    })

    it('deve lançar erro ao não encontrar o usuário', async () => {
        const username = 'nonexistentuser'
        const errorMessage = 'Erro: 404'

        axios.get.mockRejectedValueOnce({
            response: {
                status: 404,
            },
        })

        await expect(getUserFromGitHub(username)).rejects.toThrow(errorMessage)
    })

    it('deve lançar erro de rede', async () => {
        const username = 'octocat'
        const errorMessage = 'Erro: Network Error'

        axios.get.mockRejectedValueOnce(new Error('Network Error'))

        await expect(getUserFromGitHub(username)).rejects.toThrow(errorMessage)
    })
})
