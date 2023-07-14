import { animated, to } from "react-spring";
import ClassNames from "./PjtCard.module.scss";
import useCardHook, { CardRef } from "../CardCommon/CardHook";
import { forwardRef } from "react";
import PjtBackFace from "./PjtBackFace/PjtBackFace";
import PjtFrontFace from "./PjtFrontFace/PjtFrontFace";
import PjtBand from "./PjtBand/PjtBand";
import ServiceCloud from "./ServiceCloud/ServiceCloud";
import { trans } from "src/utils/MyAnimation";
import { PjtCardInfo } from "@customTypes/Card";

type PjtCardProps = {
  info: PjtCardInfo;
  changeOrder: (value: number[], except: number) => void;
  getOrder: () => number[];
};

const PjtCard = forwardRef<CardRef, PjtCardProps>(
  ({ info, changeOrder, getOrder }, selfRef) => {
    const { Styles, Handlers } = useCardHook(
      info,
      changeOrder,
      getOrder,
      selfRef
    );

    const { x, y, z, rx, ry, rz, cursor, scale, gray, blur, isTop } = Styles;

    return (
      <animated.div
        className={ClassNames.cardWrapper}
        key={info.index}
        style={{ x, y, z }}
      >
        <ServiceCloud isTop={isTop} styles={{ gray, blur }} url={info.url} />
        <animated.div
          className={ClassNames.card}
          {...Handlers.card}
          style={{
            cursor,
            transform: to([rx, ry, rz, scale], trans),
          }}
        >
          <PjtFrontFace {...{ frontInfo: info.front, gray, blur, isTop }} />
          <PjtBackFace {...{ backInfo: info.back, gray, blur }} />
          <PjtBand
            beforeMouseDown={Handlers.band.onMouseDown}
            handlers={{
              onDragOver: Handlers.band.onDragOver,
              onDragStart: Handlers.band.onDragStart,
            }}
            status={info.back.status}
            styles={{ gray, blur }}
          />
        </animated.div>
      </animated.div>
    );
  }
);

export default PjtCard;
