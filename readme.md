## has-git

### hasGit([cwd]): Promise<T | F>
- Checks whether git is initialized for the project. 

### getConfig([cwd]): Promise<{}>
- Returns the project's git config with `git config --list`

## isDirty([cwd]): Promise<T | F>
- Checks whether the project has untracked changes. Does not check for untracked files.

```js
const { hasGit, getConfig, isDirty } = require('has-git')

hasGit().then(result => {
  console.log(result) // true
})

getConfig().then(result => {
  console.log(result) 
  /*
  {
    user: { 
      name: 'Steve', 
      email: 'steve@apple.com' 
    },
    core: { 
      repositoryformatversion: '0',
      filemode: 'true',
      bare: 'false',
      logallrefupdates: 'true',
      ignorecase: 'true',
      precomposeunicode: 'true' 
    },
    remote: { 
      origin: { 
        url: 'https://github.com/unshift/has-git.git',
        fetch: '+refs/heads/*:refs/remotes/origin/*' 
      } 
    } 
  }
  */
})

isDirty().then(result => {
  console.log(result) // true if untracked changes are present
})

```

