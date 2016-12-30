
'use strict';

// originally from https://github.com/thiagodemellobueno/metalsmith-packagejson
// ported into this project because of https://github.com/thiagodemellobueno/metalsmith-packagejson/issues/4

const fs = require('fs');
const path = require('path');

function importFile(path) {
  try {
    const content = fs.readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (error) {
    /* eslint-disable no-console */
    console.error('could not parse ', path, 'as JSON');
    console.error(error);
    /* eslint-enable no-console */
  }

  return null;
}

function extractMetalsmithFile(files, name) {
  let data = null;

  if (!files[name]) {
    return data;
  }

  try {
    const content = files[name].contents.toString();
    data = JSON.parse(content);
  } catch (error) {
    /* eslint-disable no-console */
    console.error('could not parse ', name, 'as JSON');
    console.error(error);
    /* eslint-enable no-console */
  }

  delete files[name];

  return data;
}

module.exports = function(options) {
  if (!options) {
    options = {};
  }

  if (!options.file) {
    throw new Error('importJson() needs a file to load');
  }

  if (!options.key) {
    throw new Error('importJson() needs a key to store the data under');
  }

  const filename = path.basename(options.file);
  const filepath = path.join('.', options.file);

  return function(files, metalsmith, done) {
    const metadata = metalsmith.metadata();

    const data = extractMetalsmithFile(files, filename) || importFile(filepath);
    metadata[options.key] = data;

    done();
  };
};
