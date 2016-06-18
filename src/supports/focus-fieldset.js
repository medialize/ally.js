
export default {
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><p>content</p>';
  },
};
