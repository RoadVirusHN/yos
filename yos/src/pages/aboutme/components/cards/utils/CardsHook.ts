import { SpringValue, useSprings, to as interpolate } from "react-spring";
import {
  canFlick,
  dragOver,
  filt,
  getDragDistance,
  isCardAtTop,
  isDragging,
  isDraggingByLeftClick,
  putCardAtLast,
  trans,
} from "./CardsHelpers";
import { animationData, projects } from "./CardsData";
import { useEffect, useRef } from "react";
import { MyHook } from "../../../../../types/MyHook";
import {
  makeCardTopAnim,
  pickCardAnim,
  setFlickableCardAnim,
  cardFollowCursorAnim,
  putCardAnim,
  setFloatCardAnim,
} from "./CardsAnim";

export default function useCardsHook(): MyHook {
  // Create Refs, States and Handlers, Styles then return them.
  
  const queue = useRef(Array.from(projects, (_x, i) => i)); // backward queue
  const dragStart = useRef({ x: -1, y: -1 });
  const [props, api] = useSprings(projects.length, (i) => ({
    ...animationData.initialProps.card.to(i),
    from: animationData.initialProps.card.from(i),
  })); // Create a bunch of springs using the helpers above

  const {
    handleMoveCreator,
    handleMouseDownCreator,
    handleMouseUPCreator,
    handleMouseLeaveCreator,
  } = cardHandlerCreators(queue, dragStart, api, props);

  useEffect(() => {
    const onMouseMove = handleMoveCreator(-1);
    const onMouseOut = handleMouseLeaveCreator(-1);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseOut);
    document.addEventListener("mouseup", onMouseOut);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseOut);
      document.removeEventListener("mouseup", onMouseOut);
    };
  }, [handleMoveCreator, handleMouseLeaveCreator]);
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const result: MyHook = { Refs: {}, Handlers: {}, Styles: {} };
  const defaultPreventor = (e: Event) => {
    e.preventDefault();
  };
  props.forEach((v, i) => {
    result.Styles[i.toString()] = {
      ...v,
      transform: interpolate([v.rot, v.scale], trans),
      backgroundImage: `url(${projects[i].preview})`,
      filter: interpolate([v.gray, v.blur], filt),
    };
    result.Handlers[i.toString()] = {
      onMouseDown: handleMouseDownCreator(i),
      onMouseMove: handleMoveCreator(i),
      onMouseUp: handleMouseUPCreator(i),
      onDragOver: defaultPreventor,
      onDragStart: defaultPreventor,
    };
  });

  return result;
}
// Event Handlers
export const cardHandlerCreators = (
  queue: React.MutableRefObject<number[]>,
  dragStart: React.MutableRefObject<{ [keys: string]: number }>,
  api: any,
  props: { [keys: string]: SpringValue<number> }[]
) => {
  const handleMouseDownCreator = (index: number) => (e: React.MouseEvent) => {
    if (queue.current[0] === index) {
      // if index card is on the floor
      makeCardTopAnim(index, api);
      queue.current = queue.current.slice(1).concat([index]); // take it back to the top
      return;
    }
    if (isDraggingByLeftClick(e) && isCardAtTop(index, queue)) {
      dragStart.current = { x: e.pageX, y: e.pageY };
      pickCardAnim(index, api, props); // else pick card
    }
  };

  const handleMoveCreator =
    (index: number) => (e: React.MouseEvent | MouseEvent) => {
      if (
        !isCardAtTop(index, queue) ||
        !isDragging(dragStart) ||
        !isDraggingByLeftClick(e as React.MouseEvent)
      )
        return;
      // check the drag distance is enough to flick.
      canFlick(e.target as HTMLElement, index, props)
        ? setFlickableCardAnim(index, api)
        : setFloatCardAnim(index, api);

      cardFollowCursorAnim(
        index,
        getDragDistance(e as React.MouseEvent, dragStart),
        api
      );
    };

  const handleMouseUPCreator = (index: number) => (e: React.MouseEvent) => {
    dragOver(dragStart);
    const flickable = canFlick(e.target as HTMLElement, index, props);
    if (flickable) putCardAtLast(index, queue);
    putCardAnim(index, flickable, api, queue);
  };
  const handleMouseLeaveCreator =
    (index: number) => (e: React.MouseEvent | MouseEvent) => {
      dragOver(dragStart);
      makeCardTopAnim(index, api);
    };
  return {
    handleMoveCreator,
    handleMouseDownCreator,
    handleMouseUPCreator,
    handleMouseLeaveCreator,
  };
};
