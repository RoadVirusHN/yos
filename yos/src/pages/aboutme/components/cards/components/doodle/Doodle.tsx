import ClassNames from "./utils/Doodle.module.scss";
import { animated, useSpring } from "react-spring";
import { animationData } from "./utils/DoodleData";
import { forwardRef, useImperativeHandle, useState } from "react";
import { projects } from "../../utils/CardsData";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

export type DoodleRef = {
  updateProject: (topIdx: number) => void;
};
const Doodle = forwardRef<DoodleRef>(({}, selfRef) => {
  const { seed, scale } = useSpring({
    ...animationData.initialProps(),
    loop: true,
    immediate: true,
    config: { duration: 140, tension: 420, friction: 10 },
  });

  const [title, setTitle] = useState(projects.at(-1)!.description.title);
  const [sub, setSub] = useState(projects.at(-1)!.description.sub);
  const [graffiti, setGraffiti] = useState(
    projects.at(-1)!.description.graffities?.left
  );

  useImperativeHandle(selfRef, () => ({
    updateProject: (topIdx: number) => {
      setTitle(
        projects.filter((pjt) => pjt.index === topIdx)[0].description.title
      );
      setSub(projects.filter((pjt) => pjt.index === topIdx)[0].description.sub);
      setGraffiti(
        projects.filter((pjt) => pjt.index === topIdx)[0].description.graffities
          ?.left
      );
    },
  }));

  return (
    <animated.svg className={ClassNames.doodle}>
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
      <svg filter="url(#squiggly) drop-shadow( 2px 2px 3px rgba(50, 50, 50, .7))">
        <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
          <div className={ClassNames.doodleContainer}>
            <h1
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              className={ClassNames.title}
            >
              {title}
            </h1>
            <h3
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              className={ClassNames.sub}
            >
              {sub}
            </h3>
            <div className={ClassNames.graffiti}>{graffiti}</div>
          </div>
        </foreignObject>
      </svg>
    </animated.svg>
  );
});

export default Doodle;
