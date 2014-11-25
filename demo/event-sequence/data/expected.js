define(function defineDemoEventSequenceExpected(require) {
  'use strict';

  // This file contains all the event sequences we expect

  return {
    name: 'expected',
    userAgent: 'Rodney\'s brain',
    "events": [
      [],
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
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]
  };
});