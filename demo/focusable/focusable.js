require.config({
  paths: {
    a11y: '../../src'
  }
});

function captureStuff() {
  // focus does not bubble so attach the listener to every element in the dom and log events to focusHistory
  var elements = [].slice.call(document.body.querySelectorAll('*'), 0);
  var focusHistory = [document.activeElement && (document.activeElement.getAttribute('data-label') || document.activeElement.nodeName) || 'no-initial-focus'];
  function logFocusEvent(event) {
    focusHistory.push(event.target.getAttribute('data-label') || event.target.nodeName);
  }
  function registerFocusLogging(element) {
    element.addEventListener('focus', logFocusEvent, false);
  }
  registerFocusLogging(document.body);
  elements.forEach(registerFocusLogging);

  // try to focus every single element, successes wil end up in focusHistory
  elements.forEach(function(element) {
    element.focus && element.focus();
  });

  setTimeout(function() {
    document.getElementById('focusable').textContent = JSON.stringify(focusHistory, null, 2);

    // reset focusHistory
    document.activeElement.blur();
    focusHistory.length=0;

    alert('with closed DevTools, focus the browser\'s address bar and hit TAB until you reach it again. Then click the "Tab Order" headline');
    document.getElementById('output-tab-order').addEventListener('click', function() {
      document.getElementById('tab-order').textContent = JSON.stringify(focusHistory, null, 2);
    }, false);
  }, 1000)
}

captureStuff();

// if (window.isLoaded) {
//   captureStuff();
// } else {
//   window.onLoad = captureStuff;
// }


// 
// require(['a11y/dom/is-visible'], function (isVisible) {
//   var links = document.querySelectorAll('a');
//   var visibleLinks = [].filter.call(links, isVisible);
// 
//   function textContent(element) {
//     return element.textContent;
//   }
// 
//   console.log("links", [].map.call(links, textContent));
//   console.log("visible", [].map.call(visibleLinks, textContent));
// });
// 
