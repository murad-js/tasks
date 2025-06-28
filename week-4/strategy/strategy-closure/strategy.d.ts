export function createStrategy<T, TAction, THandler>(
  strategyName: string,
  actionsArg: TAction,
): {
  getBehaviour: (
    implementationName: T,
    actionName: TAction[number],
  ) => THandler;
  registerBehaviour: (
    implementationName: T,
    behaviour: Record<TAction[number], Handler>,
  ) => void;
};
