define(function defineDemoFocusableFirefox(require) {
  'use strict';

  // The contents of this file have been collected by running event-sequence/index.html

  return {
    "platform": {
      "description": "IE 11.0 32-bit on Windows 8.1 64-bit",
      "layout": "Trident",
      "manufacturer": null,
      "name": "IE",
      "prerelease": null,
      "product": null,
      "ua": "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; .NET4.0E; .NET4.0C; Tablet PC 2.0; rv:11.0) like Gecko",
      "version": "11.0",
      "os": {
        "architecture": 64,
        "family": "Windows",
        "version": "8.1"
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
          "event": "focusout",
          "target": "BODY",
          "related": "first"
        },
        {
          "event": "focusin",
          "target": "first",
          "related": "BODY"
        },
        {
          "event": "blur",
          "target": "BODY",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "first",
          "related": "none"
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
          "event": "focusin",
          "target": "second",
          "related": "first"
        },
        {
          "event": "blur",
          "target": "first",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "second",
          "related": "none"
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
          "event": "focusin",
          "target": "third",
          "related": "second"
        },
        {
          "event": "blur",
          "target": "second",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "none"
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
          "event": "focusin",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "blur",
          "target": "third",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "fifth",
          "related": "none"
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
          "related": "HTML"
        },
        {
          "event": "blur",
          "target": "fifth",
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
          "event": "focusin",
          "target": "first",
          "related": "HTML"
        },
        {
          "event": "focus",
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
          "event": "focusout",
          "target": "first",
          "related": "second"
        },
        {
          "event": "focusin",
          "target": "second",
          "related": "first"
        },
        {
          "event": "blur",
          "target": "first",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "second",
          "related": "none"
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
          "event": "focusin",
          "target": "third",
          "related": "second"
        },
        {
          "event": "blur",
          "target": "second",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "none"
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
          "event": "focusin",
          "target": "fifth",
          "related": "third"
        },
        {
          "event": "blur",
          "target": "third",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "fifth",
          "related": "none"
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
      ],
      [
        {
          "event": "pointerdown",
          "target": "PRE",
          "related": "none"
        },
        {
          "event": "mousedown",
          "target": "PRE",
          "related": "none"
        },
        {
          "event": "focusout",
          "target": "fifth",
          "related": "BODY"
        },
        {
          "event": "focusin",
          "target": "BODY",
          "related": "fifth"
        },
        {
          "event": "blur",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "focus",
          "target": "BODY",
          "related": "none"
        },
        {
          "event": "pointerup",
          "target": "PRE",
          "related": "none"
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