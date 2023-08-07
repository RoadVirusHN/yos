// helper functions for data and hook.

// calc 3D rotation degrees.
export const calcX = (
  y: number,
  rect: React.MutableRefObject<DOMRect | null>
) => -(y - (rect.current!.y + rect.current!.height / 2)) / 20;

export const calcY = (
  x: number,
  rect: React.MutableRefObject<DOMRect | null>
) => (x - (rect.current!.x + rect.current!.width / 2)) / 20;

export const yText = (py: number) => {
  const cy = window.innerHeight / 2;
  return -((py - cy) / window.innerHeight) * 10;
};

export const xText = (px: number) => {
  const cx = window.innerWidth / 2;
  return -((px - cx) / window.innerWidth) * 10;
};

export const reflect = (
  px: number,
  py: number,
  rect: React.MutableRefObject<DOMRect | null>,
  prevAngleTurns: React.MutableRefObject<number[]>
) => {
  const cx = rect.current!.x + rect.current!.width / 2;
  const cy = rect.current!.y + rect.current!.height / 2;

  // stolen from https://codesandbox.io/s/m434428q5y
  const arad = Math.atan2(py - cy, px - cx);
  const rawAngle = (arad * 180) / Math.PI - 90; // convert rad to degrees
  const [prevAngle, prevTurns] = prevAngleTurns.current;

  const delta_a = rawAngle - prevAngle;
  const turns =
    Math.abs(delta_a) > 270 ? prevTurns + Math.sign(delta_a) : prevTurns;
  const angle = rawAngle - 360 * turns;
  prevAngleTurns.current = [rawAngle, turns];

  const intensity =
    (px / (window.innerWidth / 2)) * 0.2 +
    (py / (window.innerHeight / 2)) * 0.2 +
    0.1;

  return `linear-gradient(${angle}deg, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 80%)`;
};

export const refelctionDefaultFunction =
  (prevAngleTurns: React.MutableRefObject<number[]>) => () => {
    prevAngleTurns.current[0] = 135;
    return `linear-gradient(${
      prevAngleTurns.current[0] - 360 * prevAngleTurns.current[1]
    }deg,rgba(255,255,255,0.25) 0%,rgba(255, 255, 255, 0) 60%)`;
  };
