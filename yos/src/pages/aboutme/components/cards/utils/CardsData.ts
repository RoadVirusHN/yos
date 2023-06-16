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

// These two are just helpers, they curate spring data, values that are later being interpolated into css
export const to = (i: number) => ({
  x: 0,
  y: i * -4, // make slightly upward
  z: i,
  scale: 1,
  rot: -10 + Math.random() * 20,
  gray: 0,
  blur: 0,
  delay: i * 100,
});
export const from = (i: number) => ({
  x: 1000,
  y: -1000,
  rot: 0,
  z: 1,
  gray: 0,
  blur: 0,
  scale: 1.5,
});
// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

export const filt = (gray: number, blur: number) =>
  `grayscale(${gray}) blur(${blur}px)`;

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
