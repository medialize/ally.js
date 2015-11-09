// from https://gist.github.com/lambtron/c8945d3abd11c783eb67
// via https://segment.com/blog/building-technical-documentation-with-metalsmith/

/**
 * Generate a custom sort method for given starting `order`. After the given
 * order, it will ignore casing and put periods last. So for example a call of:
 *
 *   sorter('Overview');
 *
 * That is passed:
 *
 *   - Analytics.js
 *   - iOS
 *   - Overview
 *   - Ruby
 *   - .NET
 *
 * Would guarantee that 'Overview' ends up first, with the casing in 'iOS'
 * ignored so that it falls in the normal alphabetical order, and puts '.NET'
 * last since it starts with a period.
 *
 * @param {Array} order
 * @return {Function}
 */

function sorter(order) {
  order = order || [];

  return function(one, two) {
    var a = one.sidebar || one.title;
    var b = two.sidebar || two.title;

    if (!a && !b) {
      return 0;
    }
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }

    var i = order.indexOf(a);
    var j = order.indexOf(b);

    if (~i && ~j) {
      if (i < j) {
        return -1;
      }
      if (j < i) {
        return 1;
      }

      return 0;
    }

    if (~i) {
      return -1;
    }
    if (~j) {
      return 1;
    }

    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a[0] === '.') {
      return 1;
    }
    if (b[0] === '.') {
      return -1;
    }
    if (a < b) {
      return -1;
    }
    if (b < a) {
      return 1;
    }

    return 0;
  };
}

module.exports = sorter;
