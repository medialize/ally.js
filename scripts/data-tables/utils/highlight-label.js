var Prism = require('prismjs');

module.exports = function beautifyIdentLabel(label, ident) {
  if (label === ident) {
    return '<code class="language-css">'
      + Prism.highlight(label, Prism.languages.css, 'css')
      + '</code>';
  }

  return '<code class="language-html">'
    + Prism.highlight(label, Prism.languages.markup, 'html')
    + '</code>';
};
