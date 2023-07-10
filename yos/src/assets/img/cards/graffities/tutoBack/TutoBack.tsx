import { animated, useSpring } from "react-spring";
import { ReactComponent as Anim1 } from "./anim1.svg";
import { ReactComponent as Anim2 } from "./anim2.svg";
import { ReactComponent as Instruction } from "./instruction.svg";
const TutoBack = () => {
  const props = useSpring({
    from: { opacity1: 1, opacity2: 0 },
    to: { opacity1: 0, opacity2: 1 },
    loop: { reverse: true },
    immediate: true,
    delay: 1000,
  });
  return (
    <animated.svg
      filter="url(#squiggly) drop-shadow(2px 2px 3px rgba(50, 50, 50, 0.7))"
      viewBox="0 0 108 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="back">
        <Instruction />
        <animated.g id="BackDoodle">
          <animated.g id="anim1" style={{ opacity: props.opacity1 }}>
            <Anim1 />
          </animated.g>
          <animated.g id="anim2" style={{ opacity: props.opacity2 }}>
            <Anim2 />
          </animated.g>
        </animated.g>
      </g>
    </animated.svg>
  );
};

export default TutoBack;
