import {
  type CardComponentData,
  type TutoCardData,
} from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { useState } from "react";
import { animated, to } from "react-spring";
import ClassNames from "./TutoCommon.module.scss";
import { filt } from "@utils/MyAnimation";
import { CardSideEnum } from "@data/Enums";
import PublicSVG from "@lib/SVG/PublicSVG";

const TutoCommon = (
  pjtInfo: TutoCardData
): CardComponentData<TutoCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI,
  }: CardComponentProps<TutoCardData>) => {
    const [side, setSide] = useState(CardSideEnum.FRONT);

    const defaultPreventor = (e: React.MouseEvent) => {
      e.preventDefault();
    };
    const [cardAnim] = [cardAnimController.AnimStates.AnimAPI.AnimValues];
    const beforeBandMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.button === 0) {
        if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
          // !!!TODO : Make band two sided div like card to get better ux.
          setSide(
            cardAnim.side.get() === CardSideEnum.FRONT
              ? CardSideEnum.BACK
              : CardSideEnum.FRONT
          );
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
      beforeBandMouseDown(e);
    };
    const { gray, blur } = cardAnim;
    const newHandler = {
      onMouseDown,
      onDragOver: defaultPreventor,
      onDragStart: defaultPreventor,
    };
    return (
      <>
        {side === CardSideEnum.FRONT ? (
          <animated.span
            className={ClassNames.indicator}
            style={{ filter: to([gray, blur], filt), content: to(side, side=>{
              return ""
            }) }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              DO NOT <br /> CLICK IT
            </span>
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}> →</span>
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
            href={`commons/bands/${
              side === CardSideEnum.FRONT ? "TUTODEFAULT" : "TUTORIAL"
            }.svg`}
          />
        </animated.div>
      </>
    );
  },
});
export default TutoCommon;
