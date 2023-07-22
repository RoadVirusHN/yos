import { SpringRef } from "react-spring";
import { DeckStyles } from "src/components/Deck/Deck";
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
  toTopCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.stateTop(
        this.cardAnimAPI.cardAnim.rz.get(),
        this.deckAnimAPI.deckAnim.order.get().length
      )
    );
  }

  @animation
  toDeckCardAnim(order: number) {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.stateDeck(order, this.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  pickCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.statePick(this.cardAnimAPI.cardAnim.rz.get())
    );
  }

  @animation
  setFloatCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.stateFloat(this.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  setFlickableCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.stateFlickable(this.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  @unstoppable()
  flipCardAnim() {
    if (this.cardAnimAPI.cardAnim.side.get() === "front") {
      return this.cardAnimAPI.setCardAnim.start(
        this.states.stateBack(this.cardAnimAPI.cardAnim)
      );
    } else {
      return this.cardAnimAPI.setCardAnim.start(
        this.states.stateFront(this.cardAnimAPI.cardAnim)
      );
    }
  }

  @animation
  cardFollowCursorAnim(mouseDelta: { dX: number; dY: number }) {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.stateMove(mouseDelta)
    );
  }

  @animation
  putCardAnim(flickable: boolean) {
    return this.cardAnimAPI.setCardAnim.start(
      flickable
        ? this.states.stateFloor()
        : this.states.stateTop(
            this.cardAnimAPI.cardAnim.rz.get(),
            this.deckAnimAPI.deckAnim.order.get().length
          )
    );
  }
}
