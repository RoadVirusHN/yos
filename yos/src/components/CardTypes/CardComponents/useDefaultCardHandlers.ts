import { flickableDistance } from 'src/data/CardData';
import { useEffect } from 'react';
import { type CardComponentProps } from '../Card';
import { AllCardData } from 'src/data/CardProcessors';
import { useGesture } from '@use-gesture/react';
import { arraysAreEqual, moveToFirst, moveToLast } from '@utils/MyArray';

export function canFlick(distance: [dX: number, dY: number]) {
  const [dX, dY] = distance
  const flickable = Math.abs(dX) > flickableDistance[0] || Math.abs(dY) > flickableDistance[1];
  return flickable;
}
const useDefaultCardHandlers = (cardProps: CardComponentProps<AllCardData>) => {
  const { cardData, cardAnimController, deckAnimController } = cardProps;
  const deckAnimValues = deckAnimController.AnimStates.AnimValues;
  useEffect(() => {
    void cardAnimController.TransitionTo.StateStart(
      cardData.Index,
      deckAnimValues.order.get().length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bind = useGesture({
    onDrag: ({ first, dragging, movement, swipe, tap, last, event }) => {
      // when the card is in top of the deck && click the exactly this card. (event.preventpropagation doesn't work!)
      if (deckAnimValues.order.get().at(-1) === cardData.Index && (event.target as HTMLElement).tagName !== "IMG") {
        if (first) cardAnimController.TransitionTo.StatePick()
        if (dragging) {
          // user dragging
          // if distance > flickable, focused out
          console.log("dragged");


          if (canFlick(movement)) {
            void cardAnimController.TransitionTo.StateFlickable(
              deckAnimValues.order.get().length
            )
          } else {
            void cardAnimController.TransitionTo.StateFloat(
              deckAnimValues.order.get().length
            );
          }
          //follow cursor
          void cardAnimController.TransitionTo.StateMove(movement);
        }
        // released
        // if distance > flickable, flicked to back, or get back.
        if (last) {
          if (canFlick(movement)) {

            deckAnimController.TransitionTo.StateShuffle(
              moveToFirst(deckAnimValues.order.get(), cardData.Index))
          }
          else {
            cardAnimController.TransitionTo.StateTop(deckAnimValues.order.get().length);
          }
        }
        if (!swipe.every((i) => i === 0)) {
          // user swipping (any directions)
          // flickeded to back
          console.log("swiped!", swipe);

        }
        if (tap) {
          // user tapping
          // card fill the screen.
          console.log("tapped!");
        }
      } else if (deckAnimValues.order.get()[0] === cardData.Index) {
        // most bottom card
        if (tap) {
          //use tapping
          // get back to top card, make new bottom card to clickable.
          // void cardAnimController.TransitionTo.StateTop(
          //   deckAnimValues.order.get().length
          // );
          // change deck Order

          deckAnimController.TransitionTo.StateShuffle(
            moveToLast(deckAnimValues.order.get(), cardData.Index)
          );
        }
      }
    },
    onPinch: ({ pinching, offset: [scaleDelta, angleDelta], movement, distance }) => {
      console.log(scaleDelta, angleDelta, movement, distance);

      if (deckAnimValues.order.get().at(-1) === cardData.Index) {
        //when the card is in top of the deck.
        if (pinching) {
          // user pinching
          //zoom by scale delta, spin by angle Delta, move by distance
        }
      }
    }
  }, { drag: { filterTaps: true } }
  )

  const onChangeOrder = async (newOrder: number[]) => {
    const beforeOrder = deckAnimValues.beforOrder.get();
    if (!arraysAreEqual(beforeOrder, newOrder)) {
      cardAnimController.TransitionTo.StateReorder(beforeOrder, newOrder, cardData.Index)
    }
    return {}
  };

  return {
    bind,
    onChangeOrder,
    onChangeMode: (_mode: string) => { }
  };
};

export default useDefaultCardHandlers;
