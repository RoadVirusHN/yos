import { type CardComponentData, type PjtCardData } from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { animated, to } from "react-spring";
import { type BandStatus } from "@customTypes/Card";
import { CardSideEnum } from "@data/Enums";
import ClassNames from "./PjtCommon.module.scss";
import { filt } from "@utils/MyAnimation";
import PublicSVG from "@lib/SVG/PublicSVG";
import { useGesture } from "@use-gesture/react";

const PjtBandMapper = (status: BandStatus) => {
  return <PublicSVG href={`commons/bands/${status as string}.svg`} />;
};
const PjtCommon = (pjtInfo: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({
    cardData,
    cardAnimController,
    deckAnimAPI,
  }: CardComponentProps<PjtCardData>) => {
    const bind = useGesture(
      {
        onDrag: ({ tap, event }) => {
          event.stopPropagation();
          if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
            if (tap) {
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
    const [cardAnim] = [cardAnimController.AnimStates.AnimAPI.AnimValues];
    const { gray, blur } = cardAnim;

    return (
      <>
        <animated.div
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.front}`}
          style={{
            filter: to([gray, blur], filt),
          }}
          draggable={false}
          {...bind()}
        >
          <PublicSVG href={`commons/bands/DEFAULT.svg`} />
        </animated.div>
        <animated.div
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.back}`}
          style={{
            filter: to([gray, blur], filt),
          }}
          draggable={false}
          {...bind()}
        >
          {PjtBandMapper(cardData.CommonFace.Status)}
        </animated.div>
      </>
    );
  },
});
export default PjtCommon;
