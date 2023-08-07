import { type CardComponentProps } from "src/components/CardTypes/Card";
import { animated, to } from "react-spring";
import ClassNames from "./PjtDesc.module.scss";
import {
  type CardComponentData,
  type PjtCardData,
} from "src/data/CardProcessors";

interface DescData {
  Title: string;
  Subtitle: string;
  Doodle: () => JSX.Element;
}

const PjtDesc = (pjtData: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtData.Description,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const { Title, Subtitle, Doodle } = cardData.Description as DescData;
    const [cardAnim] = [cardAnimController.AnimStates.AnimAPI.AnimValues];
    return (
      <>
        <animated.svg
          className={ClassNames.doodleTitle}
          style={{
            opacity: cardAnim.isTop,
          }}
        >
          <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
            <h1 className={ClassNames.title}>{Title}</h1>
            <h3 className={ClassNames.subtitle}>{Subtitle}</h3>
          </foreignObject>
        </animated.svg>
        <animated.svg
          className={ClassNames.doodle}
          style={{
            opacity: to([cardAnim.isTop], (isTop) => isTop),
          }}
        >
          <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
            <Doodle />
          </foreignObject>
        </animated.svg>
      </>
    );
  },
});

export default PjtDesc;
