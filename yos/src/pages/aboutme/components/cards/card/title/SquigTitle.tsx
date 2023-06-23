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
            numOctaves="2"
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
      <text x="50%" y="50%"  filter="url(#squiggly)">
        <tspan className={ClassNames.title}>
          Very Long and Big Project Name yeah!
        </tspan>
        <tspan className={ClassNames.sub} dy="1em" dx="-10em" rotate="10">
          그리고 작은 한국어 프로젝트 명
        </tspan>
      </text>
    </animated.svg>
  );
};

export default SquigTitle;
