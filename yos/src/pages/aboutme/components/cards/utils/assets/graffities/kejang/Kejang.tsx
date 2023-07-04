import { ReactComponent as Kejang0 } from "./kejang-stand.svg";
import { ReactComponent as Kejang1 } from "./kejang-jump.svg";
import { ReactComponent as Ballonword } from "./balloonword.svg";
import { animated, useSpring } from "react-spring";

const Kejang = () => {
  const props = useSpring({
    from: { opacity1: 1, opacity2: 0 },
    to: { opacity1: 0, opacity2: 1 },
    loop: true,
    immediate: true,
    delay: 1000,
  });

  return (
    <div>
      <animated.svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <Ballonword />
      </animated.svg>
      <animated.svg
        style={{
          opacity: props.opacity1,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <Kejang0 />
      </animated.svg>
      <animated.svg
        style={{
          opacity: props.opacity2,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <Kejang1 />
      </animated.svg>
    </div>
  );
};

export default Kejang;
