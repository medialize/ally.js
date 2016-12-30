
import nodeArray from '../util/node-array';
import queryShadowHosts from '../query/shadow-hosts';
import contextToElement from '../util/context-to-element';

const shadowObserverConfig = {
  childList: true,
  subtree: true,
};

class ShadowMutationObserver {
  constructor({context, callback, config} = {}) {
    this.config = config;

    this.disengage = this.disengage.bind(this);

    this.clientObserver = new MutationObserver(callback);
    this.hostObserver = new MutationObserver(mutations => mutations.forEach(this.handleHostMutation, this));

    this.observeContext(context);
    this.observeShadowHosts(context);
  }

  disengage() {
    this.clientObserver && this.clientObserver.disconnect();
    this.clientObserver = null;
    this.hostObserver && this.hostObserver.disconnect();
    this.hostObserver = null;
  }

  observeShadowHosts(context) {
    const hosts = queryShadowHosts({
      context,
    });

    hosts.forEach(element => this.observeContext(element.shadowRoot));
  }

  observeContext(context) {
    this.clientObserver.observe(context, this.config);
    this.hostObserver.observe(context, shadowObserverConfig);
  }

  handleHostMutation(mutation) {
    if (mutation.type !== 'childList') {
      return;
    }

    const addedElements = nodeArray(mutation.addedNodes).filter(element => element.nodeType === Node.ELEMENT_NODE);
    addedElements.forEach(this.observeShadowHosts, this);
  }
}

export default function({
  context,
  callback,
  config,
} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('observe/shadow-mutations requires options.callback to be a function');
  }

  if (typeof config !== 'object') {
    throw new TypeError('observe/shadow-mutations requires options.config to be an object');
  }

  if (!window.MutationObserver) {
    // not supporting IE10 via Mutation Events, because they're too expensive
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
    return {
      disengage: function() {},
    };
  }

  const element = contextToElement({
    label: 'observe/shadow-mutations',
    resolveDocument: true,
    defaultToDocument: true,
    context,
  });

  const service = new ShadowMutationObserver({
    context: element,
    callback,
    config,
  });

  return {
    disengage: service.disengage,
  };
}
