
export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">'
      + '<text tabindex="-1">a</text></svg>';
    return element.querySelector('text');
  },
};
