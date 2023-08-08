import { type CardComponentData, type PjtCardData } from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { useState } from "react";
import { animated, to } from "react-spring";
import { type BandStatus } from "@customTypes/Card";
import { CardSideEnum } from "@data/enums/enums";
import ClassNames from "./PjtCommon.module.scss";
import { filt } from "@utils/MyAnimation";
import PublicSVG from "@lib/SVG/PublicSVG";

const PjtBandMapper = (status: BandStatus, newHandler: Record<string, any>) => {
  return (
    <PublicSVG {...newHandler} href={`commons/bands/${status as string}.svg`} />
  );
};
const PjtCommon = (pjtInfo: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI,
  }: CardComponentProps<PjtCardData>) => {
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
      <animated.div
        className={ClassNames.band}
        style={{
          filter: to([gray, blur], filt),
        }}
        {...newHandler}
        draggable="false"
      >
        {side === CardSideEnum.FRONT ? (
          <PublicSVG href={`commons/bands/DEFAULT.svg`} />
        ) : (
          PjtBandMapper(cardData.CommonFace.Status, newHandler)
        )}
      </animated.div>
    );
  },
});
export default PjtCommon;
