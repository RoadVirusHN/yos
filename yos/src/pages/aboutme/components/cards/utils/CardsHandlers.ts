import {SpringValue } from "react-spring";
import {
  canFlick,
  cardFollowCursorAnim,
  dragOver,
  getDragDistance,
  isCardAtTop,
  isDragging,
  isDraggingByLeftClick,
  makeCardTopAnim,
  pickCardAnim,
  putCardAnim,
  putCardAtLast,
  setFlickableCardAnim,
} from "./CardsHelpers";

// Event Handlers
export const createCardHandlers = (
  queue: React.MutableRefObject<number[]>,
  dragStart: React.MutableRefObject<{ [keys: string]: number }>,
  api: any,
  props: { [keys: string]: SpringValue<number> }[]
) => {
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (queue.current[0] === index) {
      // if index is on the floor
      makeCardTopAnim(index, api);
      queue.current = queue.current.slice(1).concat([index]); // take it back to the top
      return;
    }
    if (isDraggingByLeftClick(e) && isCardAtTop(index, queue)) {
      dragStart.current = { x: e.pageX, y: e.pageY };
      pickCardAnim(index, api, props);
    }
  };

  const handleMove = (e: React.MouseEvent, index: number) => {
    if (
      !isCardAtTop(index, queue) ||
      !isDragging(dragStart) ||
      !isDraggingByLeftClick(e)
    )
      return;
    const flickable = canFlick(e.target as HTMLElement, index, props); // check the drag distance is enough to flick.
    setFlickableCardAnim(index, flickable, api);

    cardFollowCursorAnim(index, getDragDistance(e, dragStart), api);
  };

  const handleMouseUP = (e: React.MouseEvent, index: number) => {
    dragOver(dragStart);
    const flickable = canFlick(e.target as HTMLElement, index, props);
    if (flickable) putCardAtLast(index, queue);
    putCardAnim(index, flickable, api, queue);
  };
  const handleMouseLeave = (e: React.MouseEvent, index: number) => {
    dragOver(dragStart);
    makeCardTopAnim(index, api);
  };
  return { handleMove, handleMouseDown, handleMouseUP, handleMouseLeave };
};
