import { flickableDistance } from 'src/data/CardData';
import { useEffect } from 'react';
import { type CardComponentProps } from '../Card';
import { AllCardData } from 'src/data/CardProcessors';
import { useGesture } from '@use-gesture/react';

export function canFlick(distance: [dX: number, dY: number]) {
  const [dX, dY] = distance
  const flickable = dX > flickableDistance[0] || dY > flickableDistance[1];
  return flickable;
}
const useDefaultCardHandlers = (cardProps: CardComponentProps<AllCardData>) => {
  const { cardData, cardAnimController, deckAnimAPI } = cardProps;
  useEffect(() => {
    void cardAnimController.TransitionTo.StateStart(
      cardData.Index,
      deckAnimAPI.deckAnim.order.get().length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bind = useGesture({
    onDrag: ({ first, dragging, movement, swipe, tap, last, event }) => {
      // when the card is in top of the deck && click the exactly this card. (event.preventpropagation doesn't work!)
      if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index && (event.target as HTMLElement).tagName !== "IMG") {
        if (first) cardAnimController.TransitionTo.StatePick()
        if (dragging) {
          // user dragging
          // if distance > flickable, focused out

          if (canFlick(movement)) {
            void cardAnimController.TransitionTo.StateFlickable(
              deckAnimAPI.deckAnim.order.get().length
            )
          } else {
            void cardAnimController.TransitionTo.StateFloat(
              deckAnimAPI.deckAnim.order.get().length
            );
          }
          //follow cursor
          void cardAnimController.TransitionTo.StateMove(movement);
        }
        // released
        // if distance > flickable, flicked to back, or get back.
        if (last) {
          if (canFlick(movement)) {
            void cardAnimController.TransitionTo.StateFloor().then((_res: any) => {
              deckAnimAPI.setDeckAnim.set({
                order: [cardData.Index].concat(
                  deckAnimAPI.deckAnim.order
                    .get()
                    .filter((ele) => ele !== cardData.Index)
                )
              });
            })
          } else {
            cardAnimController.TransitionTo.StateTop(
              deckAnimAPI.deckAnim.order.get().length
            )
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
      } else if (deckAnimAPI.deckAnim.order.get()[0] === cardData.Index) {
        // most bottom card
        if (tap) {
          //use tapping
          // get back to top card, make new bottom card to clickable.
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
    },
    onPinch: ({ pinching, offset: [scaleDelta, angleDelta], movement, distance }) => {
      console.log(scaleDelta, angleDelta, movement, distance);

      if (deckAnimAPI.deckAnim.order.get().at(-1) === cardData.Index) {
        //when the card is in top of the deck.
        if (pinching) {
          // user pinching
          //zoom by scale delta, spin by angle Delta, move by distance
        }
      }
    }
  }, { drag: { filterTaps: true } }
  )

  const onChangeOrder = async (order: number[]) => {
    return await cardAnimController.TransitionTo.StateDeck(
      order.indexOf(cardData.Index),
      order.length
    );
  };

  return {
    bind,
    onChangeOrder,
    onChangeMode: (_mode: string) => { }
  };
};

export default useDefaultCardHandlers;
