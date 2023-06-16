import { useEffect, useRef } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { createCardHandlers } from "./utils/CardsHandlers";
import "./utils/Cards.scss";
import { filt, from, projects, to, trans } from "./utils/CardsData";
/**
 * !!!Todos
 * - responsive compatibility
 * - more information about card.
 * - animation transition chaining 
 */
function Deck() {
  const queue = useRef(Array.from(projects, (_x, i) => i)); // backward queue
  const dragStart = useRef({ x: -1, y: -1 });
  const [props, api] = useSprings(projects.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above

  const { handleMove, handleMouseDown, handleMouseUP, handleMouseLeave } =
    createCardHandlers(queue, dragStart, api, props);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      handleMove(
        e as unknown as React.MouseEvent<HTMLDivElement>,
        queue.current.at(-1) || -1
      );
    };
    const onMouseOut = (e: MouseEvent) => {
      handleMouseLeave(
        e as unknown as React.MouseEvent<HTMLDivElement>,
        queue.current.at(-1) || -1
      );
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseOut);
    document.addEventListener("mouseup", onMouseOut);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseOut);
      document.removeEventListener("mouseup", onMouseOut);
    };
  }, [handleMove, handleMouseLeave]);
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, z, rot, scale, gray, blur }, i) => (
        <animated.div className="deck" key={i} style={{ x, y, z }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            onMouseDown={(e) => handleMouseDown(e, i)}
            onMouseMove={(e) => handleMove(e, i)}
            onMouseUp={(e) => handleMouseUP(e, i)}
            //onMouseLeave={(e) => handleMouseLeave(e, i)}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragStart={(e) => {
              e.preventDefault();
            }}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${projects[i].preview})`,
              filter: interpolate([gray, blur], filt),
            }}
          />
        </animated.div>
      ))}
    </>
  );
}

export default function Cards() {
  return (
    <div className="cardsContainer">
      <Deck />
    </div>
  );
}
