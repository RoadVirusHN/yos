import { filt } from "../../utils/CardHelpers";
import ClassNames from "./BackFace.module.scss";
import { animated, to } from "react-spring";
import { BandStatus } from "../../../../utils/CardsData";
import cardBack from "./cardBack-min.jpg";

/**
 * !!! Todo
 * webpack make backface background image to base64, how to prevent it?
 */
const BackFace = ({
  backInfo,
  gray,
  blur,
}: {
  backInfo: {
    team: number;
    date: string;
    role: string;
    status: BandStatus;
    description: string;
    result: string;
  };
  gray: number;
  blur: number;
}) => {
  return (
    <animated.div
      className={`${ClassNames.back} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
        backgroundImage: `url(${cardBack as string})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div>{`${backInfo}`}</div>
    </animated.div>
  );
};

export default BackFace;
