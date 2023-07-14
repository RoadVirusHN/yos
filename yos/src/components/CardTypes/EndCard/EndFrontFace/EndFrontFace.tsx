import { filt } from "src/utils/MyAnimation";
import ClassNames from "./EndFrontFace.module.scss";
import { SpringValue, animated, to } from "react-spring";

const EndFrontFace = ({
  gray,
  blur,
  isTop,
}: {
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
      Hi there
    </animated.div>
  );
};

export default EndFrontFace;
