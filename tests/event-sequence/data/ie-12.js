define(function defineDemoEventSequenceFirefox(require) {
  'use strict';

  // The contents of this file have been collected by running event-sequence/test.html

  return {
    "platform": {
      "description": "IE 12.10162 (platform preview) on Windows NT 10.0 64-bit",
      "layout": "Trident",
      "manufacturer": null,
      "name": "IE",
      "prerelease": null,
      "product": null,
      "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10162",
      "version": "12.10162",
      "os": {
        "architecture": 64,
        "family": "Windows NT",
        "version": "10.0"
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
          "event": "DOMFocusIn",
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
          "event": "focusout",
          "target": "first",
          "related": "second"
        },
        {
          "event": "DOMFocusOut",
          "target": "first",
          "related": "second"
        },
        {
          "event": "blur",
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
          "event": "DOMFocusIn",
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
          "event": "focusout",
          "target": "second",
          "related": "third"
        },
        {
          "event": "DOMFocusOut",
          "target": "second",
          "related": "third"
        },
        {
          "event": "blur",
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
          "event": "DOMFocusIn",
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
          "event": "focusout",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "DOMFocusOut",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "blur",
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
          "event": "DOMFocusIn",
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
          "event": "focusout",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "DOMFocusOut",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "blur",
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
          "event": "pointerdown",
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
          "event": "DOMFocusIn",
          "target": "first",
          "related": "none"
        },
        {
          "event": "active-element",
          "target": "first",
          "related": "BODY"
        },
        {
          "event": "pointerup",
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
        }
      ],
      [
        {
          "event": "pointerdown",
          "target": "second",
          "related": "none"
        },
        {
          "event": "mousedown",
          "target": "second",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "first",
          "related": "second"
        },
        {
          "event": "DOMFocusOut",
          "target": "first",
          "related": "second"
        },
        {
          "event": "blur",
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
          "event": "DOMFocusIn",
          "target": "second",
          "related": "first"
        },
        {
          "event": "active-element",
          "target": "second",
          "related": "first"
        },
        {
          "event": "pointerup",
          "target": "second",
          "related": "none"
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
          "event": "pointerdown",
          "target": "third",
          "related": "none"
        },
        {
          "event": "mousedown",
          "target": "third",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "second",
          "related": "third"
        },
        {
          "event": "DOMFocusOut",
          "target": "second",
          "related": "third"
        },
        {
          "event": "blur",
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
          "event": "DOMFocusIn",
          "target": "third",
          "related": "second"
        },
        {
          "event": "active-element",
          "target": "third",
          "related": "second"
        },
        {
          "event": "pointerup",
          "target": "third",
          "related": "none"
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
          "event": "pointerdown",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "mousedown",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "DOMFocusOut",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "blur",
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
          "event": "DOMFocusIn",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "active-element",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "pointerup",
          "target": "fifth",
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
        }
      ]
    ]
  };
});