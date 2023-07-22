import { CardComponentProps } from "src/components/CardTypes/Card";
import ClassNames from "./TutoFront.module.scss";
import { animated, to } from "react-spring";
import { CardComponentData, TutoCardData } from "src/data/CardProcessors";
import { filt } from "src/utils/MyAnimation";
import { useRef } from "react";

const TutoFront = (
  tutoInfo: TutoCardData
): CardComponentData<"FrontFace", TutoCardData> => ({
  Data: tutoInfo.FrontFace,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <animated.div
        className={`${ClassNames.front} ${ClassNames.face}`}
        style={{
          filter: to(
            [
              cardAnimController.cardAnimAPI.cardAnim.gray,
              cardAnimController.cardAnimAPI.cardAnim.blur,
            ],
            filt
          ),
          content: to(
            [cardAnimController.deckAnimAPI.deckAnim.order],
            (order) => {
              if (order[1] === cardData.Index) {
                (ref.current as HTMLDivElement).innerText = "TAHNK YOU!";
              }
              return "";
            }
          ),
        }}
      >
        <div className={ClassNames.container}>
          <div ref={ref} className={ClassNames.portfolio}>
            <div style={{ fontSize: "40%", lineHeight: "20%" }}>THE</div>
            LUXURIST
          </div>
          <div className={ClassNames.name}>JUNSEOK-YUN PORTFOLIO</div>
        </div>
      </animated.div>
    );
  },
});
export default TutoFront;
