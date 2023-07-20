import { SpringRef } from "react-spring";
import { DeckStyles } from "src/components/Deck-refactor/Deck";
import { CardAnimInputs, CardStyles, animationData } from "src/data/CardData";
import { animation, unstoppable } from "src/lib/Animation";
import { AnimatedStyles } from "./AnimController";
// define animation play functions
export class CardAnimController {
  cardAnimAPI: {
    setCardAnim: SpringRef<CardStyles>;
    cardAnim: AnimatedStyles<CardStyles>;
  };
  deckAnimAPI: {
    setDeckAnim: SpringRef<DeckStyles>;
    deckAnim: AnimatedStyles<DeckStyles>;
  };
  states: {
    [state: string]: (...args: any[]) => CardAnimInputs;
  };

  constructor(
    cardAnimAPI: {
      setCardAnim: SpringRef<CardStyles>;
      cardAnim: AnimatedStyles<CardStyles>;
    },
    deckAnimAPI: {
      setDeckAnim: SpringRef<DeckStyles>;
      deckAnim: AnimatedStyles<DeckStyles>;
    }
  ) {
    this.cardAnimAPI = cardAnimAPI;
    this.deckAnimAPI = deckAnimAPI;
    this.states = animationData.states;
    
  }

  @animation
  toTopCardAnim(controller: CardAnimController) {
    return controller.cardAnimAPI.setCardAnim.start(
      controller.states.stateTop(
        controller.cardAnimAPI.cardAnim.rz.get(),
        controller.deckAnimAPI.deckAnim.order.get().length
      )
    );
  }

  @animation
  toDeckCardAnim(controller: CardAnimController, order: number) {

    return controller.cardAnimAPI.setCardAnim.start(
      controller.states.stateDeck(order, controller.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  pickCardAnim(controller: CardAnimController) {
    return controller.cardAnimAPI.setCardAnim.start(
      controller.states.statePick(controller.cardAnimAPI.cardAnim.rz.get())
    );
  }

  @animation
  setFloatCardAnim(controller: CardAnimController) {
    return controller.cardAnimAPI.setCardAnim.start(
      controller.states.stateFloat(controller.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  setFlickableCardAnim(controller: CardAnimController) {
    return controller.cardAnimAPI.setCardAnim.start(
      controller.states.stateFlickable(controller.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  @unstoppable()
  flipCardAnim(controller: CardAnimController) {
    if (controller.cardAnimAPI.cardAnim.side.get() === "front") {
      return controller.cardAnimAPI.setCardAnim.start(
        controller.states.stateBack(controller.cardAnimAPI.cardAnim)
      );
    } else {
      return controller.cardAnimAPI.setCardAnim.start(
        controller.states.stateFront(controller.cardAnimAPI.cardAnim)
      );
    }
  }

  @animation
  cardFollowCursorAnim(
    controller: CardAnimController,
    mouseDelta: { dX: number; dY: number }
  ) {
    return controller.cardAnimAPI.setCardAnim.start(
      controller.states.stateMove(mouseDelta)
    );
  }

  @animation
  putCardAnim(controller: CardAnimController, flickable: boolean) {
    return controller.cardAnimAPI.setCardAnim.start(
      flickable
        ? controller.states.stateFloor()
        : controller.states.stateTop(
            controller.cardAnimAPI.cardAnim.rz.get(),
            controller.deckAnimAPI.deckAnim.order.get().length
          )
    );
  }
}
