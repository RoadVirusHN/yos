import { type CardComponentProps } from "@components/CardTypes/Card";
import { animated } from "@react-spring/web";
import ClassNames from "./PjtDesc.module.scss";
import { type CardComponentData, type PjtCardData } from "@data/CardProcessors";

interface DescData {
  Title: string;
  Subtitle: string;
  Doodle: () => JSX.Element;
}

const PjtDesc = (pjtData: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtData.Description,
  Component: ({
    cardData,
    cardAnimController,
  }: CardComponentProps<PjtCardData>) => {
    const { Title, Subtitle, Doodle } = cardData.Description as DescData;
    const { isTop } = cardAnimController.AnimStates.AnimValues;
    return (
      <>
        <animated.svg
          className={ClassNames.doodleTitle}
          style={{
            opacity: isTop,
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
            opacity: isTop
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
