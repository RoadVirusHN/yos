import ClassNames from "./Doodle.module.scss";
import { animated, useSpring } from "react-spring";
import { forwardRef, useImperativeHandle, useState } from "react";
import { projects } from "src/data/CardsData";

export type DoodleRef = {
  updateProject: (topIdx: number) => void;
};
const Doodle = forwardRef<DoodleRef>(({}, selfRef) => {
  const [title, setTitle] = useState(projects.at(-1)!.description.title);
  const [sub, setSub] = useState(projects.at(-1)!.description.sub);
  const [graffities, setGraffities] = useState(
    projects.at(-1)!.description.graffities
  );

  useImperativeHandle(selfRef, () => ({
    updateProject: (topIdx: number) => {
      const selectedProject = projects.find((pjt) => pjt.index === topIdx);
      if (selectedProject) {
        setTitle(selectedProject.description.title);
        setSub(selectedProject.description.sub);
        setGraffities(selectedProject.description.graffities);
      }
    },
  }));
  const renderGraffities = (gras: typeof graffities) => {
    if (gras === undefined) return <></>;
    return Object.entries(gras).map(([position, content]) => {
      return (
        <div
          key={position}
          className={`${ClassNames.graffiti} ${
            ClassNames[`graffiti-${position}`]
          }`}
        >
          {content}
        </div>
      );
    });
  };

  return (
    <>
      <animated.svg className={ClassNames.doodle}>
        <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
          <div className={ClassNames.doodleContainer}>
            <h1 className={ClassNames.title}>{title}</h1>
            <h3 className={ClassNames.sub}>{sub}</h3>
            {renderGraffities(graffities)}
          </div>
        </foreignObject>
      </animated.svg>
    </>
  );
});

export default Doodle;
