import { animated } from "react-spring";
import Class from "./utils/Cards.module.scss";
import useCardsHook from "./utils/CardsHook";
/**
 * !!!Todos
 * - responsive compatibility
 * - more information about card. // title https://codepen.io/lbebber/pen/KwGEQv
 * - animation transition chaining
 * - onMouseUp global EventHandler for debugging.
 * - cards fly from outside -> need to initiate when scrolled!
 */
export default function Cards() {
  const {Handlers, Styles} = useCardsHook();
   return (
    <div className={Class.deckContainer}>
      {Object.entries(Styles).map(([key, {x, y, z, transform, backgroundImage, filter}], i) => (        
        <animated.div className={Class.cardWrapper} key={i} style={{ x, y, z }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            className={Class.card}
            {...Handlers[key]}
            style = {{transform, backgroundImage, filter}}
          />
        </animated.div>
      ))}
    </div>
  );
}
