export class Strategy<T = any, TAction = any, THandler = any> {
  constructor(strategyName: string, actions: TAction);
  strategyName: string;
  actions: TAction;
  registerBehaviour(
    implementationName: T,
    behaviour: Record<TAction[number], THandler>,
  ): void;
  getBehaviour(implementationName: T, actionName: TAction[number]): THandler;
}
