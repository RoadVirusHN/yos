import { CardComponentProps } from "src/components/CardTypes/Card";
import { animated, to } from "react-spring";
import ClassNames from "./PjtDesc.module.scss";
import { CardComponentData, PjtCardData } from "src/data/CardProcessors";
import { useEffect, useState } from "react";

type DescData = { Title: string; Subtitle: string; Doodle: string };

const PjtDesc = (
  pjtData: PjtCardData
): CardComponentData<"Description", PjtCardData> => ({
  Data: pjtData.Description,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const { Title, Subtitle, Doodle } = cardData.Description as DescData;
    const [DoodleComponent, setDoodle] = useState<() => JSX.Element>();
    useEffect(() => {
      const dynamicImport = import(
        "../../../../assets/img/cards/pjtDoodles/SampleDoodle"
      );

      dynamicImport.then((module) => {
        const YourComponent = module.default || module;
        setDoodle(() => YourComponent);
      });
    });

    return (
      <>
        <animated.svg
          className={ClassNames.doodleTitle}
          style={{
            opacity: to(
              [cardAnimController.cardAnimAPI.cardAnim.isTop],
              (isTop) => isTop
            ),
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
            opacity: to(
              [cardAnimController.cardAnimAPI.cardAnim.isTop],
              (isTop) => isTop
            ),
          }}
        >
          <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
            {DoodleComponent ? <DoodleComponent /> : <div>Loading...</div>}
          </foreignObject>
        </animated.svg>
      </>
    );
  },
});

export default PjtDesc;
