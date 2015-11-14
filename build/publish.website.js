
const path = require('path');
const fs = require('fs');

const pages = require('gh-pages');

const cwd = process.cwd();
const source = path.join(cwd, 'web');

// make sure that gh-pages is made available through our own domain
const domain = 'allyjs.io';
fs.writeFileSync(path.resolve(source, 'CNAME'), domain, {encoding: 'utf8'});

const options = {
  message: 'chore(website): pushing website to gh-pages',
};

pages.publish(source, options, function(err) {
  /*eslint-disable no-console */
  /*eslint-disable no-process-exit */
  if (err) {
    console.error(err);
    process.exit(1);
  }
  /*eslint-enable no-console */
  /*eslint-enable no-process-exit */
});
