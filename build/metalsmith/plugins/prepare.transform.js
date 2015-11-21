
'use strict';

const utils = require('./utils.js');

function extractData($, data) {
  // extract h1 to title
  if (!data.title) {
    data.title = $('h1').text();
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
    let href = $this.attr('href');
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

function makeHeadlinesLinkable($/*, data*/) {
  $('h1, h2, h3, h4, h5, h6').each(function() {
    utils.makeHeadlineLinkable($(this), $);
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
    const id = $link.attr('id');
    $link.remove();
    const text = $this.text();

    data.toc.push({
      id: String(id),
      text: String(text),
    });
  });
}

function convertNoteBlocks($/*, data*/) {
  // replace NOTE: and WARNING: lists by proper blocks
  $('ul li strong').each(function() {
    const $label = $(this);
    const $li = $label.parent();
    const $ul = $li.parent();
    const label = $label.text();
    if (label !== 'NOTE:' && label !== 'WARNING:' && label !== 'HELP:') {
      return;
    }

    const $div = $('<div>').attr('class', label.slice(0, -1).toLowerCase());
    $div.append($li.html());
    $ul.before($div);
    $li.remove();
    if (!$ul.children().length) {
      $ul.remove();
    }
  });
}

function convertUnorderedListToDefinitionList($/*, data*/) {
  $('ul').each(function() {
    const $ul = $(this);
    const $titles = $ul.find('li > strong:first-child');
    if ($titles.length !== $ul.children().length) {
      return;
    }

    let mismatch = false;
    $titles.each(function() {
      const term = String($(this).text());
      if (term.slice(-1) !== ':' || term === 'EXAMPLE:') {
        mismatch = true;
      }
    });

    if (mismatch) {
      return;
    }

    const $dl = $('<dl>');
    $titles.each(function() {
      const $term = $(this);
      const $definition = $term.parent();
      const term = String($term.remove().text());
      const definition = $definition.html();
      $dl.append($('<dt>').text(term));
      $dl.append($('<dd>').html(definition));
    });

    $ul.after($dl);
    $ul.remove();
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
  makeHeadlinesLinkable($, data);
  extractTableOfContents($, data);

  convertNoteBlocks($, data);
  convertUnorderedListToDefinitionList($, data);

  convertCodeLanguageForPrism($, data);
};
