
const path = require('path');
const fs = require('fs');

const shelljs = require('shelljs');

const cwd = process.cwd();
const dist = path.resolve(cwd, 'dist');

function copySourceFiles() {
  const source = path.resolve(cwd, 'src');
  shelljs.cp('-r', source, dist);
}

function writeVersionFile() {
  const pkg = require(path.resolve(cwd, 'package.json'));
  const versionSource = [
    '',
    '// this file is overwritten by `npm run build:pre`',
    'const version = \'' + pkg.version + '\';',
    'export default version;',
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(dist, 'src/version.js'), versionSource, {encoding: 'utf8'});
}

copySourceFiles();
writeVersionFile();
