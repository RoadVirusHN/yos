import React, { useEffect, useRef } from "react";
import { useSpring, animated, to } from "react-spring";
import twat from "../../../assets/img/coloredTwat.png";
import "./Logo.scss";

const calcX = (y: number, ly: number) =>
  -(y - ly - window.innerHeight / 2) / 10;
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 10;

export default function Logo() {
  const [props, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    x: 0,
    y: 0,
    isHovered: false,
    config: { mass: 10, tension: 400, friction: 30 },
  }));
  const prevAngleTurns = useRef([135, 0]);
  const rect = useRef({});

  const defaultBgShine = () => {
    prevAngleTurns.current[0] = 135;
    return `linear-gradient(${
      prevAngleTurns.current[0] - 360 * prevAngleTurns.current[1]
    }deg,rgba(255,255,255,0.25) 0%,rgba(255, 255, 255, 0) 60%)`;
  };

  const bgShine = (px, py) => {
    const cx = rect.current.x + rect.current.width / 2;
    const cy = rect.current.y + rect.current.height / 2;
    // stolen from https://codesandbox.io/s/m434428q5y
    const arad = Math.atan2(py - cy, px - cx);
    const rawAngle = (arad * 180) / Math.PI - 90; // convert rad to degrees
    const [prevAngle, prevTurns] = prevAngleTurns.current;

    const delta_a = rawAngle - prevAngle;
    const turns =
      Math.abs(delta_a) > 270 ? prevTurns + Math.sign(delta_a) : prevTurns;
    const angle = rawAngle - 360 * turns;
    prevAngleTurns.current = [rawAngle, turns];

    const intensity = ((py - rect.current.y) / rect.current.height) * 0.6 + 0.2;

    return `linear-gradient(${angle}deg, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 80%)`;
  };

  const yText = (py) => {
    const cy = rect.current.y + rect.current.height / 2;
    return -((py - cy) / rect.current.height) * 10;
  };

  const xText = (px) => {
    const cx = rect.current.x + rect.current.width / 2;
    return -((px - cx) / rect.current.width) * 10;
  };
  const [shadow, setShadow] = useState(false);
  const [shine, apiShine] = useSpring(() => ({ background: defaultBgShine() }));
  const [text, apiText] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  useEffect(() => {
    api.start({
      from: {
        rotateX: 10,
        rotateY: -10,
        scale: 1.3,
      },
      to: {
        rotateX: 10,
        rotateY: -10,
        scale: 1,
      },
    });
  }, [api]);
  const onHover = (dragging: boolean, active: boolean) => {
    if (!dragging) {
      if (!active) reapiShineAndText();
      api.start({ scale: active ? 0.9 : 0.8, rotateX: 0, rotateY: 0 });
      setShadow(active);
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    api.start({
      rotateX: calcX(e.pageY, y.get()),
      rotateY: calcY(e.pageX, x.get()),
      scale: 1.3,
    });
  };

  const handleMouseEnter = () => {
    api.start({ rotateX: 0, rotateY: 0, scale: 1.1 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    api.start({
      rotateX: calcX(e.pageY, y.get()),
      rotateY: calcY(e.pageX, x.get()),
      scale: 1.1,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      scale: 1,
    });
  };

  return (
    <div className="logoContainer">
      <animated.div
        className="logo"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "perspective(600px)",
          x,
          y,
          scale: to(scale, (s) => s + (isHovered ? 0.1 : 0)),
          rotateX,
          rotateY,
        }}
      >
        <img src={twat} alt="twat" />
        <animated.div style={shine} />
        <animated.div style={text}>Drag me!</animated.div>
      </animated.div>
    </div>
  );
}
