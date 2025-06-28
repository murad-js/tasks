class Strategy {
  strategyName;
  actions = null;
  #registeredImplementations = new Map();

  constructor(strategyName, actions) {
    this.strategyName = strategyName;
    this.actions = [...actions];
  }

  registerBehaviour(implementationName, behaviour) {
    const handlers = this.#buildHandlers(behaviour);
    this.#registeredImplementations.set(implementationName, handlers);
  }

  getBehaviour(implementationName, actionName) {
    if (!this.#registeredImplementations.has(implementationName)) {
      throw new Error(`Strategy "${implementationName}" is not found`);
    }

    const strategy = this.#registeredImplementations.get(implementationName);

    if (!Object.hasOwn(strategy, actionName)) {
      throw new Error(
        `Action "${actionName}" for strategy "${implementationName}" is not found`,
      );
    }

    return strategy[actionName];
  }

  #buildHandlers(behaviour) {
    const handlers = this.actions.map((action) => {
      if (!Object.hasOwn(behaviour, action)) {
        throw new Error(`Action ${action} not implemented`);
      }

      if (typeof behaviour[action] !== 'function') {
        throw new Error(`Key ${action} expected to be function`);
      }

      return [action, behaviour[action]];
    });

    return Object.fromEntries(handlers);
  }
}

module.exports = { Strategy };
