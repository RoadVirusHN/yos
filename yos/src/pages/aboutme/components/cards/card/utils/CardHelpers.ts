import { SpringValue } from "react-spring";
import { projects } from "../../utils/CardsData";

/**
 * !!!Todos
 * Maybe flickableDistance variable doesn't change due to the closure?
 */

// define helper functions
let flickableDistance = { w: window.innerWidth/4, h: window.innerHeight/4};

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

export function getDistance(
  to: { x: number; y: number; },
  fr: { x: number; y: number; }
): { dX: number; dY: number } {
  return {
    dX: to.x - fr.x,
    dY: to.y - fr.y,
  };
}
export function canFlick(
  props: { [keys: string]: SpringValue<number> }
) {
  const [dX, dY] = [
    Math.abs(props.x.get()),
    Math.abs(props.y.get() - projects.length * -4),
  ];
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}
