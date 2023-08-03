import { CardStyles, flickableDistance } from "src/data/CardData";
import { useEffect, useRef } from "react";
import { getManhattanDistance } from "src/utils/MyMath";
import { CardComponentProps } from "../Card";
import { SpringValues } from "react-spring";

export function canFlick(props: SpringValues<CardStyles>) {
  const [dX, dY] = [Math.abs(props.x.get()), Math.abs(props.y.get())];
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}
const useDefaultCardHandlers = (cardProps: CardComponentProps) => {
  const dragStart = useRef({ x: -1, y: -1 });
  const { cardData, cardAnimController, deckAnimAPI } = cardProps;

  useEffect(() => {
    cardAnimController.TransitionTo.StateStart(
      cardData.Index,
      deckAnimAPI.deckAnim.order.get().length
    );
  }, []);

  const defaultPreventor = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleMove = (e: MouseEvent) => {
    // only dragging&top card can be moved.
    if (
      e.buttons === 1 &&
      deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index
    ) {
      const fr = { x: e.pageX, y: e.pageY };
      const dragDist = getManhattanDistance(fr, dragStart.current);

      if (canFlick(cardAnimController.AnimStates.AnimAPI.AnimValues)) {
        cardAnimController.TransitionTo.StateFlickable(
          deckAnimAPI.deckAnim.order.get().length
        );
      } else {
        cardAnimController.TransitionTo.StateFloat(
          deckAnimAPI.deckAnim.order.get().length
        );
      }
      cardAnimController.TransitionTo.StateMove(dragDist);
      // cardAnimController.cardFollowCursorAnim(dragDist);
    } else if (
      dragStart.current.x !== -1 &&
      dragStart.current.y !== -1 &&
      e.buttons === 0
    ) {
      handleMouseUp(e);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    // only top card can be placed.
    if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
      let result;
      const flickable = canFlick(
        cardAnimController.AnimStates.AnimAPI.AnimValues
      );
      if (flickable) {
        result = cardAnimController.TransitionTo.StateFloor();
      } else {
        result = cardAnimController.TransitionTo.StateTop(
          deckAnimAPI.deckAnim.order.get().length
        );
      }
      if (flickable) {
        result.then((_e: any) => {
          deckAnimAPI.setDeckAnim.set({
            order: [cardData.Index].concat(
              deckAnimAPI.deckAnim.order
                .get()
                .filter((ele) => ele !== cardData.Index)
            ),
          });
        });
      }
      dragStart.current = { x: -1, y: -1 };
    }
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mousemove", handleMove);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      // when clicked
      if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
        // pick card animation.

        dragStart.current = { x: e.pageX, y: e.pageY };
        cardAnimController.TransitionTo.StatePick();
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMove);
      } else if (deckAnimAPI.deckAnim.order.get()[0] === cardData.Index) {
        // floor card to top
        cardAnimController.TransitionTo.StateTop(
          deckAnimAPI.deckAnim.order.get().length
        );
        deckAnimAPI.setDeckAnim.set({
          order: deckAnimAPI.deckAnim.order
            .get()
            .slice(1)
            .concat([cardData.Index]),
        });
      }
    }
  };

  const onChangeOrder = (order: number[]) => {
    return cardAnimController.TransitionTo.StateDeck(
      order.indexOf(cardData.Index),
      order.length
    );
  };

  return {
    onMouseDown: handleMouseDown,
    onDragOver: defaultPreventor,
    onDragStart: defaultPreventor,
    onChangeOrder,
    onChangeMode: (mode: string) => {},
  };
};

export default useDefaultCardHandlers;
