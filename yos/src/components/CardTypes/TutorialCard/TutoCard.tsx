import { animated, to } from "react-spring";
import ClassNames from "./TutoCard.module.scss";
import useCardHook, { CardRef } from "../CardCommon/CardHook";
import { forwardRef } from "react";
import { trans } from "src/utils/Animation";
import { TutorialCardInfo } from "@customTypes/Card";
import TutoBackFace from "./TutoBackFace/TutoBackFace";
import TutoFrontFace from "./TutoFrontFace/TutoFrontFace";
import TutoBand from "./TutoBand/TutoBand";

type TutoCardProps = {
  info: TutorialCardInfo;
  changeOrder: (value: number[], except: number) => void;
  getOrder: () => number[];
};

const TutoCard = forwardRef<CardRef, TutoCardProps>(
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
          <TutoFrontFace {...{ frontInfo: info.front, gray, blur, isTop }} />
          <TutoBackFace {...{ backInfo: info.back, gray, blur }} />
          <TutoBand
            beforeMouseDown={Handlers.band.onMouseDown}
            handlers={{
              onDragOver: Handlers.band.onDragOver,
              onDragStart: Handlers.band.onDragStart,
            }}
            styles={{ gray, blur }}
          />
        </animated.div>
      </animated.div>
    );
  }
);

export default TutoCard;
