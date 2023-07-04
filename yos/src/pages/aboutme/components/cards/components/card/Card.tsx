import { animated, to } from "react-spring";
import ClassNames from "./utils/Card.module.scss";
import useCardHook, { CardRef } from "./utils/CardHook";
import { forwardRef } from "react";
import { trans } from "./utils/CardHelpers";
import BackFace from "./components/backFace/BackFace";
import FrontFace from "./components/frontFace/FrontFace";
import Band from "./components/band/Band";
import ServiceCloud from "./components/ServiceCloud/ServiceCloud";
import { CardInfo } from "../../utils/CardsData";

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
          <FrontFace {...{ frontInfo: info.front, gray, blur }} />
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
