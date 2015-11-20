#!/usr/bin/env node

const path = require('path');

const shelljs = require('shelljs');

const cwd = process.cwd();
const dist = path.resolve(cwd, 'dist');

function moveCommonFiles() {
  const source = path.resolve(dist, 'common', '*');
  shelljs.mv(source, dist);
  shelljs.rm('-rf', path.resolve(dist, 'common'));
}

function copyMetaFiles() {
  shelljs.cp(path.resolve(cwd, '.npmignore'), dist);
  shelljs.cp(path.resolve(cwd, 'package.json'), dist);
  shelljs.cp(path.resolve(cwd, 'README.md'), dist);
  shelljs.cp(path.resolve(cwd, 'CHANGELOG.md'), dist);
  shelljs.cp(path.resolve(cwd, 'LICENSE.txt'), dist);
}

moveCommonFiles();
copyMetaFiles();
