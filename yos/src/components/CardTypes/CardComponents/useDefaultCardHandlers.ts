import { CardStyles, flickableDistance } from "src/data/CardData";
import { useEffect, useRef } from "react";
import { getManhattanDistance } from "src/utils/MyMath";
import { CardComponentProps } from "../Card";
import { AnimatedStyles } from "src/animations/AnimController";

export function canFlick(props: AnimatedStyles<CardStyles>) {
  const [dX, dY] = [Math.abs(props.x.get()), Math.abs(props.y.get())];
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}
const useDefaultCardHandlers = (cardProps: CardComponentProps) => {
  const dragStart = useRef({ x: -1, y: -1 });
  const { cardData, cardAnimController } = cardProps;
  const [States, cardAnimAPI, deckAnimAPI] = [
    cardAnimController.states,
    cardAnimController.cardAnimAPI,
    cardAnimController.deckAnimAPI,
  ];
  useEffect(() => {
    cardAnimAPI.setCardAnim.start(
      States.stateStart(cardData.Index, deckAnimAPI.deckAnim.order.get().length)
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

      if (canFlick(cardAnimAPI.cardAnim)) {
        cardAnimController.setFlickableCardAnim();
      } else {
        cardAnimController.setFloatCardAnim();
      }
      cardAnimController.cardFollowCursorAnim(dragDist);
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
      const flickable = canFlick(cardAnimAPI.cardAnim);
      const result = cardAnimController.putCardAnim(flickable);
      if (flickable) {
        result[0].then((_e: any) => {
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
        cardAnimController.pickCardAnim();
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMove);
      } else if (deckAnimAPI.deckAnim.order.get()[0] === cardData.Index) {
        // floor card to top
        cardAnimController.toTopCardAnim();
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
    return cardAnimController.sortCardAnim(order.indexOf(cardData.Index));
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
