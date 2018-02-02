const fs = require('fs')
const path = require('path')
const pathExists = require('util').promisify(fs.access)
const set = require('lodash.set')
const exec = require('execa')
const moduleRoot = async () => path.parse(await require('pkg-up')()).dir

async function execa (...args) {
  if (!args[args.length - 1].cwd) {
    args[args.length - 1].cwd = await moduleRoot()
  }
  args.unshift('git')
  return exec(...args)
}

async function run (...args) {
  let result = await execa(...args)

  return result.stdout.split(/\r?\n/)
    .filter(line => line !== '')
}

async function listGitignored (cwd) {
  // git ls-files --ignored --exclude-standard --others
  return run(['ls-files', '--ignored', '--exclude-standard', '--others'], { cwd })
}

async function listUntracked (cwd) {
  // git ls-files --exclude-standard --others
  return run(['ls-files', '--exclude-standard', '--others'], { cwd })
}

async function listTracked (cwd) {
  // git ls-files
  return run(['ls-files'], { cwd })
}

async function isDirty (cwd) {
  try {
    await execa(['diff-index', '--quiet', 'HEAD', '--'], { cwd })
    return false
  } catch (err) {
    return true
  }
}

async function hasGit (cwd) {
  if (!cwd) cwd = await moduleRoot()

  const pathToGit = path.join(cwd, '.git')

  try {
    await pathExists(pathToGit)
    return true
  } catch (err) {
    return false
  }
}

async function getConfig (cwd) {
  try {
    // git config --list
    const remotes = await run(['config', '--list'], { cwd })

    return remotes
      .reduce((acc, val) =>
        set(acc, val.split('=')[0], val.split('=')[1]), {}
      )
  } catch (err) {
    return undefined
  }
}

module.exports = {
  isDirty,
  hasGit,
  getConfig,
  listUntracked,
  listGitignored,
  moduleRoot,
  listTracked
}
