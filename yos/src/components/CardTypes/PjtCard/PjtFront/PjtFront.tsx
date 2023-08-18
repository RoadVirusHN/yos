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
  Component: ({
    cardData,
    deckAnimController,
  }: CardComponentProps<PjtCardData>) => {
    const [techStacks, _] = useState(cardData.FrontFace.TechStacks);
    return (
      <>
        <AnimatedReactPlayer
          className={ClassNames.preview}
          width="100%"
          height="80%"
          url={cardData.FrontFace.VideoURL}
          draggable={false}
          // onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} // for user who intend to control video, not pick the card
          light={
            <img
              style={{
                height: "100%",
                aspectRatio: 1,
                filter: "blur(2px)",
              }}
              src={cardData.FrontFace.PreviewImage}
              alt="Thumbnail"
              draggable={false}
            />
          } //image for previewing
          playing={to(
            [deckAnimController.AnimStates.AnimAPI.AnimValues.order],
            (order: number[]) => order.at(-1) === cardData.Index
          )}
          muted // for auto playing
          loop
          controls
        />
        <TechStacks tags={techStacks} />
      </>
    );
  },
});
export default PjtFront;
