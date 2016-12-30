'use strict';

const fs = require('fs');
const path = require('path');

function escapeHtml(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&quot;');
}

module.exports = function plugin(/* options */) {
  return function(files, metalsmith, done) {
    const indexes = {
      documentation: [],
      tutorial: [],
      api: [],
    };

    Object.keys(files).forEach(function(key) {
      const file = files[key];
      if (!file.algolia) {
        return;
      }

      const index = file.algolia.index;
      delete file.algolia.index;

      file.algolia.objectID = key;
      file.algolia.title = escapeHtml(file.algolia.title);
      file.algolia.excerpt = escapeHtml(file.algolia.excerpt);
      indexes[index].push(file.algolia);

      if (!file.algolia.toc || !file.algolia.toc.length) {
        return;
      }

      file.algolia.toc.forEach(function(headline) {
        indexes[index].push({
          url: file.algolia.url + '#' + headline.id,
          title: escapeHtml(headline.text),
          document: file.algolia.title,
          objectID: key + '#' + headline.id,
        });
      });

      delete file.algolia.toc;
    });

    const web = path.resolve(process.cwd(), 'web');
    const documentationFile = path.resolve(web, 'algolia.documentation.json');
    fs.writeFileSync(documentationFile, JSON.stringify(indexes.documentation, null, 2));

    const tutorialFile = path.resolve(web, 'algolia.tutorial.json');
    fs.writeFileSync(tutorialFile, JSON.stringify(indexes.tutorial, null, 2));

    const apiFile = path.resolve(web, 'algolia.api.json');
    fs.writeFileSync(apiFile, JSON.stringify(indexes.api, null, 2));

    done();
  };
};
