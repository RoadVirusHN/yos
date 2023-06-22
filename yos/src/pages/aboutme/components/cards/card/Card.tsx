import { animated, to } from "react-spring";
import Class from "./utils/Card.module.scss";
import useCardHook, { CardRef } from "./utils/CardHook";
import { forwardRef } from "react";
import { filt, trans } from "./utils/CardsHelpers";
// Define the CardRef type

export type CardProps = {
  info: { [key: string]: any };
  changeOrder: (value: number[], except: number) => void;
  getOrder: () => number[];
};

const Card = forwardRef<CardRef, CardProps>(
  ({ info, changeOrder, getOrder }, ref) => {
    const { Styles, Handlers } = useCardHook(info, changeOrder, getOrder, ref);
    
    const { x, y, z, rot, scale, gray, blur} = Styles;
    
    return (
      <animated.div
        className={Class.cardWrapper}
        key={info.index}
        style={{ x, y, z }}
      >
        <animated.div
          className={Class.card}
          {...Handlers}
          style={{
            transform: to([rot, scale], trans),
            filter: to([gray, blur], filt),
            backgroundImage: `url(${info.preview})`,
          }}
        >
          <animated.div className={Class.front}  />
          <animated.div className={Class.back}  />
        </animated.div>
      </animated.div>
    );
  }
);

export default Card;
