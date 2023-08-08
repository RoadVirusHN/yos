import { type AsyncResult, type Controller, type Lookup } from 'react-spring';
import { type AnimStates } from 'src/data/CardData';
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
  T extends AnimStates<Styles>,
  Styles extends Lookup<any>
> {
  public AnimStates: T;
  public TransitionTo: StateTransitions<T, Styles>;

  constructor(AnimStates: T) {
    this.AnimStates = AnimStates;
    this.TransitionTo = this.setTransitionTo(this.AnimStates);
  }

  private setTransitionTo(States: T) {
    const proto = Object.getPrototypeOf(States) as { [key in keyof T]: T[key] };
    const keys = Object.getOwnPropertyNames(proto) as Array<keyof T>;
    return keys.reduce<StateTransitions<T, Styles>>(
      (transitionObj, k) => {
        if ((k as string).startsWith('State') && typeof proto[k] === 'function') {
          let stateFunc = proto[k] as (...args: any) => any;
          stateFunc = stateFunc.bind(this.AnimStates)
          return {
            ...transitionObj,
            [k]: this.setTransitionToState(stateFunc)
          };
        }
        return transitionObj;
      },
      this.TransitionTo
    )
  }

  private setTransitionToState(stateFunc: (...args: any) => any) {
    return async (...args: Parameters<typeof stateFunc>) => {
      const state = stateFunc(...args);
      return await this.AnimStates.AnimAPI.AnimRef.start(state)[0];
      // const formerAnim = this.AnimAPI.anim.onAnim?.get();
      // this.AnimAPI.anim.onAnim?.isAnimating;
      // switch (formerAnim) {
      //   case undefined:
      //     throw Error("All Animations should have onAnim property.");
      //   case "":
      //     return this.AnimAPI.setAnim.start(state)[0];
      //   case "queue":
      //     this.AnimAPI.setAnim.update(state);
      //     return this.AnimAPI.setAnim.start()[0];
      //   default:
      //     console.log(`Animation prevented by ${formerAnim}`);
      //     return { fail: true } as AsyncResult<Controller<Styles>>;
      // }
    };
  }
}
