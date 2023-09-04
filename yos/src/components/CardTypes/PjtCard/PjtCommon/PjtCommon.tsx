import { type CardComponentData, type PjtCardData } from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { animated, to } from "@react-spring/web";
import { type BandStatus } from "@customTypes/Card";
import { CardSideEnum } from "@data/Enums";
import ClassNames from "./PjtCommon.module.scss";
import { filt } from "@utils/MyAnimation";
import PublicSVG from "@lib/SVG/PublicSVG";
import { useDrag } from "@use-gesture/react";

const PjtBandMapper = (status: BandStatus) => {
  return <PublicSVG href={`commons/bands/${status as string}.svg`} />;
};
const PjtCommon = (pjtInfo: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtInfo.CommonFace,
  Component: ({
    cardData,
    cardAnimController
  }: CardComponentProps<PjtCardData>) => {
    const bind = useDrag(
      ({ tap, event }) => {
        event.stopPropagation();
        if (cardAnimController.AnimStates.AnimValues.isTop.get() && tap) {
          if (
            cardAnimController.AnimStates.AnimValues.side.get() ===
            CardSideEnum.FRONT
          ) {
            void cardAnimController.TransitionTo.StateBack();
          } else {
            void cardAnimController.TransitionTo.StateFront();
          }
        }
      },
      { filterTaps: true, preventDefault: true }
    );
    const { gray, blur } = cardAnimController.AnimStates.AnimValues;

    return (
      <>
        <animated.div
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.front}`}
          style={{
            filter: to([gray, blur], filt),
          }}
          draggable={false}
        >
          <div className={ClassNames.clickMask} {...bind()} />
          <PublicSVG href={`commons/bands/DEFAULT.svg`} />
        </animated.div>
        <animated.div
          className={`${ClassNames.band} ${ClassNames.face} ${ClassNames.back}`}
          style={{
            filter: to([gray, blur], filt),
          }}
          draggable={false}
        >
          <div className={ClassNames.clickMask} {...bind()} />
          {PjtBandMapper(cardData.CommonFace.Status)}
        </animated.div>
      </>
    );
  },
});
export default PjtCommon;
