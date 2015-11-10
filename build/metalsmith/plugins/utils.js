
const utils = {

  textToId: function(text) {
    return text
      .replace(/[^a-z0-9]+/ig, '-')
      .replace(/^-|-$/g, '');
  },

  makeHeadlineLinkable: function($element, $) {
    // add IDs to headlines
    const id = $element.attr('id') || utils.textToId($element.text());

    // add link to self
    const $link = $('<a id="" href="" class="link-to-headline" aria-label="link to headline"></a>')
      .attr('id', id)
      .attr('href', '#' + id)
      .html('&#128279');

    $element
      .removeAttr('id')
      .prepend($link);
  },

};

module.exports = utils;
