import { Lookup } from "react-spring";

export interface MyHook {
  Refs: {
    [component: string]: React.RefObject<any>;
  };
  Handlers: {
    [component: string]: {
      [onEvent: string]: React.EventHandler;
    };
  };
  Styles: {
    [component: string]: Lookup
  };
}
