import { Fragment } from "react";
import ClassNames from "./InfinityLoopSlider.module.scss";
import { animated } from "react-spring";
import { range } from "@utils/MyArray";
import useCreateHandlers from "./useCreateHandlers";
import Tag from "./Tag";
export interface TagType {
  tagName: string;
  color?: string;
}
/**
 * cool slide effect! : https://codepen.io/ykadosh/pen/KKezJzz
 */
function repeatTags(tags: TagType[], sliderLength: number, tagLength: number) {
  // repeat tags for circular animation.
  const repeatNumber = Math.ceil(
    (sliderLength * 2) / (tagLength * tags.length)
  );

  return range(repeatNumber).map((k) => {
    return (
      <Fragment key={k}>
        {tags.map(({ tagName, color }, i) => (
          <Tag key={i} text={tagName} color={color ?? undefined} />
        ))}
        {tags.map(({ tagName, color }, i) => (
          <Tag key={k * i + i} text={tagName} color={color ?? undefined} /> // for showing tags after translate belt -50%
        ))}
      </Fragment>
    );
  });
}

const InfiniteLoopSlider = ({ tags }: { tags: TagType[] }) => {
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
          {repeatTags(tags, 3, 1)}
        </animated.div>
      </div>
      <div className={ClassNames.fade} />
    </div>
  );
};

export default InfiniteLoopSlider;
