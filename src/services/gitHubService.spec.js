import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { getUserFromGitHub } from './gitHubService.js'

// Mock do axios
vi.mock('axios')

describe('GitHub Service', () => {
    beforeEach(() => {
        // Limpar todos os mocks antes de cada teste
        vi.clearAllMocks()
    })

    it('deve buscar informações do usuário', async () => {
        const username = 'octocat'
        const userData = { login: 'octocat', id: 1, name: 'The Octocat' }

        // Configurar o mock para retornar o objeto de dados do usuário
        axios.get.mockResolvedValueOnce({ data: userData })

        // Chamar a função que está sendo testada
        const user = await getUserFromGitHub(username)

        // Verificar se a resposta é igual aos dados esperados
        expect(user).toEqual(userData)

        // Verificar se o axios.get foi chamado com a URL correta
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
