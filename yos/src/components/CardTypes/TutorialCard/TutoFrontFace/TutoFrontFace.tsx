import { filt } from "src/utils/Animation";
import ClassNames from "./TutoFrontFace.module.scss";
import { SpringValue, animated, to } from "react-spring";
import { ReactElement } from "react";
import TutoTitle from "src/assets/img/cards/graffities/tutoTitle/TutoTitle";

const TutoFrontFace = ({
  frontInfo,
  gray,
  blur,
  isTop,
}: {
  frontInfo: ReactElement<any, any>;
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
      {frontInfo}
    </animated.div>
  );
};

export default TutoFrontFace;
