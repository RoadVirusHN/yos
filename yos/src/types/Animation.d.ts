import { Lookup } from "react-spring";

export interface componentProps {
  [component: string]: Lookup;
}

export interface AnimData<T> {
  initialProps: (...args: any[]) => T;
  states: {
    [state: string]: (...args: any[]) => T;
  };
}
