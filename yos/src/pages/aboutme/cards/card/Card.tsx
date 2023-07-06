import { animated, to } from "react-spring";
import ClassNames from "./Card.module.scss";
import useCardHook, { CardRef } from "./CardHook";
import { forwardRef } from "react";
import BackFace from "./backFace/BackFace";
import FrontFace from "./frontFace/FrontFace";
import Band from "./band/Band";
import ServiceCloud from "./ServiceCloud/ServiceCloud";
import { CardInfo } from "src/data/CardsData";
import { trans } from "src/utils/animation";

export type CardProps = {
  info: CardInfo;
  changeOrder: (value: number[], except: number) => void;
  getOrder: () => number[];
};

const Card = forwardRef<CardRef, CardProps>(
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
          <FrontFace {...{ frontInfo: info.front, gray, blur, isTop }} />
          <BackFace {...{ backInfo: info.back, gray, blur }} />
          <Band
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

export default Card;
