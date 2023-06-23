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

    const { x, y, z, cursor, rot, scale, gray, blur } = Styles;
      
    return (
      <animated.div
        className={ClassNames.cardWrapper}
        key={info.index}
        style={{ x, y, z }}
      >
        <animated.div
          className={ClassNames.card}
          {...Handlers}
          style={{
            transform: to([rot, scale], trans),
            filter: to([gray, blur], filt),
            backgroundImage: `url(${info.preview})`,
            cursor
          }}
        >
          <animated.div className={ClassNames.front} />
          <animated.div className={ClassNames.back} />
        </animated.div>
      </animated.div>
    );
  }
);

export default Card;
