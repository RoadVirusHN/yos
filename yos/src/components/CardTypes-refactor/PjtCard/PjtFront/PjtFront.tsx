import { CardComponentProps } from "src/components/CardTypes-refactor/Card";
import ClassNames from "./PjtFront.module.scss";
import { animated, to } from "react-spring";
import ReactPlayer from "react-player/lazy";
import TechStacks from "src/components/InfinityLoopSlider/InfinityLoopSlider";
import { CardComponentData, IndexedCardData } from "src/data/CardProcessors";
/**
 * !!!todos
 *- Youtube Embeded player hovering problem => Card animations are stopping.
 *- ResizeObserver loop problem.
 */
const AnimatedReactPlayer = animated(ReactPlayer);
const PjtFront = (
  pjtInfo: IndexedCardData
): CardComponentData<"FrontFace"> => ({
  data: pjtInfo.FrontFace,
  Component: ({ indexedCardData, cardAnimController }: CardComponentProps) => {
    return (
      <>
        <AnimatedReactPlayer
          className={ClassNames.preview}
          width="100%"
          height="80%"
          url={indexedCardData.FrontFace.VideoURL}
          //onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} // for user who intend to control video, not pick the card
          loop
          controls
          playing={to(
            [cardAnimController.deckAnimAPI.deckAnim.order],
            (order: number[]) => order[0] === indexedCardData.index
          )}
          muted
        />
        <TechStacks tags={indexedCardData.FrontFace.TechStacks} />
      </>
    );
  },
});
export default PjtFront;
