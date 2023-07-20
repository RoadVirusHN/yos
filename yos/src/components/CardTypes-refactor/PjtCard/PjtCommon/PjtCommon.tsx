import { CardComponentData, IndexedCardData } from "src/data/CardProcessors";
import { CardComponentProps } from "src/components/CardTypes-refactor/Card";
import { useState } from "react";
import { animated, to } from "react-spring";
import { ReactComponent as Default } from "src/assets/img/cards/bands/DEFAULT.svg";
import { ReactComponent as InProgress } from "src/assets/img/cards/bands/INPROGRESS.svg";
import { ReactComponent as DONE } from "src/assets/img/cards/bands/DONE.svg";
import { ReactComponent as DROPPED } from "src/assets/img/cards/bands/DROPPED.svg";
import { ReactComponent as POSTPONED } from "src/assets/img/cards/bands/POSTPONED.svg";
import { BandStatus } from "@customTypes/Card";
import { BandEnum } from "src/data/enums/enums";
import ClassNames from "./PjtCommon.module.scss";
import { filt } from "src/utils/MyAnimation";

const PjtBandMapper = (
  status: BandStatus,
  newHandler: { [onEvent: string]: any }
) => {
  switch (status) {
    case BandEnum.INPROGRESS:
      return <InProgress {...newHandler} />;
    case BandEnum.DROPPED:
      return <DROPPED {...newHandler} />;
    case BandEnum.POSTPONED:
      return <POSTPONED {...newHandler} />;
    case BandEnum.DONE:
      return <DONE {...newHandler} />;
    default:
      return <Default {...newHandler} />;
  }
};
const PjtCommon = (
  pjtInfo: IndexedCardData
): CardComponentData<"CommonFace"> => ({
  data: pjtInfo.CommonFace,
  Component: ({ indexedCardData, cardAnimController }: CardComponentProps) => {
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
        if (deckAnimAPI.deckAnim.order.get().at(-1) === indexedCardData.index) {
          cardAnimController.flipCardAnim(cardAnimController);
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
      <animated.div
        className={ClassNames.band}
        style={{
          filter: to([gray, blur], filt),
        }}
        draggable="false"
      >
        {side === "front" ? (
          <Default {...newHandler} />
        ) : (
          PjtBandMapper(indexedCardData.CommonFace.Status, newHandler)
        )}
      </animated.div>
    );
  },
});
export default PjtCommon;
