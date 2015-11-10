
'use strict';

function extractData($, data) {
  // extract h1 to title
  if (!data.title) {
    data.title = $('h1').text();
  }

  // extract first <p> to excerpt
  // inlining what metalsmith-excerpts would've done
  // https://github.com/segmentio/metalsmith-excerpts/blob/master/lib/index.js
  if (!data.excerpt) {
    const p = $('p').first();
    data.excerpt = $.html(p).trim();
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

function makeHeadlinesLinkable($/*, data*/) {
  $('h1, h2, h3, h4, h5, h6').each(function() {
    const $this = $(this);

    // add IDs to headlines
    const id = $this.attr('id') || $this.text()
      .replace(/[^a-z0-9]+/ig, '-')
      .replace(/^-|-$/g, '');

    // add link to self
    const $link = $('<a id="" href="" class="link-to-headline" aria-label="link to headline"></a>')
      .attr('id', id)
      .attr('href', '#' + id)
      .html('&#128279');

    $this
      .removeAttr('id')
      .prepend($link);
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
    $ul.after($div);
    $li.remove();
    if (!$ul.children().length) {
      $ul.remove();
    }
  });
}

function embedJsbin($/*, data*/) {
  $('pre > code.language-embed').each(function() {
    const $code = $(this);
    const $pre = $code.parent();
    const $embed = $($code.text());
    const $link = $('<a>')
      .attr('href', $embed.first().attr('href'))
      .attr('target', '_blank')
      .attr('class', 'open-embed')
      .text('Open the embedded demo in a new window')
      .insertAfter($pre);
    const $container = $('<section>')
      .attr('class', 'embed')
      .append($embed)
      .append($link);
    $pre.after($container);
    $pre.remove();
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

  makeHeadlinesLinkable($, data);
  extractTableOfContents($, data);

  convertNoteBlocks($, data);

  embedJsbin($, data);
  convertCodeLanguageForPrism($, data);
};
