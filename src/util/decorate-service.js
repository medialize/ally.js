
/*
  The Singleton Decorator is intended to allow modules to initialize a ("singleton") component as if
  it was the only one using it. Every module gets to initialize and destruct the component by itself.
  Via simple reference counting the component keeps track of how many modules have initialized it,
  so it destructs only when the last module is gone. This decorator hides the component's singleton
  nature from the application in order to offer a homogenous API.

  engage() can return an object (result) with methods to expose to the consumer,
  upon initialization result.disengage is added and returned to the consumer.
*/

function destruct({force} = {}) {
  if (force) {
    this.instances = 0;
  } else {
    this.instances--;
  }

  if (!this.instances) {
    this.disengage();
    this._result = null;
  }
}

function initialize() {
  if (this.instances) {
    this.instances++;
    return this._result;
  }

  this.instances++;
  this._result = this.engage() || {};
  this._result.disengage = destruct.bind(this);

  return this._result;
}

function noop() {}

export default function({engage, disengage} = {}) {
  const data = {
    engage: engage || noop,
    disengage: disengage || noop,
    instances: 0,
    _result: null,
  };

  return initialize.bind(data);
}
