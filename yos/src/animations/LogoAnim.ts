import { Lookup, SpringRef } from "react-spring";
import { LogoAnimInputs } from "src/data/LogoData";

/**
 * there are three States in Logo.
 * - Emphasize
 * - Idle
 * - Rotate
 */

export const toEmphasizeAnim = (
  states: LogoAnimInputs,
  apis: { apiLogo: SpringRef<Lookup<any>>; apiText: SpringRef<Lookup<any>> }
) => {
  const { logo, text } = states;
  const { apiLogo, apiText } = apis;
  apiLogo.start(logo);
  apiText.start(text);
  // spring-react doesn't support pseudo element. check scss to emphasizing code.
};

export const toIdleAnim = (
  states: LogoAnimInputs,
  apis: {
    apiLogo: SpringRef<Lookup<any>>;
    apiText: SpringRef<Lookup<any>>;
    apiReflection: SpringRef<Lookup<any>>;
  }
) => {
  const { logo, reflection, text } = states;
  const { apiLogo, apiText, apiReflection } = apis;
  apiLogo.start(logo);
  apiReflection.start(reflection);
  apiText.start(text);
};

export interface toRotateAnim {
  (e: MouseEvent): void;
} // implemented in LogoHook.ts
