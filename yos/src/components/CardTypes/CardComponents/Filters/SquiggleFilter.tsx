import { animated, useSpring } from 'react-spring';
const AnimFeTurbulence = animated('feTurbulence');
const AnimFeDisplacementMap = animated('feDisplacementMap');

const SquiggleFilter = () => {
  const { seed, scale } = useSpring({
    from: { seed: 0, scale: 6 },
    to: [
      {
        seed: 1,
        scale: 8
      },
      {
        seed: 2,
        scale: 6
      },
      {
        seed: 3,
        scale: 8
      },
      {
        seed: 4,
        scale: 6
      },
      {
        seed: 5,
        scale: 8
      }
    ],
    loop: true,
    immediate: true,
    config: { duration: 110, tension: 420, friction: 10 }
  });
  return (
    <animated.svg style={{ width: '0', height: '0', position: 'absolute' }}>
      <defs>
        <filter id="squiggly">
          <AnimFeTurbulence
            id="turbulence"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
            seed={seed}
          />
          <AnimFeDisplacementMap
            id="displacement"
            in="SourceGraphic"
            in2="noise"
            scale={scale}
          />
        </filter>
      </defs>
    </animated.svg>
  );
};
export default SquiggleFilter;
