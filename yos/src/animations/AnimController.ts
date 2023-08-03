import { AsyncResult, Controller, Lookup } from "react-spring";
import { AnimStates } from "src/data/CardData";
type StateTransitions<
  T extends AnimStates<Styles>,
  Styles extends Lookup<any>
> = {
  [state in keyof OnlyClassMethods<T>]: (
    ...args: Parameters<OnlyClassMethods<T>[state]>
  ) => AsyncResult<Controller<Styles>>;
};
type OnlyClassMethodsBody<T> = {
  [state in keyof T]: T[state] extends (...args: any) => any ? T[state] : never;
}[keyof T];
type OnlyClassMethods<T> = {
  [state in keyof T]: T[state] extends (...args: any) => any ? T[state] : never;
};
type OnlyClassMethodsName<T> = keyof OnlyClassMethods<T>;

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
    let TransitionTo = {} as StateTransitions<T, Styles>;
    const proto = Object.getPrototypeOf(States) as { [key in keyof T]: T[key] };
    const keys = Object.getOwnPropertyNames(proto) as (keyof T)[];
    keys.forEach((k: keyof T, i: number) => {
      if ((k as string).startsWith("State") && typeof proto[k] === "function") {
        let stateFunc = proto[k] as (...args: any) => any;
        TransitionTo[k] = this.setTransitionToState(stateFunc);
      }
    });
    return TransitionTo;
  }

  private setTransitionToState(stateFunc: (...args: any) => any) {
    return (...args: Parameters<typeof stateFunc>) => {
      let state = stateFunc(...args);
      return this.AnimStates.AnimAPI.AnimRef.start(state)[0];
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
