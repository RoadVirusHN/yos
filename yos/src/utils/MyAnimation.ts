// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (
  rx: number,
  ry: number,
  rz: number,
  s: number,
  r: number
) =>
  `perspective(1400px) rotateX(${rx + 15}deg) rotateY(${ry + Math.min(rz / 10, 1)
  }deg) rotateZ(${rz}deg) scale(${r === 1 / 1 ? s - 0.2 : s})`;

export const filt = (gray: number, blur: number) =>
  `grayscale(${gray}) blur(${blur}px)`;
export const shadowFilt = (gray: number, blur: number) => `drop-shadow(0 6px 10px rgba(50, 50, 73, 0.4)) drop-shadow(0 5px 5px rgba(50, 50, 73, 0.3)) ${filt(gray, blur)}`


export const flip = (y: number, z: number) =>
  `rotateY(${y}deg) rotateZ(${z}deg);`;
