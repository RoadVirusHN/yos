import { useEffect } from 'react';
import { useSpring } from 'react-spring';

const DEFAULT_DURATION = 8000;
const FAST_DURATION = 2000; // less time to animate == faster animation
const useCreateHandlers = () => {
  const [props, api] = useSpring(() => ({ x: 0 }));

  useEffect(() => {
    api.start({
      from: { x: 0 },
      to: { x: 50 },
      loop: true,
      config: { duration: DEFAULT_DURATION } // duration of **EACH STEP OF ANIM**;
    });
  }, [api]);

  const onMouseMove = (e: React.MouseEvent) => {
    const currentRect = (
      e.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const localX = e.clientX - currentRect.x;
    const percent = (localX - currentRect.width / 2) / (currentRect.width / 2);
    const direction = percent < 0; // true to right, false to left
    const currentX = props.x.get();
    const duration = FAST_DURATION / Math.max(Math.abs(percent), 0.001);

    api.start({
      from: { x: currentX },
      to: [
        {
          x: direction ? 0 : 50,
          config: {
            duration: (duration * (direction ? currentX : 50 - currentX)) / 50
          }
        },
        { x: direction ? 50 : 0, immediate: true },
        {
          x: currentX,
          config: {
            duration: (duration * (direction ? 50 - currentX : currentX)) / 50
          }
        }
      ],
      loop: true
    });
  };

  const onMouseLeave = (_e: React.MouseEvent) => {
    // set anim to inital state
    const currentX = props.x.get();
    api.start({
      from: { x: currentX },
      to: [
        {
          x: 50,
          config: {
            duration: (DEFAULT_DURATION * (50 - currentX)) / 50
          }
        },
        { x: 0, immediate: true },
        {
          x: currentX,
          config: {
            duration: (DEFAULT_DURATION * currentX) / 50
          }
        }
      ],
      loop: true
    });
  };

  return { onMouseMove, onMouseLeave, x: props.x };
};

export default useCreateHandlers;
