import { Lookup } from "react-spring";

interface componentProps {
  [component: string]: Lookup;
}

export interface AnimData {
  initialProps: componentProps;
  states: {
    [state: string]: (...args: any[]) => componentProps;
  };
}
