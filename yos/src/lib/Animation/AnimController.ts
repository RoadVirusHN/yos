import { AnimationResult, SpringValue, type AsyncResult, type Controller, type Lookup } from 'react-spring';
import { AnimAPIInput, type AnimStates } from 'src/data/CardData';
type StateTransitions<
  T extends AnimStates<Styles>,
  Styles extends Lookup<any>
> =
  {
    [state in keyof OnlyClassMethods<T>]: (
      ...args: Parameters<OnlyClassMethods<T>[state]>
    ) => AsyncResult<Controller<Styles>>;
  };
type _OnlyClassMethodsBody<T> = {
  [state in keyof T]: T[state] extends (...args: any) => any ? T[state] : never;
}[keyof T];
type OnlyClassMethods<T> = {
  [state in keyof T]: T[state] extends (...args: any) => any ? T[state] : never;
};

export default class AnimController<
  States extends AnimStates<Styles>,
  Styles extends Lookup<any>
> {
  public uniqueId: string;
  public AnimStates: States;
  public TransitionTo: StateTransitions<States, Styles>;
  public AnimationQueue: AnimAPIInput<Styles>[] //idx 0 = currently played animation.

  constructor(AnimStates: States, uniqueId: string) {
    this.uniqueId = uniqueId;
    this.AnimStates = AnimStates;
    this.TransitionTo = this.setTransitionTo(this.AnimStates);
    this.AnimationQueue = [];
  }

  private setTransitionTo(States: States) {
    const proto = Object.getPrototypeOf(States) as { [key in keyof States]: States[key] };
    const keys = Object.getOwnPropertyNames(proto) as Array<keyof States>;
    return keys.reduce<StateTransitions<States, Styles>>(
      (transitionObj, methodName) => {
        if ((methodName as string).startsWith('State') && typeof proto[methodName] === 'function') {
          let stateFunc = proto[methodName] as (...args: any) => AnimAPIInput<Styles>;
          stateFunc = stateFunc.bind(this.AnimStates)
          return {
            ...transitionObj,
            [methodName]: this.setTransitionToState(stateFunc, methodName as string)
          };
        }
        return transitionObj;
      },
      this.TransitionTo
    )
  }

  private setTransitionToState(stateFunc: (...args: any) => AnimAPIInput<Styles>, methodName: string) {
    //!!! refactoring later!
    return async (...args: Parameters<typeof stateFunc>) => {
      const animQData = stateFunc(...args);

      if (this.AnimationQueue.length > 0) {
        const animConfig = this.AnimationQueue[0].AnimConfig;
        if (animConfig.unstoppable.config && !animConfig.unstoppable.except.includes(methodName)) {
          if (animConfig.queueable.length > 0 && (animConfig.queueable.includes(methodName) || animConfig.queueable.includes("*"))) {
            this.AnimationQueue.push(animQData);
          } else {
            console.log("animationPrevented");
          }
          return new Promise(resolve => {
            resolve({
              value: { queued: animConfig.queueable } as never,
              /** When true, no animation ever started. */
              noop: false,
              /** When true, the animation was neither cancelled nor stopped prematurely. */
              finished: false,
              /** When true, the animation was cancelled before it could finish. */
              cancelled: true,
            })
          }) as Promise<AnimationResult<Controller<Styles>>>
        } else {
          this.AnimationQueue = []
        }
      }
      this.AnimationQueue.push(animQData);

      return await this.AnimStates.AnimRef.start({
        ...animQData, onResolve: this.onResolve(animQData)
      })[0];
    };
  }

  private onResolve(animQData: AnimAPIInput<Styles>): (result: AnimationResult<SpringValue<Styles>>, ctrl: Controller<Styles>, item?: undefined) => void {
    return (result: AnimationResult<SpringValue<Styles>>, ctrl: Controller<Styles>, item?: undefined) => {
      if (animQData.onResolve !== undefined) animQData.onResolve(result, ctrl, item)
      this.AnimationQueue = this.AnimationQueue.slice(1)
      if (this.AnimationQueue.length > 0) {
        this.AnimStates.AnimRef.start({
          ...this.AnimationQueue[0], onResolve: this.onResolve(this.AnimationQueue[0])
        })
      }
    }
  }

}
