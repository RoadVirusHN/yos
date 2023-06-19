// Data about components, Animation State, Hard coded datas, Constants etc...
import { AnimData } from "../../../../../types/Animation";

// Datas
export const projects = [
  {
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  },
  {
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  },
  {
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  },
  {
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
  },
  {
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  },
  {
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
  },
];

export type CardProperties = {
  x?: number;
  y?: number;
  rot?: number;
  z?: number;
  gray?: number;
  blur?: number;
  scale?: number;
  immedeiate?: boolean;
  config?: { [key: string]: number };
};

// So many states, check comments.
export const animationData: AnimData = {
  initialProps: {
    card: {
      to: (i: number) => ({ // default piled deck.
        x: 0,
        y: i * -4, // make slightly upward
        z: i,
        scale: 1,
        rot: -10 + Math.random() * 20,
        gray: 0,
        blur: 0,
        delay: i * 100,
      }),
      from: (i: number) => ({ // cards fly from outside -> need to initiate when scrolled!
        x: window.innerWidth * 2,
        y: -window.innerWidth * 2,
        rot: 0,
        z: 1,
        gray: 0,
        blur: 0,
        scale: 1.5,
      }),
    },
  },
  states: {
    stateTop: () => ({ // the card is on the top of deck
      card: {
        x: 0,
        z: projects.length,
        y: projects.length * -4,
        scale: 1,
        gray: 0,
        blur: 0,
        config: { tension: 500 },
      },
    }),
    statePick: (rot: number) => ({ // the card has been picked.
      card: {
        scale: 1.1,
        delay: undefined,
        rot: Math.max(Math.min(rot, 10), -10) + (Math.random() * 6 - 3),
        config: { friction: 50, tension: 800 },
      },
    }),
    stateFloat: () => ({// the card is grabbing.
      card: {
        z: projects.length,
        scale: 1.1,
        gray: 0,
        blur: 0,
        config: { tension: 200 },
      },
    }),
    stateFlickable: () => ({// the held card is far enough to be flicked
      card: {
        z: 0.1,
        scale: 1,
        gray: 0.7,
        blur: 2,
      },
    }),
    stateMove: (mouseDelta: { dX: number; dY: number }) => ({ // the held card is moving.
      card: {
        x: mouseDelta.dX,
        y: mouseDelta.dY,
      },
    }),
    stateDeck: (index: number) => ({ // the card is sorting by index.
      card: {
        x: 0,
        y: index * -4,
        z: index,
        scale: 1,
        gray: 0,
        blur: 0,
        config: { tension: 200 },
      },
    }),
    stateFloor: () => ({// put card at floor == last of the deck.
      card: {        
        z: 0,
        scale: 1,
        gray: 0.7,
        blur: 2,
        config: { tension: 200 },
      },
    }),
  },
};
