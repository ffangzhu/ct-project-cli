const fs = require('fs-extra')
// const glob = require('glob')
const path = require('path')

const TEMPDIR = path.resolve(__dirname, './templates')

module.exports = (targetPath) => {
  return new Promise((resolve, reject) => {
    fs.copy(TEMPDIR, targetPath, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}