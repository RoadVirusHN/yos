import { ReactComponent as Kejang0 } from "./kejang-stand.svg";
import { ReactComponent as Kejang1 } from "./kejang-jump.svg";
import { ReactComponent as Balloonword } from "./balloonword.svg";
import { animated, useSpring } from "react-spring";

const AnimatedG = animated("g");
const Kejang = ({ color = "black" }: { color?: string }) => {
  const props = useSpring({
    from: { opacity1: 1, opacity2: 0 },
    to: { opacity1: 0, opacity2: 1 },
    loop: { reverse: true },
    immediate: true,
    delay: 500,
  });

  return (
    <animated.svg
      viewBox="0 0 973 805"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="kejang">
        <AnimatedG
          id="kejang-jump"
          style={{ opacity: props.opacity1 }}
          stroke={color}
          filter="url(#squiggly) drop-shadow(2px 2px 3px rgba(50, 50, 50, 0.7))"
        >
          <Kejang0 />
        </AnimatedG>
        <AnimatedG
          id="kejang-stand"
          style={{ opacity: props.opacity2 }}
          stroke={color}
          filter="url(#squiggly) drop-shadow(2px 2px 3px rgba(50, 50, 50, 0.7))"
        >
          <Kejang1 />
        </AnimatedG>
        <svg xmlns="http://www.w3.org/2000/svg" stroke={color}>
          <Balloonword />
        </svg>
      </g>
    </animated.svg>
  );
};

export default Kejang;
