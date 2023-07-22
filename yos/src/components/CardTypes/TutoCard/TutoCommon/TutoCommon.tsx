import { CardComponentData, TutoCardData } from "src/data/CardProcessors";
import { CardComponentProps } from "src/components/CardTypes/Card";
import { useState } from "react";
import { animated, to } from "react-spring";
import { ReactComponent as TUTORIAL } from "src/assets/img/cards/bands/TUTORIAL.svg";
import { ReactComponent as TUTODEFAULT } from "src/assets/img/cards/bands/TUTODEFAULT.svg";
import ClassNames from "./TutoCommon.module.scss";
import { filt } from "src/utils/MyAnimation";

const TutoCommon = (
  pjtInfo: TutoCardData
): CardComponentData<"CommonFace", TutoCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const [side, setSide] = useState("front");

    const defaultPreventor = (e: React.MouseEvent) => {
      e.preventDefault();
    };
    const [cardAnimAPI, deckAnimAPI] = [
      cardAnimController.cardAnimAPI,
      cardAnimController.deckAnimAPI,
    ];
    const beforeBandMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.button === 0) {
        if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
          cardAnimController.flipCardAnim();
        }
      }
      return cardAnimAPI.cardAnim.side.get();
    };
    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSide(beforeBandMouseDown(e));
    };
    const { gray, blur } = cardAnimAPI.cardAnim;
    const newHandler = {
      onMouseDown,
      onDragOver: defaultPreventor,
      onDragStart: defaultPreventor,
    };
    return (
      <>
        {side === "front" ? (
          <animated.span className={ClassNames.indicator} style={{filter: to([gray, blur], filt)}}>
            <span>
              DO NOT <br /> CLICK IT
            </span>
            <span style={{ fontSize: "180%", fontWeight: "bold" }}> →</span>
          </animated.span>
        ) : (
          ""
        )}
        <animated.div
          className={ClassNames.band}
          style={{
            filter: to([gray, blur], filt),
          }}
          draggable="false"
        >
          {side === "front" ? (
            <TUTODEFAULT {...newHandler} />
          ) : (
            <TUTORIAL {...newHandler} />
          )}
        </animated.div>
      </>
    );
  },
});
export default TutoCommon;
