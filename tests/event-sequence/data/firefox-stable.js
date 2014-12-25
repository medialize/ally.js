define(function defineDemoEventSequenceFirefox(require) {
  'use strict';

  // The contents of this file have been collected by running event-sequence/test.html

  return {
    "platform": {
      "description": "Firefox 33.0 on OS X 10.8",
      "layout": "Gecko",
      "manufacturer": null,
      "name": "Firefox",
      "prerelease": null,
      "product": null,
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:33.0) Gecko/20100101 Firefox/33.0",
      "version": "33.0",
      "os": {
        "architecture": 32,
        "family": "OS X",
        "version": "10.8"
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
          "event": "keypress",
          "target": "BODY",
          "related": "none"
        },
        {
          "event": "focus",
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
          "event": "keypress",
          "target": "first",
          "related": "none"
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
          "event": "keypress",
          "target": "second",
          "related": "none"
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
          "event": "keypress",
          "target": "third",
          "related": "none"
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
          "event": "keypress",
          "target": "fifth",
          "related": "none"
        },
        {
          "event": "blur",
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
          "event": "active-element",
          "target": "first",
          "related": "fifth"
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
          "related": "none"
        },
        {
          "event": "focus",
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
        },
        {
          "event": "active-element",
          "target": "second",
          "related": "first"
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
          "related": "none"
        },
        {
          "event": "focus",
          "target": "third",
          "related": "none"
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
          "related": "none"
        },
        {
          "event": "focus",
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
        },
        {
          "event": "active-element",
          "target": "fifth",
          "related": "third"
        }
      ]
    ]
  };
});