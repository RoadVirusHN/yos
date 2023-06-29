// Data about components, Animation State, Hard coded datas, Constants etc...
import { config } from "react-spring";
import { AnimData } from "../../../../../../../types/Animation";
import { projects } from "../../../utils/CardsData";
import { clip } from "./CardHelpers";

export let flickableDistance = {
  w: 160,
  h: 128,
};

const snapDist = {
  sX: window.innerWidth / 3,
  sY: window.innerHeight / 3,
};

export type CardStyle = {
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  isTop?: number;
  gray?: number;
  blur?: number;
  scale?: number;
  delay?: number;
  side?: string;
  onAnim?: string;
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
      rx: 0,
      ry: 0,
      rz: 0,
      gray: 0,
      blur: 0,
      scale: 1.5,
      isTop: i === projects.length - 1 ? 1 : 0,
      onAnim: "",
      cursor: i === projects.length - 1 ? "grab" : "default",
      side: "front",
    };
  },
  states: {
    stateStart: (i: number) => ({
      x: 0,
      y: i * -4, // make slightly upward
      z: i + 1,
      rx: 0,
      ry: 0,
      scale: 1,
      rz: -8 + Math.random() * 16,
      gray: 0,
      blur: 0,
      side: "front",
      isTop: i === projects.length - 1 ? 1 : 0,
      cursor: i === projects.length - 1 ? "grab" : "default",
      delay: i * 200,
    }),
    stateTop: (rz: number) => ({
      from: {
        isTop: 1,
      },
      to: [
        {
          z: projects.length,
          scale: 1.1,
          gray: 0,
          rz: rz - 4 + Math.random() * 8,
          blur: 0,
          cursor: "grab",
          config: { tension: 210, friction: 20 },
        },
        {
          x: 0,
          y: projects.length * -4,
          scale: 1,
          cursor: "grab",
          config: { tension: 210, friction: 20 },
        },
      ],
    }),
    statePick: (rz: number) => ({
      scale: 1.1,
      rz: rz + (Math.random() * 6 - 3),
      delay: undefined,
      cursor: "grabbing",
      config: { friction: 50, tension: 800 },
    }),
    stateFloat: () => ({
      z: projects.length + 1,
      cursor: "grabbing",
      scale: 1.1,
      gray: 0,
      blur: 0,
      config: { tension: 200 },
    }),
    stateFlickable: () => ({
      z: projects.length + 1,
      scale: 1.1,
      gray: 0.7,
      blur: 2,
      cursor: "grabbing",
    }),
    stateMove: (mouseDelta: { dX: number; dY: number }) => {
      let { dX, dY } = mouseDelta;
      const absX = Math.abs(dX);
      const absY = Math.abs(dY);
      if (absX > flickableDistance.w && absX < snapDist.sX) {
        const ratio = snapDist.sX / absX;
        dX = dX * ratio;
      }

      if (absY > flickableDistance.h && absY < snapDist.sY) {
        const ratio = snapDist.sY / absY;
        dY = dY * ratio;
      }
      return {
        x: dX,
        y: dY,
        cursor: "grabbing",
      };
    },
    stateDeck: (order: number) => ({
      x: 0,
      y: order * -4,
      z: order,
      scale: 1,
      gray: 0,
      blur: 0,
      isTop: order === projects.length - 1 ? 1 : 0,
      cursor: order === projects.length - 1 ? "grab" : "default",
      config: { tension: 200 },
    }),
    stateFloor: () => ({
      z: 1,
      scale: 1,
      gray: 0.7,
      blur: 2,
      cursor: "alias",
      isTop: 0,
      config: config.stiff,
    }),
    stateFront: (props: { [key: string]: any }) => {
      if (props.side.get() === "front") {
        return {};
      }
      return {
        from: { side: "front" },
        to: [
          { ry: 0, rz: 45, z: 100, scale: 1.4 },
          {
            rx: 0,
            ry: 0,
            rz: -8 + Math.random() * 16,
            z: props.z.get(),
            scale: 1,
          },
        ],
        config: {
          tension: 640,
          friction: 60,
        },
      };
    },
    stateBack: (props: { [key: string]: any }) => {
      if (props.side.get() === "back") {
        return {};
      }
      return {
        from: { side: "back" },
        to: [
          { ry: 180, rz: 45, z: 100, scale: 1.4 },
          {
            //rx: 180,
            rz: 90 - 4 + Math.random() * 8,
            z: props.z.get(),
            scale: 1,
          },
        ],
        config: {
          tension: 640,
          friction: 60,
        },
      };
    },
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
