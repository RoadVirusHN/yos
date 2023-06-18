import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSpring, animated, to } from "react-spring";
import "./Logo.scss";
// stolen from https://github.com/pmndrs/use-gesture/blob/main/documentation/pages/HeroSandbox/index.js#L153
// and https://codesandbox.io/s/pf74x?file=/src/App.tsx
export default function Logo() {
  const [props, api] = useSpring(() => ({
    transform: "perspective(600px)",
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  const rect = useRef<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const prevAngleTurns = useRef([135, 0]);

  const calcX = (y: number, ly: number) =>
    -(y - (ly + rect.current!.height / 2) - window.innerHeight / 2) / 20;
  const calcY = (x: number, lx: number) =>
    (x - (lx + rect.current!.width / 2) - window.innerWidth / 2) / 20;
  const defaultBgShine = () => {
    prevAngleTurns.current[0] = 135;
    return `linear-gradient(${
      prevAngleTurns.current[0] - 360 * prevAngleTurns.current[1]
    }deg,rgba(255,255,255,0.25) 0%,rgba(255, 255, 255, 0) 60%)`;
  };

  const defaultText = { x: 0, y: 0, scale: 1 };
  const [shadow, setShadow] = useState(false);
  const [shine, apiShine] = useSpring(() => ({ background: defaultBgShine() }));
  const [text, apiText] = useSpring(() => defaultText);

  const bgShine = (px: number, py: number) => {
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
  const reapiShineAndText = () => {
    apiShine.start({ background: defaultBgShine() });
    apiText.start(defaultText);
  };

  const yText = (py: number) => {
    const cy = window.innerHeight / 2;
    return -((py - cy) / window.innerHeight) * 10;
  };

  const xText = (px: number) => {
    const cx = window.innerWidth / 2;
    return -((px - cx) / window.innerWidth) * 10;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    api.start({
      rotateX: calcX(e.pageY, props.y.get()),
      rotateY: calcY(e.pageX, props.x.get()),
      scale: 1.3,
    });
    setShadow(true);
  };

  const handleMouseLeave = () => {
    api.start({
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    });
    setShadow(false);
    reapiShineAndText();
  };

  const handleMouseUp = () => {
    api.start({
      scale: 1,
    });
    setShadow(false);
    reapiShineAndText();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    rect.current = ref.current!.getBoundingClientRect();
    api.start({
      rotateX: calcX(e.pageY, props.y.get()),
      rotateY: calcY(e.pageX, props.x.get()),
    });
    apiText.start({ y: yText(e.pageY), x: xText(e.pageX), scale: 1.3 });
    apiShine.start({ background: bgShine(e.pageX, e.pageY) });
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      handleMouseMove(e as unknown as React.MouseEvent<HTMLDivElement>);
    });
  }, [handleMouseMove]);

  return (
    <div className="logoContainer">
      <animated.div
        ref={ref}
        className={`logo ${shadow ? "shadow" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={props}
      >
        <animated.div className={"LogoShine"} style={shine} />
        <animated.div className={"LogoText"} style={text}>
          ROADVIRUSHN
        </animated.div>
        {/* hover to https://codepen.io/joshuaward/embed/RgOxKd?default-tab=result&editable=true&theme-id=dark#css-box */}
      </animated.div>
    </div>
  );
}
