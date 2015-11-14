#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const shelljs = require('shelljs');

const cwd = process.cwd();
const dist = path.resolve(cwd, 'dist');

function moveCommonFiles() {
  const source = path.resolve(dist, 'common', '*');
  shelljs.mv(source, dist);
  shelljs.rm('-rf', path.resolve(dist, 'common'));
}

function copyMetaFiles() {
  shelljs.cp(path.resolve(cwd, 'package.json'), dist);
  shelljs.cp(path.resolve(cwd, 'README.md'), dist);
  shelljs.cp(path.resolve(cwd, 'CHANGELOG.md'), dist);
  shelljs.cp(path.resolve(cwd, 'LICENSE.txt'), dist);
}

function patchPackageJson() {
  const file = path.resolve(dist, 'package.json');
  const pkg = require(file);

  // removing files limitation, because we're publishing
  // a directory instead of the entire project
  delete pkg.files;
  // remove scripts, because they're not included in the
  // published bundle anyways
  delete pkg.scripts;
  // maintaining devDependencies so npm can track that

  // redirect main path
  pkg.main = 'ally.min.js';

  // redirect cdnjs base path
  pkg.npmFileMap[0].basePath = './';

  const serialized = JSON.stringify(pkg, null, 2);
  fs.writeFileSync(file, serialized, {encoding: 'utf8'});
}

moveCommonFiles();
copyMetaFiles();
patchPackageJson();
