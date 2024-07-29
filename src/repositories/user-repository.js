const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(repoLinks, username) {
    const user = await prisma.user.create({
        data: {
            name: username,
            Repositories: {
                create: repoLinks.map(repo => ({
                    name: repo.name,
                    star: String(repo.stars ?? 0),
                    forks: String(repo.forks ?? 0),
                    issuesOpen: String(repo.issuesOpen ?? 0)
                }))
            }
        }
    })

    return user
}

async function findByUser(username) {
    const user = await prisma.user.findFirst({
        where: {
            name: username
        },
        include: {
            Repositories: true
        }
    })

    return user
}

async function update(repoLinks, username) {
    const user = await findByUser(username)

    if (!user) {
        throw new Error('User not found')
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            Repositories: {
                deleteMany: {},
                create: repoLinks.map(repo => ({
                    name: repo.name,
                    star: String(repo.stars ?? 0),
                    forks: String(repo.forks ?? 0),
                    issuesOpen: String(repo.issuesOpen ?? 0)
                }))
            }
        },
        include: {
            Repositories: true
        }
    })

    return updatedUser
}

module.exports = {
    create,
    findByUser,
    update
}
