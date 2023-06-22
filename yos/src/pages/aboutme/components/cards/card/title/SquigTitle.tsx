import ClassNames from "./utils/SquigTitle.module.scss";
import { animated, useSpring, config as confType } from "react-spring";
import { animationData } from "./utils/SquigData";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

const SquigTitle = ({ squigVisible }: { squigVisible: string }) => {
  const { seed, scale } = useSpring({
    ...animationData.initialProps(),
    loop: true,
    immediate: true,
    config: { duration: 70, tension: 420, friction: 10 },
  });

  return (
    <animated.svg
      className={ClassNames.squig}
      style={{ visibility: squigVisible as any }}
    >
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
      <text x="50%" y="50%" className={ClassNames.title} filter="url(#squiggly)">
        <tspan dy="-0.7em" dx="0.2em">
          Pudding
        </tspan>
        <tspan dy="1em" dx="-2em">
          &amp;
        </tspan>
        <tspan dy="1em" dx="-2.5em">
          한글 실험
        </tspan>
      </text>
    </animated.svg>
  );
};

export default SquigTitle;
