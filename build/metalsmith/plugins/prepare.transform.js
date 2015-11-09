
'use strict';

module.exports = function($, data) {

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

  // add IDs to headlines
  $('h1, h2, h3, h4, h5, h6').each(function() {
    const $this = $(this);
    let id = $this.attr('id');
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
    const $this = $(this);
    data.toc.push({
      id: String($this.attr('id')),
      text: String($this.text()),
    });
  });

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

};
