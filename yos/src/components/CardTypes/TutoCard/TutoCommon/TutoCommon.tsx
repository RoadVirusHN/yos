import {
  type CardComponentData,
  type TutoCardData,
} from "src/data/CardProcessors";
import { type CardComponentProps } from "src/components/CardTypes/Card";
import { useState } from "react";
import { animated, to } from "react-spring";
import ClassNames from "./TutoCommon.module.scss";
import { filt } from "src/utils/MyAnimation";
import { CardSideEnum } from "src/data/enums/enums";
import PublicSVG from "src/components/PublicSVG";

const TutoCommon = (
  pjtInfo: TutoCardData
): CardComponentData<TutoCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI,
  }: CardComponentProps) => {
    const [side, setSide] = useState(CardSideEnum.FRONT);

    const defaultPreventor = (e: React.MouseEvent) => {
      e.preventDefault();
    };
    const [cardAnim] = [cardAnimController.AnimStates.AnimAPI.AnimValues];
    const beforeBandMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.button === 0) {
        if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
          if (cardAnim.side.get() === CardSideEnum.FRONT) {
            void cardAnimController.TransitionTo.StateBack();
          } else {
            void cardAnimController.TransitionTo.StateFront();
          }
        }
      }
      return cardAnim.side.get();
    };
    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSide(beforeBandMouseDown(e));
    };
    const { gray, blur } = cardAnim;
    const newHandler = {
      onMouseDown,
      onDragOver: defaultPreventor,
      onDragStart: defaultPreventor,
    };
    return (
      <>
        {side === "front" ? (
          <animated.span
            className={ClassNames.indicator}
            style={{ filter: to([gray, blur], filt) }}
          >
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
          {...newHandler}
        >
          <PublicSVG
            width="168"
            height="168"
            href={`bands/${
              side === CardSideEnum.FRONT ? "TUTODEFAULT" : "TUTORIAL"
            }.svg`}
          />
        </animated.div>
      </>
    );
  },
});
export default TutoCommon;
