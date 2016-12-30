'use strict';

const fs = require('fs');
const path = require('path');

const glob = require('glob');
const cheerio = require('cheerio');
const URI = require('urijs');

const docs = path.join(process.cwd(), 'docs');
const list = glob.sync('{**/*.example.html,**/*.example-*.html}', {
  cwd: docs,
});

const examples = {};

list.forEach(function(file) {
  const key = '/' + file;
  const absolutePath = path.join(docs, file);
  const contents = fs.readFileSync(absolutePath, {encoding: 'utf8'});
  const doc = cheerio.load(contents);

  const title = doc('h1').first().text();
  const jsbin = doc('link[rel="jsbin"]').attr('href');
  const embed = URI(jsbin).segment('embed').query('output').toString();
  const edit = URI(jsbin).segment('edit').toString();
  const url = '/medialize/ally.js/' + file;

  examples[key] = {
    title: title,
    jsbin: jsbin,
    url: url,
    embed: embed,
    edit: edit,
  };
});

module.exports = examples;
