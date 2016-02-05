# Generating Firefox Profiles

It is possible to configure Firefox instance, e.g. to enable ShadowDOM support. [firefox-profile](https://www.npmjs.com/package/firefox-profile) can generate base64 encoded profiles including preferences and extensions.

The generated profile can be passed to an environment entry for Firefox via the `firefox_profile` capability.

---

```sh
npm install firefox-profile
```

```js
var FirefoxProfile = require('firefox-profile');
var profile = new FirefoxProfile();
profile.setPreference('dom.webcomponents.enabled', true);
profile.updatePreferences();
profile.encoded(function(data) {
  console.log(data);
});
```
