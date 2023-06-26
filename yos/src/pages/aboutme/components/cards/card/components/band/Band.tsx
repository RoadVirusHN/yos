import ClassNames from "../../utils/Card.module.scss";
import { animated } from "react-spring";

const Band = ({ handlers }: { [onEvent: string]: any }) => {
  return (
    <animated.div className={ClassNames.band} {...handlers} draggable="false">
      asdfasd
    </animated.div>
  );
};

export default Band;
