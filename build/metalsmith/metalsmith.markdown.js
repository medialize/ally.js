
const markdown = require('metalsmith-markdownit');
const markdownOptions = {
  linkify: true,
  html: true,
};

// see https://allyjs.io/contributing/docs.html#Notes-and-warnings
const container = require('markdown-it-container');
const containerOptions = {
  validate: function(params) {
    return params.trim().match(/^(note|warning|tip|help)\b/);
  },
  render: function(tokens, index) {
    const m = tokens[index].info.trim().split(' ');
    if (tokens[index].nesting === 1) {
      // opening tag
      return '<div data-note-type="' + m[0] + '">\n';
    } else {
      // closing tag
      return '</div>\n';
    }
  },
}

module.exports = function() {
  return markdown(markdownOptions)
    .use(container, 'note', containerOptions);
};
