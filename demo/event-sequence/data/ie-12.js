define(function defineDemoEventSequenceFirefox(require) {
  'use strict';

  // The contents of this file have been collected by running event-sequence/test.html

  return {
    "platform": {
      "description": "IE 12.0 32-bit (platform preview) on Windows 10 64-bit",
      "layout": "Trident",
      "manufacturer": null,
      "name": "IE",
      "prerelease": null,
      "product": null,
      "ua": "Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36 Edge/12.0",
      "version": "12.0",
      "os": {
        "architecture": 64,
        "family": "Windows",
        "version": "10"
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
          "event": "blur",
          "target": "BODY",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "BODY",
          "related": "none"
        },
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
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "first",
          "related": "second"
        },
        {
          "event": "focus",
          "target": "second",
          "related": "none"
        },
        {
          "event": "focusin",
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
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "second",
          "related": "third"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "none"
        },
        {
          "event": "focusin",
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
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "focus",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "focusin",
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
          "event": "blur",
          "target": "BODY",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "BODY",
          "related": "none"
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
          "event": "blur",
          "target": "first",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "first",
          "related": "second"
        },
        {
          "event": "focus",
          "target": "second",
          "related": "none"
        },
        {
          "event": "focusin",
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
          "event": "blur",
          "target": "second",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "second",
          "related": "third"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "none"
        },
        {
          "event": "focusin",
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
          "event": "blur",
          "target": "third",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "third",
          "related": "fifth"
        },
        {
          "event": "focus",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "focusin",
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