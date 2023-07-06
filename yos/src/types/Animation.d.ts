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
declare module "*.webm" {
  const value: string;
  export default value;
}

declare module "*.mp4" {
  const value: string;
  export default value;
}
