module.exports = function($, data) {

  // extract h1 to title
  if (!data.title) {
    data.title = $('h1').text();
  }

  // extract first <p> to excerpt
  // inlining what metalsmith-excerpts would've done
  // https://github.com/segmentio/metalsmith-excerpts/blob/master/lib/index.js
  if (!data.excerpt) {
    var p = $('p').first();
    data.excerpt = $.html(p).trim();
  }

  // rewrite relative *.md to *.html
  $('a').each(function() {
    var $this = $(this);
    var href = $this.attr('href');
    if (href.indexOf('://') !== -1 || href.slice(0, 1) === '#') {
      return;
    }

    href = href
      .replace(/\/README\.md(#.*)?$/, '/index.html$1')
      .replace(/\.md(#.*)?$/, '.html$1');
    $this.attr('href', href);
  });

  // add IDs to headlines
  $('h1, h2, h3, h4, h5, h6').each(function() {
    var $this = $(this);
    var id = $this.attr('id');
    if (id) {
      return;
    }

    id = $this.text()
      .replace(/[^a-z0-9]+/ig, '-')
      .replace(/^-|-$/g, '');

    $this.attr('id', id);
  });

  // prepare Table Of Contents
  // inlining what metalsmith-autotoc would've done
  // https://github.com/anatoo/metalsmith-autotoc/blob/master/index.js
  data.toc = [];
  $('h2').each(function() {
    var $this = $(this);
    data.toc.push({
      id: String($this.attr('id')),
      text: String($this.text()),
    });
  });

}