import { CardComponentProps } from "src/components/CardTypes-refactor/Card";
import { animated, to, useSpringValue } from "react-spring";
import ClassNames from "./PjtDesc.module.scss";
import { CardComponentData, IndexedCardData } from "src/data/CardProcessors";
import { useEffect, useState } from "react";

const PjtDesc = (
  pjtData: IndexedCardData
): CardComponentData<"Description"> => ({
  data: pjtData.Description,
  Component: ({ indexedCardData, cardAnimController }: CardComponentProps) => {
    const { Title, Subtitle, Doodle } = indexedCardData.Description;
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
