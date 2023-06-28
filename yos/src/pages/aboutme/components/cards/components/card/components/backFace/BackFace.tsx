import { filt } from "../../utils/CardHelpers";
import ClassNames from "./BackFace.module.scss";
import { animated, to } from "react-spring";
import { BandStatus } from "../../../../utils/CardsData";
import cardBack from "./cardBack-min.jpg";
import BackInfo from "./components/BackInfo";
import { useEffect, useRef, useState } from "react";

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
    teammates: number;
    term: string;
  };
  gray: number;
  blur: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current ? ref.current.clientWidth : 0);
    setHeight(ref.current ? ref.current.clientHeight : 0);
  }, [ref]);
  return (
    <animated.div
      ref={ref}
      className={`${ClassNames.back} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
        backgroundImage: `url(${cardBack})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <BackInfo backInfo={backInfo} width={width} height={height} />
    </animated.div>
  );
};

export default BackFace;
