import { animated, useSpring } from "react-spring";
import { animationData } from "./FilterData";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

const SquiggleFilter = () => {
  const { seed, scale } = useSpring({
    ...animationData.initialProps(),
    loop: true,
    immediate: true,
    config: { duration: 70, tension: 420, friction: 10 },
  });
  return (
    <animated.svg style={{ width: "0", height: "0", position: "absolute" }}>
      <defs>
        <filter id="squiggly">
          <AnimFeTurbulence
            id="turbulence"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
            seed={seed}
          />
          <AnimFeDisplacementMap
            id="displacement"
            in="SourceGraphic"
            in2="noise"
            scale={scale}
          />
        </filter>
      </defs>
    </animated.svg>
  );
};
export default SquiggleFilter;
