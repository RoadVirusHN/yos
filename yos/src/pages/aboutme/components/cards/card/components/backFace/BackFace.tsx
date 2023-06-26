import { filt } from "../../utils/CardHelpers";
import ClassNames from "../../utils/Card.module.scss";
import { animated, to } from "react-spring";

const BackFace = ({ gray, blur }: { gray: number; blur: number }) => {
  return (
    <animated.div
      className={`${ClassNames.back} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
      }}
    >
      <p>asdfasdf</p>
      <p>asdfasdf</p>
      <p>asdfasdf</p>
      <p>asdfasdf</p>
    </animated.div>
  );
};

export default BackFace;
