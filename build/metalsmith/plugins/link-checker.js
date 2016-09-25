'use strict';

const URI = require('urijs');
const cheerio = require('cheerio');

const htmlFile = /\.html$/;
function filterHtmlFile(filename) {
  return Boolean(filename.match(htmlFile));
}

function validateUrl(index, uri) {
  if (uri.authority()) {
    // fully qualified, possibly external URL
    return null;
  }

  const _fragment = uri.fragment();
  let _path = uri.path();

  if (_path.slice(-1) === '/') {
    // expand directory/ links to directory/index.html
    _path += 'index.html';
  }

  if (index[_path]) {
    if (_fragment) {
      return index[_path][_fragment]
        // fragment exists in target document
        ? null
        // fragment not found in target document
        : 'fragment not found';
    }

    // URL is known to metalsmith
    return null;
  }

  return 'file not found';
}

function verifyLinks(index, filename, $, ignore) {
  const errors = [];

  $('a').each(function() {
    const $link = $(this);
    const text = $link.text();
    const url = $link.attr('href');
    if (!url) {
      // empty href links to the document it's found in
      return;
    }

    let uri;

    try {
      uri = URI(url, filename);
    } catch (e) {
      errors.push({
        url: url,
        text: text,
        reason: e,
      });

      return;
    }

    if (ignore && ignore(uri, url)) {
      return;
    }

    const result = validateUrl(index, uri);
    if (!result) {
      return;
    }

    errors.push({
      url: url,
      text: text,
      reason: result,
    });
  });

  return errors;
}

function extractFragmentTargets($) {
  const targets = {};

  $('*[id]').each(function() {
    const id = $(this).attr('id');
    if (!id) {
      return;
    }

    targets[id] = true;
  });

  $('a[name]').each(function() {
    const id = $(this).attr('name');
    if (!id) {
      return;
    }

    targets[id] = true;
  });

  return targets;
}

/*
  options {
    // [default] callback to filter which files are investigated
    filter: function(filename) {
      // return true to include, false to ignore
      return Boolean(filename.match(/\.html$/))
    }
    // [optional] callback to filter which URLs are investigated
    ignore: function(uri, url) {
      // return true to ignore, false to include
    }
  }
*/
module.exports = function plugin(options) {
  if (!options) {
    options = {};
  }

  if (!options.filter) {
    options.filter = filterHtmlFile;
  }

  return function(files, metalsmith, done) {
    const documents = {};
    const index = {};

    Object.keys(files).forEach(function(filename) {
      if (!options.filter(filename)) {
        index[filename] = {};
        return;
      }

      const file = files[filename];
      const contents = file.contents.toString()
      const $ = cheerio.load(contents);
      documents[filename] = $;
      index[filename] = extractFragmentTargets($);
    });

    Object.keys(documents).forEach(function(filename) {
      const errors = verifyLinks(index, filename, documents[filename], options.ignore);
      if (errors.length) {
        /*eslint-disable no-console */
        console.log('bad links found in', filename);
        console.log(JSON.stringify(errors, null, 2));
        /*eslint-enable no-console */
      }
    });

    done();
  };
};
