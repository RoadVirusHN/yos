import { Controller, SpringValue } from "react-spring";
import { CardProperties, projects } from "./CardsData";

// define helper functions
export let flickableDistance = { w: -1, h: -1 };
export const getFlickableDistance = (card: HTMLElement) => {
  return { w: card.offsetWidth / 2, h: card.offsetHeight / 2 };
};

export function getDragDistance(
  e: React.MouseEvent,
  dragStart: React.MutableRefObject<{ [keys: string]: number }>
): { dX: number; dY: number } {
  return {
    dX: e.pageX - dragStart.current.x,
    dY: e.pageY - dragStart.current.y,
  };
}

export function isDraggingByLeftClick(e: React.MouseEvent) {
  return e.buttons === 1;
}

export function isDragging(
  dragStart: React.MutableRefObject<{ [keys: string]: number }>
) {
  return dragStart.current.x !== -1 && dragStart.current.y !== -1;
}

export function isCardAtTop(
  index: number,
  queue: React.MutableRefObject<number[]>
) {
  return queue.current.at(-1) === index;
}

export function dragOver(
  dragStart: React.MutableRefObject<{ [keys: string]: number }>
) {
  dragStart.current = { x: -1, y: -1 };
}

export function putCardAtLast(
  index: number,
  queue: React.MutableRefObject<number[]>
) {
  queue.current = [index].concat(queue.current.filter((ele) => ele !== index));
}

export function makeCardTopAnim(index: number, api: any) {
  api.start((i: number) => {
    if (index !== i) return;
    return {
      x: 0,
      z: projects.length,
      y: projects.length * -4,
      scale: 1,
      gray: 0,
      blur: 0,
      config: { tension: 500 },
    };
  });
}
export function canFlick(
  element: HTMLElement,
  index: number,
  props: { [keys: string]: SpringValue<number> }[]
) {
  const [dX, dY] = [
    Math.abs(props[index].x.get()),
    Math.abs(props[index].y.get() - projects.length * -4),
  ];
  // getFlickableDistance for this card.
  if (flickableDistance.w === -1 && flickableDistance.h === -1) {
    flickableDistance = getFlickableDistance(element);
  }
  // check the drag distance is enough to flick(card size).
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}
// define animation play functions
export const pickCardAnim = (
  index: number,
  api: any,
  props: { [keys: string]: SpringValue<number> }[]
) => {
  api.start((i: number) => {
    if (index !== i) return;
    return {
      scale: 1.1,
      delay: undefined,
      rot:
        Math.max(Math.min(props[index].rot.get(), 10), -10) +
        (Math.random() * 6 - 3),
      config: { friction: 50, tension: 800 },
    };
  });
};

export function setFlickableCardAnim(
  index: number,
  flickable: boolean,
  api: any
) {
  api.start((i: number) => {
    if (index !== i) return;
    return flickable
      ? {
          z: 0.1,
          scale: 1,
          gray: 0.7,
          blur: 2,
        }
      : {
          z: projects.length,
          scale: 1.1,
          gray: 0,
          blur: 0,
          config: { tension: 200 },
        };
  });
}

export function cardFollowCursorAnim(
  index: number,
  mouseDelta: { dX: number; dY: number },
  api: any
) {
  api.set((i: number, _ctrl: Controller<CardProperties>) => {
    if (index !== i) return {};
    return {
      x: mouseDelta.dX,
      y: mouseDelta.dY,
    };
  });
}
export function putCardAnim(
  index: number,
  flickable: boolean,
  api: any,
  queue: React.MutableRefObject<number[]>
) {
  api.start((i: number) => {
    if (flickable && index === i) {
      return {
        // put card at floor, last of the deck.
        z: 0,
        scale: 1,
        gray: 0.7,
        blur: 2,
        config: { tension: 200 },
      };
    } else {
      // rearrange all card by their order in the deck.
      const currentIndex = queue.current.indexOf(i);
      return {
        x: 0,
        y: currentIndex * -4,
        z: currentIndex,
        scale: 1,
        gray: 0,
        blur: 0,
        config: { tension: 200 },
      };
    }
  });
}
