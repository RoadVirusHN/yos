import { SpringValue } from "react-spring";
import { projects } from "./CardsData";

/**
 * !!!Todos
 * Maybe flickableDistance variable doesn't change due to the closure?
 */

// define helper functions
let flickableDistance = { w: -1, h: -1 };

export const getFlickableDistance = (card: HTMLElement) => {
  return { w: card.offsetWidth / 2, h: card.offsetHeight / 2 };
};

// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

export const filt = (gray: number, blur: number) =>
  `grayscale(${gray}) blur(${blur}px)`;

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
