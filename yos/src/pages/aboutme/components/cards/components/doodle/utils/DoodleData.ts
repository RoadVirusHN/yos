// Data about components, Animation State, Hard coded datas, Constants etc...

import { AnimData } from "../../../../../../../types/Animation";


export type DoodleStyle = {
  seed?: number;
  scale?: number;
  config?: {
    friction?: number;
    mass?: number;
    tension?: number;
    duration?: number;
  };
};

export type DoodleAnimInputs =
  | DoodleStyle
  | {
      from: DoodleStyle;
      to: DoodleStyle | DoodleStyle[];
    };
export const animationData: AnimData<DoodleAnimInputs> = {
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
