import {
  type CardComponentData,
  type PjtCardData,
} from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import BackInfo from "./BackInfo";
import { animated } from "react-spring";
import ClassNames from "./PjtBack.module.scss";
import { useRef, useState, useEffect } from "react";

const PjtBack = (pjtInfo: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtInfo.BackFace,
  Component: ({ cardData }: CardComponentProps<PjtCardData>) => {
    const [backInfo, _] = useState((cardData as PjtCardData).BackFace);
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
      setWidth(ref.current != null ? ref.current.clientWidth : 0);
      setHeight(ref.current != null ? ref.current.clientHeight : 0);
    }, []);
    return (
      <animated.div
        ref={ref}
        className={ClassNames.backgroundContainer}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/cardBack.jpg"})`,
        }}
      >
        <BackInfo backInfo={backInfo} width={width} height={height} />
      </animated.div>
    );
  },
});
export default PjtBack;
