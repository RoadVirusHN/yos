// export function animation<T extends Lookup<any>> (
//   _target: AnimStates<T>,
//   key: string,
//   desc: PropertyDescriptor
// ) {
//   const method = desc.value;
//   desc.value = function (this: AnimStates<T>, ...args: any[]) {
//     // method = method.bind(this); // this produces singleton controller.

import { AnimStates } from "@data/CardData";
import { Lookup } from "react-spring";
import AnimController from "./AnimController";

//     // if (this.StyleValues.onAnim.get() === undefined) {
//     //   throw Error("All Animations should have onAnim property.");
//     // }

//     // const formerAnim = this.StyleValues.onAnim.get();
//     // if (formerAnim === "queueable") {
//     //   // setCardAnim.start({
//     //   //   onResolve: () => {
//     //   //     method.call(this, ...args);
//     //   //   },
//     //   // });
//     // } else if (formerAnim !== "") {
//     //   console.log(`${key} animation prevented by ${formerAnim}`);
//     //   return;
//     // }
//     return method.call(this, ...args);
//   };
//   return desc;
// }
export const animation =
  () => function <
    T extends AnimStates<Styles>,
    Styles extends Lookup<any>>(
      _target: AnimStates<Styles>, // decorator function object
      key: string, // decorator function name
      desc: PropertyDescriptor // additional infos
    ) {
    let method = desc.value;
    desc.value = function (this: AnimController<T, Styles>, ...args: any[]) {
      method = method.bind(this.AnimStates);
      return { ...method.call(this, ...args), AnimConfig: { unstoppable: false, queueable: false } }
    };
    return desc;
  };

export const unstoppable =
  ({ queueable = false } = {}) => function <
    T extends AnimStates<Styles>,
    Styles extends Lookup<any>>(
      _target: AnimStates<Styles>, // decorator function object
      key: string, // decorator function name
      desc: PropertyDescriptor // additional infos
    ) {
    let method = desc.value;
    desc.value = function (this: AnimController<T, Styles>, ...args: any[]) {
      method = method.bind(this.AnimStates);
      return { ...method(...args), AnimConfig: { unstoppable: true, queueable } }
    };
    return desc;
  };
