const { Axios } = require('axios')
const cliente = require('../config/redis')
const RedisUtils = require('../utils/redis-utils')
const TransformData = require('../utils/transform-data-from-github')
const UserRepository = require('../repositories/prisma-repository/user-repository-prisma')
const { PrismaClient } = require('@prisma/client')
const GitHubService = require('../services/gitHubService')

const prismaClient = new PrismaClient()

const redisUtils = new RedisUtils(cliente)
const transformData = new TransformData()
const axios = new Axios()
const userRepository = new UserRepository(prismaClient)

const gitHubService = new GitHubService(redisUtils, axios, userRepository, transformData)



async function fetchRepository(req, res) {

    const { username, repoName } = req.body

    try {

        const result = await gitHubService.getRepositoriesFromUser(username, repoName)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = fetchRepository