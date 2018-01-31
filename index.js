const fs = require('fs')
const pathExists = require('util').promisify(fs.access)
const execa = require('execa')
const set = require('lodash.set')

const appRoot = require('app-root-path').path
const pathToGit = require('path').join(appRoot, '.git')

async function isDirty() {
  try {
    await execa('git', ['diff-index', '--quiet', 'HEAD', '--'])
    return false;
  } catch(err) {
    return true;
  }
}

async function hasGit() {
  try {
    await pathExists(pathToGit)
    return true;
  } catch (err) {
    return false;
  }
}

async function getConfig() {
  try {
    let remotes = await execa('git', ['config', '--list'])

    return remotes.stdout.split(/[\r\n]+/g)
      .reduce((acc, val) => 
        set(acc, val.split('=')[0], val.split('=')[1]), {}
      )
  } catch(err) {
    return undefined
  }
}

module.exports = {
  isDirty,
  hasGit,
  getConfig
}
