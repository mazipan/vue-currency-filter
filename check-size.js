const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size');
const bytes = require('bytes');
const chalk = require('chalk');

const SKIP_FILES = ['.gitkeep']

function readDirs(dirname, onDir, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    filenames
      .filter(filename => !SKIP_FILES.includes(filename))
      .map(function (filename) {
        const isDir = fs.statSync(dirname + '/' + filename).isDirectory();
        if (isDir) {
          readDirs(dirname + '/' + filename, onDir, onError)
        } else {
          onDir(dirname + '/' + filename, filename);
        }
      });
  });
}

setTimeout(() => {
  readDirs(path.resolve('./lib-out/'), async (filepath, filename) => {
    try {
      console.log(chalk.greenBright(`> ${filename}: ${bytes(gzipSize.fileSync(filepath))}`));
    } catch (err) {
      console.error(err)
    }
  }, (err) => {
    console.error(err)
  })
}, 1000);
