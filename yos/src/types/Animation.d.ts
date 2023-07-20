import { Lookup } from "react-spring";

export interface componentProps {
  [component: string]: Lookup;
}

export interface AnimData<AnimProps> {
  states: {
    [state: string]: (...args: any[]) => AnimProps;
  };
}
