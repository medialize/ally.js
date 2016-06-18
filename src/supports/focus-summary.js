
export default {
  element: 'details',
  mutate: function(element) {
    element.innerHTML = '<summary>foo</summary><p>content</p>';
    return element.firstElementChild;
  },
};
