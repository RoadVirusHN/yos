import {
  type CardComponentData,
  type TutoCardData,
} from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { useState } from "react";
import { animated, to } from "@react-spring/web";
import ClassNames from "./TutoCommon.module.scss";
import { shadowFilt, filt } from "@utils/MyAnimation";
import { CardSideEnum } from "@data/Enums";
import PublicSVG from "@lib/SVG/PublicSVG";
import { useDrag } from "@use-gesture/react";

const TutoCommon = (
  pjtInfo: TutoCardData
): CardComponentData<TutoCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({ cardAnimController }: CardComponentProps<TutoCardData>) => {
    const [side, setSide] = useState(CardSideEnum.FRONT);
    const bind = useDrag(
      ({ tap, event }) => {
        event.stopPropagation();
        if (cardAnimController.AnimStates.AnimValues.isTop.get() && tap) {
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
      },
      { filterTaps: true, preventDefault: true }
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
            filter: to([gray, blur], shadowFilt),
          }}
          draggable={false}
        >
          <div className={ClassNames.clickMask} {...bind()} />
          <PublicSVG href={`commons/bands/DEFAULT.svg`} />
        </animated.div>
        <animated.div
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.back}`}
          style={{
            filter: to([gray, blur], shadowFilt),
          }}
          draggable={false}
        >
          <div className={ClassNames.clickMask} {...bind()} />
          <PublicSVG href={`commons/bands/TUTORIAL.svg`} />
        </animated.div>
      </>
    );
  },
});
export default TutoCommon;
