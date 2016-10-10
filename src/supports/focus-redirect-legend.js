
// see https://jsbin.com/nenirisage/edit?html,js,console,output

export default {
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><input tabindex="-1"><input tabindex="0">';
    // take care of focus in validate();
    return false;
  },
  validate: function(element, focusTarget, _document) {
    const focusable = element.querySelector('input[tabindex="-1"]');
    const tabbable = element.querySelector('input[tabindex="0"]');

    // Firefox requires this test to focus the <fieldset> first, while this is not necessary in
    // https://jsbin.com/nenirisage/edit?html,js,console,output
    element.focus();

    element.querySelector('legend').focus();
    return _document.activeElement === focusable && 'focusable'
      || _document.activeElement === tabbable && 'tabbable'
      || '';
  },
};
