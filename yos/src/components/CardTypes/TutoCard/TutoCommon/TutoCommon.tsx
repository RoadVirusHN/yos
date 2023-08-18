import {
  type CardComponentData,
  type TutoCardData,
} from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { useState } from "react";
import { animated, to } from "react-spring";
import ClassNames from "./TutoCommon.module.scss";
import { faceFilt, filt } from "@utils/MyAnimation";
import { CardSideEnum } from "@data/Enums";
import PublicSVG from "@lib/SVG/PublicSVG";
import { useGesture } from "@use-gesture/react";

const TutoCommon = (
  pjtInfo: TutoCardData
): CardComponentData<TutoCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimController,
  }: CardComponentProps<TutoCardData>) => {
    const [side, setSide] = useState(CardSideEnum.FRONT);
    const bind = useGesture(
      {
        onDrag: ({ tap, event }) => {
          event.stopPropagation();
          if (
            deckAnimController.AnimStates.AnimValues.order.get().at(-1) ===
            cardData.Index
          ) {
            if (tap) {
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
        },
      },
      { drag: { filterTaps: true, preventDefault: true } }
    );
    const [cardAnim] = [cardAnimController.AnimStates.AnimValues];
    const { gray, blur } = cardAnim;
    return (
      <>
        {side === CardSideEnum.FRONT ? (
          <animated.span
            className={ClassNames.indicator}
            style={{
              filter: to([gray, blur], filt),
              content: to(side, (_side) => {
                return "";
              }),
            }}
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
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.front}`}
          style={{
            filter: to([gray, blur], faceFilt),
          }}
          draggable={false}
          {...bind()}
        >
          <PublicSVG href={`commons/bands/DEFAULT.svg`} />
        </animated.div>
        <animated.div
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.back}`}
          style={{
            filter: to([gray, blur], faceFilt),
          }}
          draggable={false}
          {...bind()}
        >
          <PublicSVG href={`commons/bands/TUTORIAL.svg`} />
        </animated.div>
      </>
    );
  },
});
export default TutoCommon;
