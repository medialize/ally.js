
const path = require('path');
const fs = require('fs');

const archiver = require('archiver');

const cwd = process.cwd();

function createArchive(name, type, options) {
  const target = path.resolve(cwd, 'dist', name);
  const output = fs.createWriteStream(target);
  const archive = archiver(type, options || {});

  output.on('close', function() {
    /*eslint-disable no-console */
    console.log(archive.pointer() + ' total bytes');
    /*eslint-enable no-console */
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  archive.bulk([
    { expand: true, cwd: 'dist', src: ['**/*', '!*.zip', '!*.tar.gz', '!.*'], dest: 'ally.js/' },
  ]);

  archive.finalize();
}

createArchive('ally.js.zip', 'zip');
createArchive('ally.js.tar.gz', 'tar', {
  gzip: true,
});
