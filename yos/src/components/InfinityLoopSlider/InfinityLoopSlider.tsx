import { Fragment } from "react";
import ClassNames from "./InfinityLoopSlider.module.scss";
import { animated } from "react-spring";
import { range } from "src/utils/MyArray";
import useCreateHandlers from "./useCreateHandlers";
import Tag from "./Tag";

/**
 * cool slide effect! : https://codepen.io/ykadosh/pen/KKezJzz
 */
function repeatTags(tags: string[], sliderLength: number, tagLength: number) {
  // repeat tags for circular animation.
  const repeatNumber = Math.ceil(
    (sliderLength * 2) / (tagLength * tags.length)
  );

  return range(repeatNumber).map((k) => {
    return (
      <Fragment key={k}>
        {tags.map((name, i) => (
          <Tag key={i} text={name} />
        ))}
        {tags.map((name, i) => (
          <Tag key={k * i + i} text={name} /> // for showing tags after translate belt -50%
        ))}
      </Fragment>
    );
  });
}

const InfiniteLoopSlider = ({ tags }: { tags: string[] }) => {
  const { onMouseMove, onMouseLeave, x } = useCreateHandlers();
  return (
    <div className={ClassNames.sliderContainer}>
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={ClassNames.loopSlider}
      >
        <animated.div
          className={ClassNames.belt}
          style={{ transform: x.to((x) => `translateX(-${x}%)`) }}
        >
          {repeatTags(tags, 2, 1)}
        </animated.div>
      </div>
      <div className={ClassNames.fade} />
    </div>
  );
};

export default InfiniteLoopSlider;
