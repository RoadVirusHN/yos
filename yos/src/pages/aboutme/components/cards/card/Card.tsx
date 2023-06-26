import { animated, to } from "react-spring";
import ClassNames from "./utils/Card.module.scss";
import useCardHook, { CardRef } from "./utils/CardHook";
import { forwardRef } from "react";
import { filt, trans } from "./utils/CardHelpers";

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
          <animated.div
            className={ClassNames.dustJacket}
            {...Handlers.dustJacket}
            draggable="false"
          >
            asdfasd
          </animated.div>
          <animated.div
            className={`${ClassNames.front} ${ClassNames.face}`}
            style={{
              backgroundImage: `url(${info.preview})`,
              filter: to([gray, blur], filt),
            }}
          />
          <animated.div
            className={`${ClassNames.back} ${ClassNames.face}`}
            style={{
              filter: to([gray, blur], filt),
            }}
          >
            <p>asdfasdf</p>
            <p>asdfasdf</p>
            <p>asdfasdf</p>
            <p>asdfasdf</p>
          </animated.div>
        </animated.div>
      </animated.div>
    );
  }
);

export default Card;
