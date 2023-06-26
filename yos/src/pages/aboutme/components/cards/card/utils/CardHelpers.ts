import { SpringValue } from "react-spring";
import { projects } from "../../utils/CardsData";
import { flickableDistance } from "./CardData";

// define helper functions

export const getFlickableDistance = (card: HTMLElement) => {
  return { w: card.offsetWidth / 2, h: card.offsetHeight / 2 };
};

// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (rx: number, ry: number, rz: number, s: number) =>
  `perspective(1400px) rotateX(${rx + 30}deg) rotateY(${
    ry + Math.min(rz / 10, 1)
  }deg) rotateZ(${rz}deg) scale(${s})`;

export const filt = (gray: number, blur: number) =>
  `grayscale(${gray}) blur(${blur}px)`;

export const flip = (y: number, z: number) =>
  `rotateY(${y}deg) rotateZ(${z}deg);`;

export function getDistance(
  to: { x: number; y: number },
  fr: { x: number; y: number }
): { dX: number; dY: number } {
  return {
    dX: to.x - fr.x,
    dY: to.y - fr.y,
  };
}
export function canFlick(props: { [keys: string]: SpringValue<number> }) {
  const [dX, dY] = [
    Math.abs(props.x.get()),
    Math.abs(props.y.get() - projects.length * -4),
  ];
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}
