import { CardComponentData, TutoCardData } from "src/data/CardProcessors";
import { CardComponentProps } from "src/components/CardTypes/Card";
import { animated } from "react-spring";
import BackTexture from "src/assets/img/cards/doodles/tutoBack/cardboard.webp";
import ClassNames from "./TutoBack.module.scss";
import { useRef, useState, useEffect } from "react";
import TutoBackInfo from "./TutoBackInfo";

const TutoBack = (
  tutoInfo: TutoCardData
): CardComponentData<"BackFace", TutoCardData> => ({
  Data: tutoInfo.BackFace,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
      setWidth(ref.current ? ref.current.clientWidth : 0);
      setHeight(ref.current ? ref.current.clientHeight : 0);
      cardAnimController.cardAnimAPI.setCardAnim.set({ shadow: false });
    }, []);
    return (
      <animated.div
        ref={ref}
        className={ClassNames.backgroundContainer}
        style={{
          backgroundImage: `url(${BackTexture})`,
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
      >
        <TutoBackInfo
          width={height}
          height={height}
          backInfo={cardData.BackFace as { Src: string }}
        />
      </animated.div>
    );
  },
});
export default TutoBack;
