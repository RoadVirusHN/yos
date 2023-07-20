import { Lookup, SpringRef, SpringValue } from "react-spring";

export type AnimatedStyles<Styles> = {
  [key in keyof Styles]: SpringValue<Styles[key]>;
};

// export default class AnimController<Styles extends Lookup<any>> {
//   AnimAPI: {
//     setAnim: SpringRef<Styles>;
//     anim: AnimatedStyles<Styles>;
//   };
//   States: {
//     [state: `State${string}`]: (...args: any[]) => CardAnimInputs;
//   };
//   ExternalAnimAPIs: {
//     [key : string] : AnimController<any>;
//   }

//   constructor() {}
// }
