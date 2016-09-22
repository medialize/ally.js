
'use strict';

function extractData($, data) {
  // extract h1 to title
  if (!data.title) {
    data.title = $('h1').text().replace(/^#\s+/, '');
    data.titleUrlEncoded = encodeURIComponent(data.title);
  }

  // extract first <p> to excerpt
  // inlining what metalsmith-excerpts would've done
  // https://github.com/segmentio/metalsmith-excerpts/blob/master/lib/index.js
  if (!data.excerpt) {
    const $p = $('p').first();
    data.excerpt = $.html($p).trim();
  }
}

function rewriteUrlsFromMdToHtml($/*, data*/) {
  // rewrite relative *.md to *.html
  $('a').each(function() {
    const $this = $(this);
    let href = $this.attr('href') || '';
    if (href.indexOf('://') !== -1 || href.slice(0, 1) === '#') {
      return;
    }

    href = href
      .replace(/\/README\.md(#.*)?$/, '/index.html$1')
      .replace(/\.md(#.*)?$/, '.html$1');
    $this.attr('href', href);
  });
}

function removeEmptyApiSections($/*, data*/) {
  $('h2').each(function() {
    const $headline = $(this);
    if ($headline.next().is('h2')) {
      $headline.remove();
    }
  });

  $('h3').each(function() {
    const $headline = $(this);
    if ($headline.next().is('h2, h3')) {
      $headline.remove();
    }
  });
}

function extractTableOfContents($, data) {
  // prepare Table Of Contents
  // inlining what metalsmith-autotoc would've done
  // https://github.com/anatoo/metalsmith-autotoc/blob/master/index.js
  data.toc = [];
  $('h2').each(function() {
    const $this = $(this).clone();
    const $link = $this.find('.link-to-headline');
    const id = $link.parent().attr('id');
    $link.remove();
    const text = $this.text();

    data.toc.push({
      id: String(id),
      text: String(text),
    });
  });
}

function convertCodeLanguageForPrism($/*, data*/) {
  $('pre > code').each(function() {
    const $this = $(this);
    const className = $this.attr('class')
      .replace('language-sh', 'language-bash')
      .replace('language-html', 'language-markup')
      .replace('language-js', 'language-javascript');

    $this.attr('class', className);
  });
}

module.exports = function($, data) {
  extractData($, data);
  rewriteUrlsFromMdToHtml($, data);

  removeEmptyApiSections($, data);
  extractTableOfContents($, data);

  convertCodeLanguageForPrism($, data);
};
