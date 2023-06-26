import ClassNames from "./utils/Doodle.module.scss";
import { animated, useSpring } from "react-spring";
import { animationData } from "./utils/DoodleData";
import { projects } from "../../../utils/CardsData";
import { forwardRef, useImperativeHandle, useState } from "react";

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
    config: { duration: 70, tension: 420, friction: 10 },
  });

  const [title, setTitle] = useState(projects.at(-1)!.project.title);
  const [sub, setSub] = useState(projects.at(-1)!.project.sub);
  const [doodle, setDoodle] = useState(projects.at(-1)!.project.doodle);

  useImperativeHandle(selfRef, () => ({
    updateProject: (topIdx: number) => {
      setTitle(projects.filter((pjt) => pjt.index === topIdx)[0].project.title);
      setSub(projects.filter((pjt) => pjt.index === topIdx)[0].project.sub);
      setDoodle(projects.filter((pjt) => pjt.index === topIdx)[0].project.doodle)
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
          <div>
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
            {doodle}
          </div>
        </foreignObject>
      </svg>
    </animated.svg>
  );
});

export default Doodle;
