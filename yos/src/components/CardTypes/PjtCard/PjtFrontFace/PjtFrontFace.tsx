import { filt } from "src/utils/MyAnimation";
import ClassNames from "./PjtFrontFace.module.scss";
import { SpringValue, animated, to } from "react-spring";
import TechStacks from "src/components/InfinityLoopSlider/InfinityLoopSlider";
import ReactPlayer from "react-player/lazy";
/**
 * !!!todos
 *- Youtube Embeded player hovering problem => Card animations are stopping.
 *- ResizeObserver loop problem.
 */
const AnimatedReactPlayer = animated(ReactPlayer);

const PjtFrontFace = ({
  frontInfo,
  gray,
  blur,
  isTop,
}: {
  frontInfo: {
    preview: string;
    techs: string[];
  };
  gray: SpringValue<number>;
  blur: SpringValue<number>;
  isTop: SpringValue<number>;
}) => {
  return (
    <animated.div
      className={`${ClassNames.front} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
      }}
    >
      <AnimatedReactPlayer
        className={ClassNames.preview}
        width="100%"
        height="80%"
        url={frontInfo.preview}
        //onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} // for user who intend to control video, not pick the card
        loop
        controls
        playing={isTop.to((v) => v === 1) as unknown as boolean}
        muted
      />
      <TechStacks tags={frontInfo.techs} />
    </animated.div>
  );
};

export default PjtFrontFace;
