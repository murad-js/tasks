const createStrategy = (strategyName, actionsArg) => {
  const actions = [...actionsArg];
  const registeredImplementations = new Map();

  const getBehaviour = (implementationName, actionName) => {
    if (!registeredImplementations.has(implementationName)) {
      throw new Error(`Strategy "${implementationName}" is not found`);
    }

    const strategy = registeredImplementations.get(implementationName);

    if (!Object.hasOwn(strategy, actionName)) {
      throw new Error(
        `Action "${actionName}" for strategy "${implementationName}" is not found`,
      );
    }

    return strategy[actionName];
  };

  const registerBehaviour = (implementationName, behaviour) => {
    const handlers = buildHandlers(actions, behaviour);
    registeredImplementations.set(implementationName, handlers);
  };

  return { getBehaviour, registerBehaviour };
};

module.exports = { createStrategy };

function buildHandlers(actions, behaviour) {
  const handlers = actions.map((action) => {
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
