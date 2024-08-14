class TransformData {
    transform(repoData) {
        return repoData.map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            issuesOpen: repo.open_issues_count,
            html_url: repo.html_url
        }))
    }
}

module.exports = TransformData