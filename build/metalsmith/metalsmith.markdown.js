
const markdown = require('metalsmith-markdownit');
const markdownOptions = {
  linkify: true,
  html: true,
};

module.exports = function() {
  return markdown(markdownOptions);
};
