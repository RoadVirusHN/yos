import { type CardComponentProps } from "@components/CardTypes/Card";
import ClassNames from "./PjtFront.module.scss";
import { animated, to } from "react-spring";
import ReactPlayer from "react-player/lazy";
import TechStacks from "@components/InfinityLoopSlider/InfinityLoopSlider";
import { type CardComponentData, type PjtCardData } from "@data/CardProcessors";
import { useState } from "react";
/**
 * !!!todos
 *- Youtube Embeded player hovering problem => Card animations are stopping.
 *- ResizeObserver loop problem.
 */
const AnimatedReactPlayer = animated(ReactPlayer);
const PjtFront = (pjtInfo: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtInfo.FrontFace,
  Component: ({ cardData, deckAnimAPI }: CardComponentProps<PjtCardData>) => {
    const [techStacks, _] = useState(cardData.FrontFace.TechStacks);

    return (
      <>
        <AnimatedReactPlayer
          className={ClassNames.preview}
          width="100%"
          height="80%"
          url={cardData.FrontFace.VideoURL}
          // onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} // for user who intend to control video, not pick the card
          loop
          controls
          playing={to(
            [deckAnimAPI.deckAnim.order],
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
