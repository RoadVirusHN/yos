import { AnimData } from "../../../../../types/Animation";

export interface LogoStyle {
  logo?: {
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scale?: number;
    x?: number;
    y?: number;
    boxShadow?: string;
    config?: { mass?: number; tension?: number; friction?: number };
  };
  reflection?: {
    background?: string;
  };
  text?: { x?: number; y?: number; scale?: number };
  immediate?: boolean;
  config?: { friction?: number; mass?: number; tension?: number };
}
export type LogoAnimInputs = LogoStyle;
// Data about components, Animation State, Hard coded datas, Constants etc...
export const animationData: AnimData<LogoAnimInputs> = {
  initialProps: (): LogoAnimInputs => ({
    logo: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      x: 0,
      y: 0,
      boxShadow: "10px 10px 30px 15px rgba(0, 0, 0, 0.3)",
      config: { mass: 5, tension: 350, friction: 40 },
    },
    reflection: {
      background:
        "linear-gradient(0deg,rgba(255,255,255,0.25) 0%,rgba(255, 255, 255, 0) 60%)",
    },
    text: { x: 0, y: 0, scale: 1 },
  }),
  states: {
    stateIdle: (getReflectionDefault: () => string) => ({
      logo: {
        scale: 1,
        boxShadow: "10px 10px 30px 15px rgba(0, 0, 0, 0.3)",
        // it seems react-spring doesn't support multiple box-shadows check Logo.module.scss
      },
      reflection: { background: getReflectionDefault() },
      text: { scale: 1 },
    }),

    stateEmphasize: () => ({
      logo: {
        scale: 1.3,
      },
      text: {
        scale: 1.6,
        // spring-react doesn't support pseudo element. check scss file to view emphasizing codes.
      },
    }),
  },
};
