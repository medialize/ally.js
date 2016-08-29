
import getParents from '../get/parents';

function getIntersectingRect(one, two) {
  // identify the rectangle that _element and _container overlap in
  const top = Math.max(one.top, two.top);
  const left = Math.max(one.left, two.left);
  // make sure bottom can't be above top, right can't be before left
  const right = Math.max(Math.min(one.right, two.right), left);
  const bottom = Math.max(Math.min(one.bottom, two.bottom), top);
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
  const width = window.innerWidth || document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
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

function getInnerBoundingClientRect(element) {
  // convenience for the .reduce() in getScrollableParentRect()
  const rect = element.getBoundingClientRect();

  // remove the width of the scrollbar because that
  // area is not really considered visible
  // NOTE: assuming scrollbar is always to the right and bottom
  const scrollbarWidth = element.offsetWidth - element.clientWidth;
  const scrollbarHeight = element.offsetHeight - element.clientHeight;
  // cannot mutate rect because it has readonly properties
  const _rect = {
    top: rect.top,
    left: rect.left,
    right: rect.right - scrollbarWidth,
    bottom: rect.bottom - scrollbarHeight,
    width: rect.width - scrollbarWidth,
    height: rect.height - scrollbarHeight,
    area: 0,
  };

  _rect.area = _rect.width * _rect.height;
  return _rect;
}

function isOverflowingElement(element) {
  const style = window.getComputedStyle(element, null);
  const value = 'visible';
  return style.getPropertyValue('overflow-x') !== value
    && style.getPropertyValue('overflow-y') !== value;
}

function isScrollableElement(element) {
  // an element not scrollable if it doesn't crop its content
  if (!isOverflowingElement(element)) {
    return false;
  }

  // an element is scrollable when it is smaller than its content
  return element.offsetHeight < element.scrollHeight
    || element.offsetWidth < element.scrollWidth;
}

function getScrollableParentRect(element) {
  // get largest possible space constrained by scrolling containers

  // find scrollable parents
  const scrollingContainers = getParents({context: element}).slice(1).filter(isScrollableElement);

  if (!scrollingContainers.length) {
    // no containers, no joy
    return null;
  }

  // identify the currently visible intersection of all scrolling container parents
  return scrollingContainers.reduce(function(previous, current) {
    const rect = getInnerBoundingClientRect(current);
    const intersection = getIntersectingRect(rect, previous);
    // identify the smallest scrolling container so we know how much space
    // our element can fill at the most - note that this is NOT the area
    // of the intersection, intersection is just abused as a vehicle
    intersection.area = Math.min(rect.area, previous.area);
    return intersection;
  }, getInnerBoundingClientRect(scrollingContainers[0]));
}

export default function(element) {
  // dimensions of the element itself
  const _element = element.getBoundingClientRect();
  // dimensions of the viewport
  const _viewport = getViewportRect();
  // we need the area to know how much of the element can be displayed at the most
  _viewport.area = _viewport.width * _viewport.height;

  let _area = _viewport;
  // dimensions of the intersection of all scrollable parents
  const _container = getScrollableParentRect(element);
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
  const _visible = getIntersectingRect(_element, _area);
  if (!_visible.width || !_visible.height) {
    // element is not shown within the identified area
    return 0;
  }

  // compare the element's currently visible size to the size it
  // could take up at the most, being either the element's actual
  // size, or the space theroetically made available if all
  // scrollable parents are aligned properly
  const area = _element.width * _element.height;
  const maxArea = Math.min(area, _area.area);
  // Firefox may return sub-pixel bounding client rect
  const visibleArea = Math.round(_visible.width) * Math.round(_visible.height) / maxArea;
  // Edge might not reach 0.5 exactly
  const factor = 10000;
  const roundedVisibleArea = Math.round(visibleArea * factor) / factor;
  // clamp the value at 1
  return Math.min(roundedVisibleArea, 1);
}
