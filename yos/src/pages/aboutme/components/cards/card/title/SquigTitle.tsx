import ClassNames from "./utils/SquigTitle.module.scss";
import { animated, useSpring } from "react-spring";
import { animationData } from "./utils/SquigData";
import { projects } from "../../utils/CardsData";
import { forwardRef, useImperativeHandle, useState } from "react";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

export type SquigProps = { squigVisible: string };

export type SquigRef = {
  updateProject: (topIdx: number) => void;
};
const SquigTitle = forwardRef<SquigRef, SquigProps>(
  ({ squigVisible }: { squigVisible: string }, selfRef) => {
    const { seed, scale } = useSpring({
      ...animationData.initialProps(),
      loop: true,
      immediate: true,
      config: { duration: 70, tension: 420, friction: 10 },
    });

    const [title, setTitle] = useState("loading...");
    const [sub, setSub] = useState("");

    useImperativeHandle(selfRef, () => ({
      updateProject: (topIdx: number) => {
        setTitle(
          projects.filter((pjt) => pjt.index === topIdx)[0].project.title
        );
        setSub(projects.filter((pjt) => pjt.index === topIdx)[0].project.sub);
      },
    }));

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
        <text x="50%" y="50%" filter="url(#squiggly)">
          <tspan className={ClassNames.title} x="50%" dy="-0.9em">
            {title}
          </tspan>
          <tspan className={ClassNames.sub} x="50%" dy="1em">
            {sub}
          </tspan>
        </text>
      </animated.svg>
    );
  }
);

export default SquigTitle;
