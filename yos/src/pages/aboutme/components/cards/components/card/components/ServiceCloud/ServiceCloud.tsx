import { ReactComponent as Cloud } from "./Cloud.svg";
import ClassNames from "../../utils/Card.module.scss";
import { SpringValue, animated, to } from "react-spring";
import { filt } from "../../utils/CardHelpers";
const ServiceCloud = ({
  isTop,
  styles,
}: {
  isTop: SpringValue<number>;
  styles: {
    gray: number;
    blur: number;
  };
}) => {
  return (
    <animated.div
      className={ClassNames.serviceOverlay}
      style={{
        filter: to([styles.gray, styles.blur], filt),
        transform: to(
          [isTop],
          (isTop) => `rotateZ(${(1 - isTop) * 160}deg) scale(${isTop})`
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 5,
          textAlign: "center",
          lineHeight: "100px",
          height: "100px",
          width: "144px",
          fontSize: "0.5em",
        }}
      >
        asdfasdf
      </div>
      <Cloud style={{ position: "absolute", left: 0, top: 0 }} />
    </animated.div>
  );
};

export default ServiceCloud;
