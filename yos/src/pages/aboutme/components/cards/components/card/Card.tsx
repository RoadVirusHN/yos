import { animated, to } from "react-spring";
import ClassNames from "./utils/Card.module.scss";
import useCardHook, { CardRef } from "./utils/CardHook";
import { forwardRef } from "react";
import { trans } from "./utils/CardHelpers";
import BackFace from "./components/backFace/BackFace";
import FrontFace from "./components/frontFace/FrontFace";
import Band from "./components/band/Band";

export type CardProps = {
  info: { [key: string]: any };
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

    const { x, y, z, rx, ry, cursor, rz, scale, gray, blur } = Styles;

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
          <Band
            beforeMouseDown={Handlers.band.onMouseDown}
            handlers={{
              onDragOver: Handlers.band.onDragOver,
              onDragStart: Handlers.band.onDragStart,
            }}
            status={info.back.status}
            styles={{ gray, blur }}
          />
          <FrontFace {...{ preview: info.front.preview, gray, blur }} />
          <BackFace {...{backInfo: info.back, gray, blur }} />
        </animated.div>
      </animated.div>
    );
  }
);

export default Card;
