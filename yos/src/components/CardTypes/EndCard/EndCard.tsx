import { animated, to } from "react-spring";
import ClassNames from "./EndCard.module.scss";
import useCardHook, { CardRef } from "../CardCommon/CardHook";
import { forwardRef } from "react";
import { trans } from "src/utils/MyAnimation";
import { EndCardInfo } from "@customTypes/Card";
import EndBackFace from "./EndBackFace/EndBackFace";
import EndFrontFace from "./EndFrontFace/EndFrontFace";

type EndCardProps = {
  info: EndCardInfo;
  changeOrder: (value: number[], except: number) => void;
  getOrder: () => number[];
};

const EndCard = forwardRef<CardRef, EndCardProps>(
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
        <animated.div
          className={ClassNames.card}
          {...Handlers.card}
          style={{
            cursor,
            transform: to([rx, ry, rz, scale], trans),
          }}
        >
          <EndFrontFace {...{ gray, blur, isTop }} />
          <EndBackFace {...{ gray, blur }} />
        </animated.div>
      </animated.div>
    );
  }
);

export default EndCard;
