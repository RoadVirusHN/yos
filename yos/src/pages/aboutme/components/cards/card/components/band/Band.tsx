import ClassNames from "../../utils/Card.module.scss";
import { animated } from "react-spring";
import { ReactComponent as Default } from "./assets/DEFAULT.svg";

const Band = ({ handlers }: { [onEvent: string]: any }) => {
  return (
    <animated.div className={ClassNames.band} draggable="false">
      <Default
        {...handlers}
        style={{
          position: "relative",
          left: 22,
          bottom: 18
        }}
      />
    </animated.div>
  );
};

export default Band;
