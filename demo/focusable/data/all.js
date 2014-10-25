define(function defineDemoFocusableData(require) {
  return {
    'a11y': require('./a11y'),
    'chrome-stable': require('./chrome-stable'),
    'chrome-nightly': require('./chrome-nightly'),
    'firefox-stable': require('./firefox-stable'),
    'firefox-nightly': require('./firefox-nightly'),
    'ie-11': require('./ie-11'),
    'safari-6_2': require('./safari-6.2'),
    'webkit-nightly': require('./webkit-nightly'),
  };
});