import { animated, useSpring } from 'react-spring';
import { ReactComponent as Anim1 } from './anim1.svg';
import { ReactComponent as Anim2 } from './anim2.svg';
import { ReactComponent as Instruction } from './instruction.svg';
import { useEffect } from 'react';
const TutoBack = () => {
  const [props, api] = useSpring(() => ({ opacity1: 1, opacity2: 0 }));
  useEffect(() => {
    // you cannot call `set` or `start with immediate prop` while rendering.
    // so use `useEffect`
    api.start({
      from: { opacity1: 1, opacity2: 0 },
      to: { opacity1: 0, opacity2: 1 },
      loop: { reverse: true, delay: 1000 },
      immediate: true
    });
  }, [api]);
  return (
    <svg
      filter="url(#squiggly) drop-shadow(2px 2px 3px rgba(50, 50, 50, 0.7))"
      viewBox="-5 -5 113 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="back">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
            <h1>Click Again to go back!</h1>
          </foreignObject>
        </svg>
        <Instruction />
        <g id="BackDoodle">
          <animated.g id="anim1" style={{ opacity: props.opacity1 }}>
            <Anim1 />
          </animated.g>
          <animated.g id="anim2" style={{ opacity: props.opacity2 }}>
            <Anim2 />
          </animated.g>
        </g>
      </g>
    </svg>
  );
};

export default TutoBack;
