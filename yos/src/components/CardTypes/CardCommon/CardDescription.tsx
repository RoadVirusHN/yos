import ClassNames from "./Doodle.module.scss";
import { animated } from "react-spring";
import { forwardRef, useImperativeHandle, useState } from "react";
import ScalableSVGWrapper from "src/components/ScalableSVG";
import { AllCardInfoType } from "@customTypes/Cards";

export type DescRef = {
  updateProject: (topIdx: number) => void;
};
const CardDescription = forwardRef<DescRef, { cardInfos: AllCardInfoType[] }>(
  ({ cardInfos }, selfRef) => {
    const [title, setTitle] = useState(cardInfos.at(-1)!.description!.title);
    const [sub, setSub] = useState(cardInfos.at(-1)!.description!.sub);
    const [graffities, setGraffities] = useState(
      cardInfos.at(-1)!.description!.graffities
    );

    useImperativeHandle(selfRef, () => ({
      updateProject: (topIdx: number) => {
        const selectedProject = cardInfos.find((info) => info.index === topIdx);
        if (selectedProject) {
          setTitle(selectedProject.description!.title);
          setSub(selectedProject.description!.sub);
          setGraffities(selectedProject.description!.graffities);
        }
      },
    }));
    const renderGraffities = (gras: typeof graffities) => {
      if (gras === undefined) return null;
      return Object.entries(gras).map(([position, content]) => {
        return (
          <div
            key={position}
            className={`${ClassNames.graffiti} ${
              ClassNames[`graffiti-${position}`]
            }`}
          >
            <ScalableSVGWrapper content={content} />
          </div>
        );
      });
    };

    return (
      <>
        <animated.svg className={ClassNames.doodleTitle}>
          <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
            <h1 className={ClassNames.title}>{title}</h1>
            <h3 className={ClassNames.sub}>{sub}</h3>
          </foreignObject>
        </animated.svg>
        <animated.svg className={ClassNames.doodle}>
          <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
            <div className={ClassNames.doodleContainer}>
              {renderGraffities(graffities)}
            </div>
          </foreignObject>
        </animated.svg>
      </>
    );
  }
);

export default CardDescription;
