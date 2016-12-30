'use strict';

const examples = require('../parse-examples');

module.exports = function(md/*, options */) {
  md.core.ruler.push('container_example', function(state) {
    const tokens = state.tokens;
    let containerOpen;
    let headingContent;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'container_example_open') {
        containerOpen = tokens[i];
        continue;
      } else if (!containerOpen) {
        continue;
      }

      if (!headingContent && tokens[i].type === 'heading_open') {
        headingContent = tokens[i + 1];
        continue;
      }

      if (tokens[i].type !== 'container_example_close') {
        continue;
      }

      const url = containerOpen.info.trim().split(' ', 2)[1];
      const example = examples[url];

      if (!example) {
        /* eslint-disable no-console */
        console.error('could not find example', url);
        /* eslint-enable no-console */
      }

      if (headingContent) {
        // headingContent.content = example.title;
        headingContent.children[0].content = example.title;
      }

      const html = new state.Token('html_block', '', 0);
      html.content = '<div>\n'
        + '<a class="jsbin-embed" href="' + example.embed + '">' + example.title + ' on jsbin.com</a>\n'
        + '<script src="https://static.jsbin.com/js/embed.min.js?3.35.3"></script>\n'
        + '</div>\n'
        + '<p>\n'
        + '<a href="' + example.edit + '" target="_blank">play with <span class="visuallyhidden">' + example.title + '</span> on jsbin.com</a>'
        + ' or <a href="' + example.url + '" target="_blank">open the document <span class="visuallyhidden">of ' + example.title + '</span></a>'
        + '</p>\n';

      tokens.splice(i, 0, html);
      containerOpen = headingContent = null;
    }
  });
};
