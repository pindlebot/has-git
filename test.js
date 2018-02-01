require('./').hasGit().then(result => console.log(result))
require('./').isDirty().then(result => console.log(result))
require('./').getConfig().then(result => console.log(result))