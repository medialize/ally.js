define([], function() {

  return function(elements, glue) {
    return [].map.call(elements, function(element) {
      return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
    }).join(glue || ', ');
  };

});
