import { CardComponentData, IndexedCardData } from "src/data/CardProcessors";
import { CardComponentProps } from "src/components/CardTypes-refactor//Card";
import BackInfo from "./BackInfo";
import { animated } from "react-spring";
import BackTexture from "src/assets/img/cards/cardBack-min.jpg";
import ClassNames from "./PjtBack.module.scss";
import { useRef, useState, useEffect } from "react";

const PjtBack = (pjtInfo: IndexedCardData): CardComponentData<"BackFace"> => ({
  data: pjtInfo.BackFace,
  Component: ({ indexedCardData }: CardComponentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
      setWidth(ref.current ? ref.current.clientWidth : 0);
      setHeight(ref.current ? ref.current.clientHeight : 0);
    });
    return (
      <animated.div
        ref={ref}
        className={ClassNames.backgroundContainer}
        style={{
          backgroundImage: `url(${BackTexture})`,
        }}
      >
        <BackInfo
          backInfo={indexedCardData.BackFace}
          width={width}
          height={height}
        />
      </animated.div>
    );
  },
});
export default PjtBack;
