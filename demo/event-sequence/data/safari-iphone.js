define(function defineDemoEventSequenceSafariIphone(require) {
  'use strict';

  // The contents of this file have been collected by running event-sequence/test.html

  return {
   "platform": {
     "description": "Safari 8.0 on Apple iPhone (iOS 8.1.1)",
     "layout": "WebKit",
     "manufacturer": "Apple",
     "name": "Safari",
     "prerelease": null,
     "product": "iPhone",
     "ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B435 Safari/600.1.4",
     "version": "8.0",
     "os": {
       "architecture": 32,
       "family": "iOS",
       "version": "8.1.1"
     }
   },
   "events": [
     [
       {
         "event": "touchstart",
         "target": "first",
         "related": "none"
       },
       {
         "event": "touchend",
         "target": "first",
         "related": "none"
       },
       {
         "event": "mousedown",
         "target": "first",
         "related": "none"
       },
       {
         "event": "focus",
         "target": "first",
         "related": "none"
       },
       {
         "event": "focusin",
         "target": "first",
         "related": "none"
       },
       {
         "event": "mouseup",
         "target": "first",
         "related": "none"
       },
       {
         "event": "click",
         "target": "first",
         "related": "none"
       },
       {
         "event": "active-element",
         "target": "first",
         "related": "BODY"
       }
     ],
     [
       {
         "event": "blur",
         "target": "first",
         "related": "second"
       },
       {
         "event": "focusout",
         "target": "first",
         "related": "second"
       },
       {
         "event": "focus",
         "target": "second",
         "related": "first"
       },
       {
         "event": "focusin",
         "target": "second",
         "related": "first"
       },
       {
         "event": "active-element",
         "target": "second",
         "related": "first"
       }
     ],
     [
       {
         "event": "blur",
         "target": "second",
         "related": "none"
       },
       {
         "event": "focusout",
         "target": "second",
         "related": "none"
       },
       {
         "event": "active-element",
         "target": "BODY",
         "related": "second"
       }
     ],
     [
       {
         "event": "touchstart",
         "target": "P",
         "related": "none"
       }
     ],
     [
       {
         "event": "touchend",
         "target": "P",
         "related": "none"
       }
     ],
     [
       {
         "event": "touchstart",
         "target": "fifth",
         "related": "none"
       },
       {
         "event": "touchend",
         "target": "fifth",
         "related": "none"
       },
       {
         "event": "mousedown",
         "target": "fifth",
         "related": "none"
       },
       {
         "event": "focus",
         "target": "fourth",
         "related": "none"
       },
       {
         "event": "focusin",
         "target": "fourth",
         "related": "none"
       },
       {
         "event": "mouseup",
         "target": "fifth",
         "related": "none"
       },
       {
         "event": "click",
         "target": "fifth",
         "related": "none"
       },
       {
         "event": "active-element",
         "target": "fourth",
         "related": "BODY"
       }
     ]
   ]
  };
});