import { filt } from "src/utils/Animation";
import ClassNames from "./TutoBackFace.module.scss";
import { animated, to } from "react-spring";
import cardBack from "src/assets/img/cards/cardBack-min.jpg";
import { ReactElement, useEffect, useRef, useState } from "react";

const TutoBackFace = ({
  backInfo,
  gray,
  blur,
}: {
  backInfo: ReactElement<any, any>;
  gray: number;
  blur: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current ? ref.current.clientWidth : 0);
    setHeight(ref.current ? ref.current.clientHeight : 0);
  });
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
      {backInfo}
    </animated.div>
  );
};

export default TutoBackFace;
