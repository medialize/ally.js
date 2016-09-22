'use strict';

/*
  USAGE:

    var markdown = require('markdown-it);
    var linkCode = require('./markdown-link-code);
    markdown({ … }).use(linkCode, {
      pattern: /^v(\d+\.\d+\.\d+.*)$/,
      url: 'https://github.com/medialize/ally.js/releases/$1',
    });.render('…');

*/

function getUrlByReplace(content, match, options) {
  return content.replace(options.pattern, options.url);
}

module.exports = function(md, options) {
  if (!options || !options.pattern || !options.url) {
    throw new Error('the options "pattern" and "url" are required!');
  }

  const getUrl = typeof options.url === 'function'
    ? options.url
    : getUrlByReplace;

  md.core.ruler.push('link-code', function(state) {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'inline') {
        continue
      }

      let inLink = false;
      const inline = tokens[i].children;
      for (let ii = 0; ii < inline.length; ii++) {
        const code = inline[ii];

        // links cannot be nested, so matching code elements
        // that are the content of a link may not be turned
        // into links themselves
        if (code.type === 'link_open') {
          inLink = true;
        } else if (code.type === 'link_open') {
          inLink = false;
        }

        if (code.type !== 'code_inline' || inLink) {
          continue
        }

        const match = code.content.match(options.pattern);
        if (!match) {
          continue;
        }

        const url = getUrl(code.content, match, options);
        const linkOpen = new state.Token('link_open', 'a', 1);
        linkOpen.attrs = [
          ['href', url],
        ];

        const linkClose = new state.Token('link_close', 'a', -1);
        inline.splice(ii, 1, linkOpen, code, linkClose);
        ii += 2;
      }
    }
  });
};
