const git = require('../')

git.hasGit().then(result => console.log('hasGit', result))
git.isDirty().then(result => console.log('isDirty', result))
git.getConfig().then(result => console.log('getConfig', result))
git.listUntracked().then(result => console.log('listUntracked', result))
git.listGitignored().then(result => console.log('listGitignored', result.length))
git.getShortSHA().then(result => console.log('getShortSHA', result))
