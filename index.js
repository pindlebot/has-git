const fs = require('fs')
const path = require('path')
const pathExists = require('util').promisify(fs.access)
const execa = require('execa')
const set = require('lodash.set')

async function isDirty () {
  try {
    await execa('git', ['diff-index', '--quiet', 'HEAD', '--'])
    return false
  } catch (err) {
    return true
  }
}

async function hasGit () {
  const pathToPkgJson = await require('pkg-up')()
  const pathToGit = path.join(path.parse(pathToPkgJson).dir, '.git')

  try {
    await pathExists(pathToGit)
    return true
  } catch (err) {
    return false
  }
}

async function getConfig () {
  try {
    let remotes = await execa('git', ['config', '--list'])

    return remotes.stdout.split(/\r?\n/g)
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
  getConfig
}
