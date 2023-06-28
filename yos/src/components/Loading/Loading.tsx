import { animated, config, to, useSpring, useSprings } from "react-spring";
import ClassName from "./Loading.module.scss";
/**
 * !!!TODO
 * implement later
 */
const fiveStarPoints = (r: number) => [
  {
    left: 0,
    top: 50,
  },
  {
    left: 30,
    top: 10,
  },
  {
    left: 10,
    top: 20,
  },
  {
    left: 10,
    top: 0,
  },
  {
    left: 30,
    top: 30,
  },
];
const Loading = () => {
  const [props, api] = useSprings(5, (i) => ({
    from: fiveStarPoints(1)[i],
    to: [fiveStarPoints(1)[i]]
      .concat(fiveStarPoints(1).slice(i + 1))
      .concat(fiveStarPoints(1).slice(0, i)),
    loop: true,
    ease: "easein",
    config: { tension: 50, friction: 5 },
  }));
  return (
    <animated.div className={ClassName.loading}>
      {props.map(({ left, top }) => (
        <animated.div
          className={ClassName.spin}
          style={{
            left: to(left, (left) => `${left}%`),
            top: to(top, (top) => `${top}%`),
          }}
        ></animated.div>
      ))}
    </animated.div>
  );
};

export default Loading;
