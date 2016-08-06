
const path = require('path');
const URI = require('urijs');
const cheerio = require('cheerio');
const utils = require('./utils.js');

function transform($, data, examples) {
  $('ul li strong').each(function() {
    const $label = $(this);
    const $li = $label.parent();
    const $ul = $li.parent();
    const label = $label.text();
    if (label !== 'EXAMPLE:') {
      return;
    }

    $label.remove();
    const $link = $li.find('a');
    const file = $link.attr('href');
    const target = new URI(file, data.path.href).toString();
    const $example = examples[target];
    if (!$example) {
      /* eslint-disable no-console */
      console.error('Could not resolve example ', file, 'from', data.path.base);
      /* eslint-enable no-console */
      return;
    }

    const title = String($example('h1').first().text());
    const $title = $('<h1>').text('Example: ' + title);
    utils.makeHeadlineLinkable($title, $);

    const jsbin = String($example('link[rel="jsbin"]').attr('href'));
    const jsbinEmbed = new URI(jsbin).segment('embed').query('output').toString();
    const jsbinEdit = new URI(jsbin).segment('edit').toString();
    const $embedScript = $('<script src="https://static.jsbin.com/js/embed.min.js?3.35.3"></script>');
    const $embedLink = $('<a class="jsbin-embed" href=""></a>')
      .attr('href', jsbinEmbed)
      .text(title + ' on jsbin.com');

    const $linkSource = $link.clone()
      .attr('target', '_blank')
      .text('open the source document');
    const $linkJsbin = $('<a href=""></a>')
      .text('play with the example on jsbin.com')
      .attr('target', '_blank')
      .attr('href', jsbinEdit);
    const $subline = $('<p>')
      .append($linkJsbin)
      .append(' or ')
      .append($linkSource);

    const $container = $('<section>')
      .attr('class', 'example')
      .append($title)
      .append($embedLink)
      .append($embedScript)
      .append($subline);

    $ul.after($container);
    $li.remove();
    if (!$ul.children().length) {
      $ul.remove();
    }
  });
}

module.exports = function plugin(/*options*/) {
  return function(files, metalsmith, done) {
    const data = metalsmith.metadata();
    const examples = {};
    data.Examples.forEach(function(file) {
      const key = file.path.href;
      examples[key] = cheerio.load(file.contents);
    });

    Object.keys(files).forEach(function(key) {
      const p = path.parse(key);
      // skip mutations for anything that isn't html
      if (p.ext !== '.html') {
        return;
      }
      // skip mutations for example files
      if (p.base.indexOf('.example') !== -1) {
        return;
      }

      const page = cheerio.load(files[key].contents);
      transform(page, files[key], examples);
      files[key].contents = new Buffer(page.html());
    });

    done();
  };
};
