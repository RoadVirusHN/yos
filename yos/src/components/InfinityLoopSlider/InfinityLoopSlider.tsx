import React, { Fragment, useEffect } from "react";
import ClassNames from "./InfinityLoopSlider.module.scss";
import { animated, useSpring } from "react-spring";
/**
 * cool slide effect! : https://codepen.io/ykadosh/pen/KKezJzz
 */

const Tag = ({ text }: { text: string }) => (
  <div className={ClassNames.tag}>
    <span>#</span> {text}
  </div>
);
const DEFAULT_DURATION = 8000;
const FAST_DURATION = 2000;
const InfiniteLoopSlider = ({ tags }: { tags: string[] }) => {
  const [props, api] = useSpring(() => ({ x: 0 }));
  useEffect(() => {
    api.start({
      from: { x: 0 },
      to: { x: 50 },
      loop: true,
      config: { duration: DEFAULT_DURATION }, // duration of **EACH STEP OF ANIM**;
    });
  }, []);

  const onMouseOver = (e: React.MouseEvent) => {
    const currentRect = (
      e.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const localX = e.clientX - currentRect.x;
    const percent = (localX - currentRect.width / 2) / (currentRect.width / 2);
    const reverse = percent < 0;
    const currentX = props.x.get();
    const duration = FAST_DURATION / Math.max(Math.abs(percent), 0.001);

    api.start({
      from: { x: currentX },
      to: [
        {
          x: reverse ? 0 : 50,
          config: {
            duration: (duration * (reverse ? currentX : 50 - currentX)) / 50,
          },
        },
        { x: reverse ? 50 : 0, immediate: true },
        {
          x: currentX,
          config: {
            duration: (duration * (reverse ? 50 - currentX : currentX)) / 50,
          },
        },
      ],
      loop: true,
    });
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    const currentX = props.x.get();
    api.start({
      from: { x: currentX },
      to: [
        {
          x: 50,
          config: {
            duration: (DEFAULT_DURATION * (50 - currentX)) / 50,
          },
        },
        { x: 0, immediate: true },
        {
          x: currentX,
          config: {
            duration: (DEFAULT_DURATION * currentX) / 50,
          },
        },
      ],
      loop: true,
    });
  };
  const { x } = props;
  return (
    <div className={ClassNames.sliderContainer}>
      <div
        onMouseMove={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={ClassNames.loopSlider}
      >
        <animated.div
          className={ClassNames.belt}
          style={{ transform: x.to((x) => `translateX(-${x}%)`) }}
        >
          {Array.from(
            Array(Math.ceil(window.innerWidth / 250 / tags.length)).keys()
          ).map((k) => {
            return (
              <Fragment key={k}>
                {tags.map((name, i) => (
                  <Tag key={i} text={name} />
                ))}
                {tags.map((name, i) => (
                  <Tag key={k * i + i} text={name} />
                ))}
              </Fragment>
            );
          })}
        </animated.div>
      </div>
      <div className={ClassNames.fade} />
    </div>
  );
};

export default InfiniteLoopSlider;
