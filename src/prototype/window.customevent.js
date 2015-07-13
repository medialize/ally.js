
if (!window.CustomEvent) {
  // https://developer.mozilla.org/en/docs/Web/API/CustomEvent#Polyfill
  const CustomEvent = function CustomEvent(event, params) {
    const evt = document.createEvent('CustomEvent');

    !params && (params = {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    });

    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}
