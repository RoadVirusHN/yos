// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (rx: number, ry: number, rz: number, s: number) =>
  `perspective(1400px) rotateX(${rx + 15}deg) rotateY(${
    ry + Math.min(rz / 10, 1)
  }deg) rotateZ(${rz}deg) scale(${s})`;

export const filt = (gray: number, blur: number) =>
  `grayscale(${gray}) blur(${blur}px)`;

export const flip = (y: number, z: number) =>
  `rotateY(${y}deg) rotateZ(${z}deg);`;
