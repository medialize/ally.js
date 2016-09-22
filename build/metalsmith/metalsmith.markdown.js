
const markdown = require('metalsmith-markdownit');
const markdownOptions = {
  linkify: true,
  html: true,
};

const toc = require('markdown-it-toc-and-anchor').default;
const tocOptions = {
  // we are only interested in the headline mutations,
  // as the TOC is built by a metalsmith plugin
  toc: false,
  anchorClassName: 'link-to-headline',
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

// see https://allyjs.io/contributing/docs.html#Notes-and-warnings
const deflist = require('markdown-it-deflist');

const linkCode = require('./markdown/markdown-link-code');
const linkCodeOptions = {
  pattern: /^v(\d+\.\d+\.\d+.*)$/,
  url: 'https://github.com/medialize/ally.js/releases/$1',
};

module.exports = function() {
  return markdown(markdownOptions)
    .use(container, 'note', containerOptions)
    .use(deflist)
    .use(toc, tocOptions)
    .use(linkCode, linkCodeOptions);
};
