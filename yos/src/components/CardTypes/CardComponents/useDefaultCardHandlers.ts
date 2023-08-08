import { type CardStyles, flickableDistance } from 'src/data/CardData';
import { useEffect, useRef } from 'react';
import { getManhattanDistance } from 'src/utils/MyMath';
import { type CardComponentProps } from '../Card';
import { type SpringValues } from 'react-spring';
import { AllCardData } from 'src/data/CardProcessors';

export function canFlick(props: SpringValues<CardStyles>) {
  const [dX, dY] = [Math.abs(props.x.get()), Math.abs(props.y.get())];
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}
const useDefaultCardHandlers = (cardProps: CardComponentProps<AllCardData>) => {
  const dragStart = useRef({ x: -1, y: -1 });
  const { cardData, cardAnimController, deckAnimAPI } = cardProps;

  useEffect(() => {
    void cardAnimController.TransitionTo.StateStart(
      cardData.Index,
      deckAnimAPI.deckAnim.order.get().length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        void cardAnimController.TransitionTo.StateFlickable(
          deckAnimAPI.deckAnim.order.get().length
        );
      } else {
        void cardAnimController.TransitionTo.StateFloat(
          deckAnimAPI.deckAnim.order.get().length
        );
      }
      void cardAnimController.TransitionTo.StateMove(dragDist);
    } else if (
      dragStart.current.x !== -1 &&
      dragStart.current.y !== -1 &&
      e.buttons === 0
    ) {
      handleMouseUp(e);
    }
  };
  const handleMouseUp = (_e: MouseEvent) => {
    // only top card can be placed.
    if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
      if (canFlick(
        cardAnimController.AnimStates.AnimAPI.AnimValues
      )) {
        cardAnimController.TransitionTo.StateFloor().then((_res: any) => {
          deckAnimAPI.setDeckAnim.set({
            order: [cardData.Index].concat(
              deckAnimAPI.deckAnim.order
                .get()
                .filter((ele) => ele !== cardData.Index)
            )
          });
        });
      } else {
        cardAnimController.TransitionTo.StateTop(
          deckAnimAPI.deckAnim.order.get().length
        )
      }
      dragStart.current = { x: -1, y: -1 };
    }
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMove);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      // when clicked
      if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
        // pick card animation.
        dragStart.current = { x: e.pageX, y: e.pageY };
        void cardAnimController.TransitionTo.StatePick();
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMove);
      } else if (deckAnimAPI.deckAnim.order.get()[0] === cardData.Index) {
        // floor card to top
        void cardAnimController.TransitionTo.StateTop(
          deckAnimAPI.deckAnim.order.get().length
        );
        // change deck Order
        deckAnimAPI.setDeckAnim.set({
          order: deckAnimAPI.deckAnim.order
            .get()
            .slice(1)
            .concat([cardData.Index])
        });
      }
    }
  };

  const onChangeOrder = async (order: number[]) => {
    return await cardAnimController.TransitionTo.StateDeck(
      order.indexOf(cardData.Index),
      order.length
    );
  };

  return {
    onMouseDown: handleMouseDown,
    onDragOver: defaultPreventor,
    onDragStart: defaultPreventor,
    onChangeOrder,
    onChangeMode: (_mode: string) => { }
  };
};

export default useDefaultCardHandlers;
