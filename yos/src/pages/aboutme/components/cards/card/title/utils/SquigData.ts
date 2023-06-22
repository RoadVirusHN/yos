// Data about components, Animation State, Hard coded datas, Constants etc...

import { AnimData } from "../../../../../../../types/Animation";

export type SquigStyle = {
  seed?: number;
  scale?: number;
  config?: {
    friction?: number;
    mass?: number;
    tension?: number;
    duration?: number;
  };
};

export type SquigAnimInputs =
  | SquigStyle
  | {
      from: SquigStyle;
      to: SquigStyle | SquigStyle[];
    };
export const animationData: AnimData<SquigAnimInputs> = {
  initialProps: () => ({
    from: { seed: 0, scale: 6 },
    to: [
      {
        seed: 1,
        scale: 8,
      },
      {
        seed: 2,
        scale: 6,
      },
      {
        seed: 3,
        scale: 8,
      },
      {
        seed: 4,
        scale: 6,
      },
      {
        seed: 5,
        scale: 8,
      },
    ],
  }),
  states: {},
};
