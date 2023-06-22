// Data about components, Animation State, Hard coded datas, Constants etc...
import { AnimData } from "../../../../../../types/Animation";
import { projects } from "../../utils/CardsData";

export type CardStyle = {
  x?: number;
  y?: number;
  z?: number;
  rot?: number;
  gray?: number;
  blur?: number;
  scale?: number;
  delay?: number;
  side?: boolean;
  immediate?: boolean;
  config?: { friction?: number; mass?: number; tension?: number };
};
export type CardAnimInputs =
  | CardStyle
  | {
      from: CardStyle;
      to: CardStyle | CardStyle[];
    };
export const animationData: AnimData<CardAnimInputs> = {
  initialProps: (i: number) => {
    const radians = (((i * 360) / projects.length + 180) * Math.PI) / 180;
    const x = window.innerWidth * 2 * Math.cos(radians);
    const y = window.innerWidth * 2 * Math.sin(radians);
    return {
      x,
      y,
      z: 1,
      rot: 0,
      gray: 0,
      blur: 0,
      scale: 1.5,
      side: true,
    };
  },
  states: {
    stateStart: (i: number) => ({
      x: 0,
      y: i * -4, // make slightly upward
      z: i,
      scale: 1,
      rot: -8 + Math.random() * 16,
      gray: 0,
      blur: 0,
      side: true,
      delay: i * 200,
    }),
    stateTop: () => ({
      from: {},
      to: [
        {
          z: projects.length,
          scale: 1.1,          
          gray: 0,
          rot: -8 + Math.random() * 16,
          blur: 0,
          config: { tension: 210, friction: 20 }
        },
        {
          x: 0,
          y: projects.length * -4,
          rot: -8 + Math.random() * 16,
          scale: 1,
          config: { tension: 210, friction: 20 }
        },
      ],
    }),

    statePick: (rot: number) => ({
      scale: 1.1,
      rot: Math.max(Math.min(rot, 5), -5) + (Math.random() * 6 - 3),
      delay: undefined,
      config: { friction: 50, tension: 800 },
    }),
    stateFloat: () => ({
      z: projects.length + 1,
      scale: 1.1,
      gray: 0,
      blur: 0,
      config: { tension: 200 },
    }),
    stateFlickable: () => ({
      z: 0.4,
      scale: 1,
      gray: 0.7,
      blur: 2,
    }),
    stateMove: (mouseDelta: { dX: number; dY: number }) => ({
      x: mouseDelta.dX,
      y: mouseDelta.dY,
      immediate: true,
    }),
    stateDeck: (order: number) => ({
      x: 0,
      y: order * -4,
      z: order,
      scale: 1,
      gray: 0,
      blur: 0,
      config: { tension: 200 },
    }),
    stateFloor: () => ({
      z: 0.3,
      scale: 1,
      gray: 0.7,
      blur: 2,
      config: { tension: 200 },
    }),
  },
};

export const CardState = {
  IN_DECK_BACK: "IN_DECK_BACK",
  IN_DECK_FRONT: "IN_DECK_FRONT",
  IN_FLOOR_BACK: "IN_FLOOR_BACK",
  IN_FLOOR_FRONT: "IN_FLOOR_FRONT",
  DECK_TOP_BACK: "DECK_TOP_BACK",
  DECK_TOP_FRONT: "DECK_TOP_FRONT",
  PICKED_FLICK_BACK: "PICKED_FLICK_BACK",
  PICKED_FLICK_FRONT: "PICKED_FLICK_FRONT",
  PICKED_GETBACK_BACK: "PICKED_GETBACK_BACK",
  PICKED_GETBACK_FRONT: "PICKED_GETBACK_FRONT",
};
