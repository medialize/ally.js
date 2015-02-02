define(function defineDomVisibleQuotient(require) {
  'use strict';

  var path = require('./path');

  function getIntersectingRect(one, two) {
    // identify the rectangle that _element and _container overlap in
    var top = Math.max(one.top, two.top);
    var left = Math.max(one.left, two.left);
    // make sure bottom can't be above top, right can't be before left
    var right = Math.max(Math.min(one.right, two.right), left);
    var bottom = Math.max(Math.min(one.bottom, two.bottom), top);
    // return something resembling ClientRect
    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      width: right - left,
      height: bottom - top,
    };
  }

  function getViewportRect() {
    var width = window.innerWidth || document.documentElement.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight;
    // return something resembling ClientRect
    return {
      top: 0,
      right: width,
      bottom: height,
      left: 0,
      width: width,
      height: height,
    };
  }

  function getBoundingClientRectWithArea(element) {
    // convenience for the .reduce() in getScrollableParentRect()
    var rect = element.getBoundingClientRect();
    rect.area = rect.width * rect.height;
    return rect;
  }

  function isOverflowingElement(element) {
    var style = window.getComputedStyle(element, null);
    var value = 'visible';
    /*jshint laxbreak: true */
    return style.getPropertyValue('overflow-x') !== value
      && style.getPropertyValue('overflow-y') !== value;
    /*jshint laxbreak: false */
  }

  function isScrollableElement(element) {
    // an element not scrollable if it doesn't crop its content
    if (!isOverflowingElement(element)) {
      return false;
    }

    // an element is scrollable when it is smaller than its content
    /*jshint laxbreak: true */
    return element.offsetHeight < element.scrollHeight
      || element.offsetWidth < element.scrollWidth;
    /*jshint laxbreak: false */
  }

  function getScrollableParentRect(element) {
    // get largest possible space constrained by scrolling containers

    // find scrollable parents
    var scrollingContainers = path(element).slice(1).filter(isScrollableElement);

    if (!scrollingContainers.length) {
      // no containers, no joy
      return null;
    }

    // identify the currently visible intersection of all scrolling container parents
    return scrollingContainers.reduce(function(previous, current) {
      var rect = getBoundingClientRectWithArea(current);
      var intersection = getIntersectingRect(rect, previous);
      // identify the smallest scrolling container so we know how much space
      // our element can fill at the most - note that this is NOT the area
      // of the intersection, intersection is just abused as a vehicle
      intersection.area = Math.min(rect.area, previous.area);
      return intersection;
    }, getBoundingClientRectWithArea(scrollingContainers[0]));
  }

  function visibleQuotient(element) {
    // dimensions of the element itself
    var _element = element.getBoundingClientRect();
    // dimensions of the viewport
    var _viewport = getViewportRect();
    // we need the area to know how much of the element can be displayed at the most
    _viewport.area = _viewport.width * _viewport.height;

    var _area = _viewport;
    // dimensions of the intersection of all scrollable parents
    var _container = getScrollableParentRect(element);
    if (_container) {
      if (!_container.width || !_container.height) {
        // scrollable containers without dimensions are invisible,
        // meaning that the element is not visible at all
        return 0;
      }

      // dimension the element can currently be rendered in
      _area = getIntersectingRect(_container, _viewport);
      _area.area = _container.area;
    }

    // dimension of the element currently rendered in identified space
    var _visible = getIntersectingRect(_element, _area);
    if (!_visible.width || !_visible.height) {
      // element is not shown within the identified area
      return 0;
    }

    // compare the element's currently visible size to the size it
    // could take up at the most, being either the element's actual
    // size, or the space theroetically made available if all
    // scrollable parents are aligned properly
    var area = _element.width * _element.height;
    var maxArea = Math.min(area, _area.area);
    return _visible.width * _visible.height / maxArea;
  }

  return visibleQuotient;
});