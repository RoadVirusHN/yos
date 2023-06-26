import { filt } from "../../utils/CardHelpers";
import ClassNames from "../../utils/Card.module.scss";
import { animated, to } from "react-spring";

const FrontFace = ({
  preview,
  gray,
  blur,
}: {
  preview: string;
  gray: number;
  blur: number;
}) => {
  return (
    <animated.div
      className={`${ClassNames.front} ${ClassNames.face}`}
      style={{
        backgroundImage: `url(${preview})`,
        filter: to([gray, blur], filt),
      }}
    ></animated.div>
  );
};

export default FrontFace;
