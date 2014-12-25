var assert = require('assert');
var assertEquals = assert.equal;
var assertThrows = assert['throws'];

require('../css.escape.js');

assertEquals(CSS.escape.length, 1);

var checkError = function(error) {
	return error.name == 'InvalidCharacterError';
};

assertThrows(function() { CSS.escape('\0'); }, checkError);
assertThrows(function() { CSS.escape('a\0'); }, checkError);
assertThrows(function() { CSS.escape('\0b'); }, checkError);
assertThrows(function() { CSS.escape('a\0b'); }, checkError);

assertEquals(CSS.escape(), 'undefined');
assertEquals(CSS.escape(true), 'true');
assertEquals(CSS.escape(false), 'false');
assertEquals(CSS.escape(null), 'null');
assertEquals(CSS.escape(''), '');

assertEquals(CSS.escape('\x01\x02\x1E\x1F'), '\\1 \\2 \\1e \\1f ');

assertEquals(CSS.escape('0a'), '\\30 a');
assertEquals(CSS.escape('1a'), '\\31 a');
assertEquals(CSS.escape('2a'), '\\32 a');
assertEquals(CSS.escape('3a'), '\\33 a');
assertEquals(CSS.escape('4a'), '\\34 a');
assertEquals(CSS.escape('5a'), '\\35 a');
assertEquals(CSS.escape('6a'), '\\36 a');
assertEquals(CSS.escape('7a'), '\\37 a');
assertEquals(CSS.escape('8a'), '\\38 a');
assertEquals(CSS.escape('9a'), '\\39 a');

assertEquals(CSS.escape('a0b'), 'a0b');
assertEquals(CSS.escape('a1b'), 'a1b');
assertEquals(CSS.escape('a2b'), 'a2b');
assertEquals(CSS.escape('a3b'), 'a3b');
assertEquals(CSS.escape('a4b'), 'a4b');
assertEquals(CSS.escape('a5b'), 'a5b');
assertEquals(CSS.escape('a6b'), 'a6b');
assertEquals(CSS.escape('a7b'), 'a7b');
assertEquals(CSS.escape('a8b'), 'a8b');
assertEquals(CSS.escape('a9b'), 'a9b');

assertEquals(CSS.escape('-0a'), '-\\30 a');
assertEquals(CSS.escape('-1a'), '-\\31 a');
assertEquals(CSS.escape('-2a'), '-\\32 a');
assertEquals(CSS.escape('-3a'), '-\\33 a');
assertEquals(CSS.escape('-4a'), '-\\34 a');
assertEquals(CSS.escape('-5a'), '-\\35 a');
assertEquals(CSS.escape('-6a'), '-\\36 a');
assertEquals(CSS.escape('-7a'), '-\\37 a');
assertEquals(CSS.escape('-8a'), '-\\38 a');
assertEquals(CSS.escape('-9a'), '-\\39 a');

assertEquals(CSS.escape('--a'), '--a');

assertEquals(CSS.escape('\x80\x2D\x5F\xA9'), '\x80\x2D\x5F\xA9');
assertEquals(CSS.escape('\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F'), '\\7f \x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F');
assertEquals(CSS.escape('\xA0\xA1\xA2'), '\xA0\xA1\xA2');
assertEquals(CSS.escape('a0123456789b'), 'a0123456789b');
assertEquals(CSS.escape('abcdefghijklmnopqrstuvwxyz'), 'abcdefghijklmnopqrstuvwxyz');
assertEquals(CSS.escape('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

assertEquals(CSS.escape('\x20\x21\x78\x79'), '\\ \\!xy');

// astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
assertEquals(CSS.escape('\uD834\uDF06'), '\uD834\uDF06');
// lone surrogates
assertEquals(CSS.escape('\uDF06'), '\uDF06');
assertEquals(CSS.escape('\uD834'), '\uD834');
