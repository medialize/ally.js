
const path = require('path');
const fs = require('fs');

const archiver = require('archiver');

const cwd = process.cwd();
const target = path.resolve(cwd, 'dist', 'ally.js.zip');
const output = fs.createWriteStream(target);
const archive = archiver('zip');

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
  { expand: true, cwd: 'dist', src: ['**/*', '!*.zip', '!.*'] },
]);

archive.finalize();
