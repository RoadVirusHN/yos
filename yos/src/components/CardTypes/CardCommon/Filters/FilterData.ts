// Data about components, Animation State, Hard coded datas, Constants etc...

import { AnimData } from "@customTypes/Animation";

export type SquiggleStyle = {
  seed?: number;
  scale?: number;
  config?: {
    friction?: number;
    mass?: number;
    tension?: number;
    duration?: number;
  };
};

export type SquiggleAnimInputs =
  | SquiggleStyle
  | {
      from: SquiggleStyle;
      to: SquiggleStyle | SquiggleStyle[];
    };
export const animationData: AnimData<SquiggleAnimInputs> = {
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
