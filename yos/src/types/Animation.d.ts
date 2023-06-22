import { Lookup } from "react-spring";

interface componentProps {
  [component: string]: Lookup;
}

export interface AnimData<T> {
  initialProps: (...args: any[]) => T;
  states: {
    [state: string]: (...args: any[]) => T;
  };
}