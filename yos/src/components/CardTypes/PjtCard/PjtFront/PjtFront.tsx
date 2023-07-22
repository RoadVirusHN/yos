import { CardComponentProps } from "src/components/CardTypes/Card";
import ClassNames from "./PjtFront.module.scss";
import { animated, to } from "react-spring";
import ReactPlayer from "react-player/lazy";
import TechStacks from "src/components/InfinityLoopSlider/InfinityLoopSlider";
import { CardComponentData, PjtCardData } from "src/data/CardProcessors";
import prv from "../../../../assets/img/cards/previews/test-big.webm";
import { useState } from "react";
/**
 * !!!todos
 *- Youtube Embeded player hovering problem => Card animations are stopping.
 *- ResizeObserver loop problem.
 */
const AnimatedReactPlayer = animated(ReactPlayer);
const PjtFront = (
  pjtInfo: PjtCardData
): CardComponentData<"FrontFace", PjtCardData> => ({
  Data: pjtInfo.FrontFace,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const [techStacks, _] = useState(
      (cardData as PjtCardData).FrontFace.TechStacks
    );
    return (
      <>
        <AnimatedReactPlayer
          className={ClassNames.preview}
          width="100%"
          height="80%"
          url={prv}
          //onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} // for user who intend to control video, not pick the card
          loop
          controls
          playing={to(
            [cardAnimController.deckAnimAPI.deckAnim.order],
            (order: number[]) => order.at(-1) === cardData.Index
          )}
          muted
        />
        <TechStacks tags={techStacks} />
      </>
    );
  },
});
export default PjtFront;
