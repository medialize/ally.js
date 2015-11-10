
const path = require('path');
const cheerio = require('cheerio');
const transform = require('./prepare.transform.js');

module.exports = function plugin(/*options*/) {
  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(key) {
      const p = path.parse(key);

      // filter .*
      if (key.substr(0, 1) === '.') {
        delete files[key];
        return;
      }

      // skip mutations for anything that isn't html
      if (p.ext !== '.html') {
        return;
      }

      // skip mutations for example files
      if (p.base.indexOf('.example') !== -1) {
        return;
      }

      // rename README.md to index.html
      // inlining what metalsmith-copy would've done
      // because renaming can only be done imperatively
      // https://github.com/mattwidmann/metalsmith-copy/blob/master/lib/index.js
      if (p.base.toLowerCase() === 'readme.html') {
        p.base = 'index.html';
        const newKey = path.format(p);
        files[newKey] = files[key];
        delete files[key];
        key = newKey;
      }

      // inlining what metalsmith-jquery would've done
      // because we want to mutate a file's data object
      // https://github.com/manheim/metalsmith-jquery/blob/master/lib/index.js
      const page = cheerio.load(files[key].contents);
      transform(page, files[key]);
      files[key].contents = new Buffer(page.html());
    });

    // console.log(options, files, metalsmith);
  };
};
