// Data about components, Animation State, Hard coded datas, Constants etc...
import { animation } from "@lib/Animation";
import {
  ControllerProps,
  GoalProp,
  Lookup,
  SpringChain,
  SpringRef,
  SpringToFn,
  SpringValues,
  config,
  useSpring,
} from "react-spring";

export let flickableDistance = {
  w: 160,
  h: 128,
};

const snapDist = {
  sX: window.innerWidth / 3,
  sY: window.innerHeight / 3,
};

export interface AnimDefaultStyle {
  // Common Styles for All Animations
  onAnim: string;
}
export type initialStyles<T> = Partial<T> & AnimDefaultStyle; //
export interface CardStyles extends Lookup<any> {
  // Styles for cards.
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  gray: number;
  blur: number;
  scale: number;
  ratio: number;
  shadow: boolean;
  isTop: 1 | 0;
  cursor: "grab" | "default" | "grabbing" | "alias";
  side: "front" | "back";
}

export type AnimStatesOutput<T extends Lookup<any>> =
  //AnimStates Function Return Type
  (
    | Partial<T>
    | {
        from: Partial<T>;
        to?: GoalProp<T> | SpringToFn<T> | SpringChain<T> | undefined;
      }
  ) &
    ControllerProps<T, undefined>;
/**
 * Abstract Class for Animation States.
 * you can add `State${StateName}` method for more states.
 */
export abstract class AnimStates<Styles extends Lookup<any>> {
  AnimAPI: {
    AnimRef: SpringRef<Styles>;
    AnimValues: SpringValues<Styles>;
  };
  constructor(AnimAPI: {
    AnimRef: SpringRef<Styles>;
    AnimValues: SpringValues<Styles>;
  }) {
    this.AnimAPI = AnimAPI;
  }
  abstract StateInit(...args: any): initialStyles<Styles>;
}
export class CardAnimStates extends AnimStates<CardStyles> {
  StateInit(order: number, deckLength: number): initialStyles<CardStyles> {
    const radians = (((order * 360) / deckLength + 180) * Math.PI) / 180;
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
      isTop: order === deckLength - 1 ? 1 : 0,
      ratio: 89 / 64,
      shadow: true,
      cursor: order === deckLength - 1 ? "grab" : "default",
      side: "front",
      onAnim: "",
    };
  }
  StateStart(order: number, deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      x: 0,
      y: order * -4, // make slightly upward
      z: order + 1,
      rx: 0,
      ry: 0,
      scale: 1,
      rz: -8 + Math.random() * 16,
      gray: 0,
      blur: 0,
      side: "front",
      isTop: order === deckLength - 1 ? 1 : 0,
      cursor: order === deckLength - 1 ? "grab" : "default",
      delay: order * 200,
    };
  }
  StateTop(deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      from: {
        isTop: 1,
      },
      to: [
        {
          z: deckLength,
          scale: 1.1,
          gray: 0,
          rz: this.AnimAPI.AnimValues.rz.get() - 4 + Math.random() * 8,
          blur: 0,
          cursor: "grab",
          config: { tension: 210, friction: 20 },
        },
        {
          x: 0,
          y: deckLength * -4,
          scale: 1,
          cursor: "grab",
          config: { tension: 210, friction: 20 },
        },
      ],
    };
  }
  StatePick(): AnimStatesOutput<CardStyles> {
    return {
      scale: 1.1,
      rz: this.AnimAPI.AnimValues.rz.get() + (Math.random() * 6 - 3),
      delay: undefined,
      cursor: "grabbing",
      config: { friction: 50, tension: 800 },
    };
  }
  StateFloat(deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      z: deckLength + 1,
      cursor: "grabbing",
      scale: 1.1,
      gray: 0,
      blur: 0,
      config: { tension: 200 },
    };
  }
  StateFlickable(deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      z: deckLength + 1,
      scale: 1.1,
      gray: 0.7,
      blur: 2,
      cursor: "grabbing",
    };
  }
  StateMove(mouseDelta: {
    dX: number;
    dY: number;
  }): AnimStatesOutput<CardStyles> {
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
  }
  StateDeck(order: number, deckLength: number): AnimStatesOutput<CardStyles> {
    return {
      x: 0,
      y: order * -4,
      z: order,
      scale: 1,
      gray: 0,
      blur: 0,
      isTop: order === deckLength - 1 ? 1 : 0,
      cursor: order === deckLength - 1 ? "grab" : "default",
      config: { tension: 200 },
    };
  }
  StateFloor(): AnimStatesOutput<CardStyles> {
    return {
      z: 0,
      scale: 1,
      gray: 0.7,
      blur: 2,
      cursor: "alias",
      isTop: 0,
      config: config.stiff,
    };
  }
  StateFront(): AnimStatesOutput<CardStyles> {
    if (this.AnimAPI.AnimValues.side.get() === "front") {
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
          z: this.AnimAPI.AnimValues.z.get(),
          scale: 1,
        },
      ],
      config: {
        tension: 640,
        friction: 60,
      },
    };
  }
  StateBack(): AnimStatesOutput<CardStyles> {
    if (this.AnimAPI.AnimValues.side.get() === "back") {
      return {};
    }
    return {
      from: { side: "back" },
      to: [
        { ry: 180, rz: 45, z: 100, scale: 1.4 },
        {
          //rx: 180,
          rz: 90 - 4 + Math.random() * 8,
          z: this.AnimAPI.AnimValues.z.get(),
          scale: 1,
        },
      ],
      config: {
        tension: 640,
        friction: 60,
      },
    };
  }
}
