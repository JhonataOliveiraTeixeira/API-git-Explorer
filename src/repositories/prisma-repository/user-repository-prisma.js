const UserRepositoiryInterface = require('../user-respository')


class UserRepository extends UserRepositoiryInterface {


    constructor(prismaClient) {
        super()
        this.prisma = prismaClient
    }

    async create(repoLinks, username) {
        const user = await this.prisma.create({
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

    async findByUser(username) {
        const user = await this.prisma.user.findFirst({
            where: {
                name: username
            },
            include: {
                Repositories: true
            }
        })

        return user
    }

    async update(repoLinks, username) {

        const user = await this.findByUser(username)

        if (!user) {
            throw new Error('User not found')
        }

        const updatedUser = await this.prisma.user.update({
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
}

module.exports = UserRepository
