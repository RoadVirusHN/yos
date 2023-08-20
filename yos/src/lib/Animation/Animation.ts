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
    Styles extends Lookup<any>>(
      _target: AnimStates<Styles>, // decorator function object
      _key: string, // decorator function name
      desc: PropertyDescriptor // additional infos
    ) {
    let method = desc.value;
    desc.value = function (this: AnimStates<Styles>, ...args: any[]) {
      return { ...method.call(this, ...args), AnimConfig: { unstoppable: { config: false, except: [] }, queueable: [] } }
    };
    return desc;
  };

export const unstoppable =
  ({ queueable = [] as string[], except = [] as string[] } = {}) => function <
    Styles extends Lookup<any>>(
      _target: AnimStates<Styles>, // decorator function object
      _key: string, // decorator function name
      desc: PropertyDescriptor // additional infos
    ) {
    let method = desc.value;
    // method = method.bind(target);
    desc.value = function (this: AnimStates<Styles>, ...args: any[]) {
      return { ...method.call(this, ...args), AnimConfig: { unstoppable: { config: true, except }, queueable } }
    };
    return desc;
  };
