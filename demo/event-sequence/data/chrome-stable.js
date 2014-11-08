define(function defineDemoFocusableChrome(require) {
  'use strict';

  // The contents of this file have been collected by running event-sequence/index.html

  return {
    "platform": {
      "description": "Chrome 38.0.2125.111 on OS X 10.8.5",
      "layout": "Blink",
      "manufacturer": null,
      "name": "Chrome",
      "prerelease": null,
      "product": null,
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
      "version": "38.0.2125.111",
      "os": {
        "architecture": 32,
        "family": "OS X",
        "version": "10.8.5"
      }
    },
    "events": [
      [
        {
          "event": "keydown",
          "target": "BODY",
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
          "event": "active-element",
          "target": "first",
          "related": "BODY"
        },
        {
          "event": "keyup",
          "target": "first",
          "related": "none"
        }
      ],
      [
        {
          "event": "keydown",
          "target": "first",
          "related": "none"
        },
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
        },
        {
          "event": "keyup",
          "target": "second",
          "related": "none"
        }
      ],
      [
        {
          "event": "keydown",
          "target": "second",
          "related": "none"
        },
        {
          "event": "blur",
          "target": "second",
          "related": "third"
        },
        {
          "event": "focusout",
          "target": "second",
          "related": "third"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "second"
        },
        {
          "event": "focusin",
          "target": "third",
          "related": "second"
        },
        {
          "event": "active-element",
          "target": "third",
          "related": "second"
        },
        {
          "event": "keyup",
          "target": "third",
          "related": "none"
        }
      ],
      [
        {
          "event": "keydown",
          "target": "third",
          "related": "none"
        },
        {
          "event": "blur",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "focusout",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "focus",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "focusin",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "active-element",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "keyup",
          "target": "fifth",
          "related": "none"
        }
      ],
      [
        {
          "event": "keydown",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "blur",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "active-element",
          "target": "BODY",
          "related": "fifth"
        }
      ],
      [
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
          "event": "active-element",
          "target": "first",
          "related": "BODY"
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
        }
      ],
      [
        {
          "event": "mousedown",
          "target": "second",
          "related": "none"
        },
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
        },
        {
          "event": "mouseup",
          "target": "second",
          "related": "none"
        },
        {
          "event": "click",
          "target": "second",
          "related": "none"
        }
      ],
      [
        {
          "event": "mousedown",
          "target": "third",
          "related": "none"
        },
        {
          "event": "blur",
          "target": "second",
          "related": "third"
        },
        {
          "event": "focusout",
          "target": "second",
          "related": "third"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "second"
        },
        {
          "event": "focusin",
          "target": "third",
          "related": "second"
        },
        {
          "event": "active-element",
          "target": "third",
          "related": "second"
        },
        {
          "event": "mouseup",
          "target": "third",
          "related": "none"
        },
        {
          "event": "click",
          "target": "third",
          "related": "none"
        }
      ],
      [
        {
          "event": "mousedown",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "blur",
          "target": "third",
          "related": "fourth"
        },
        {
          "event": "focusout",
          "target": "third",
          "related": "fourth"
        },
        {
          "event": "focus",
          "target": "fourth",
          "related": "third"
        },
        {
          "event": "focusin",
          "target": "fourth",
          "related": "third"
        },
        {
          "event": "active-element",
          "target": "fourth",
          "related": "third"
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
        }
      ],
      [
        {
          "event": "mousedown",
          "target": "PRE",
          "related": "none"
        },
        {
          "event": "blur",
          "target": "fourth",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "fourth",
          "related": "none"
        },
        {
          "event": "active-element",
          "target": "BODY",
          "related": "fourth"
        },
        {
          "event": "mouseup",
          "target": "PRE",
          "related": "none"
        },
        {
          "event": "click",
          "target": "PRE",
          "related": "none"
        }
      ]
    ]
  };
});