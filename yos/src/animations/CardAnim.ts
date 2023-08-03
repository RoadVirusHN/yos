import { SpringRef } from "react-spring";
import { DeckStyles } from "src/components/Deck/Deck";
import { AnimStates, CardStates, CardStyles } from "src/data/CardData";
import { animation, unstoppable } from "src/lib/Animation";
import { AnimatedStyles } from "./AnimController";
import { AllCardData } from "src/data/CardProcessors";
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
  states: AnimStates<CardStyles>;
  cardData: AllCardData;

  constructor(
    cardData: AllCardData,
    cardAnimAPI: {
      setCardAnim: SpringRef<CardStyles>;
      cardAnim: AnimatedStyles<CardStyles>;
    },
    deckAnimAPI: {
      setDeckAnim: SpringRef<DeckStyles>;
      deckAnim: AnimatedStyles<DeckStyles>;
    }
  ) {
    this.cardData = cardData;
    this.cardAnimAPI = cardAnimAPI;
    this.deckAnimAPI = deckAnimAPI;
    this.states = CardStates(cardAnimAPI.cardAnim);
  }

  @animation
  toTopCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.StateTop(
        this.cardAnimAPI.cardAnim.rz.get(),
        this.deckAnimAPI.deckAnim.order.get().length
      )
    );
  }

  @animation
  sortCardAnim(order: number) {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.StateDeck(order, this.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  pickCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.StatePick(this.cardAnimAPI.cardAnim.rz.get())
    );
  }

  @animation
  setFloatCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.StateFloat(this.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  setFlickableCardAnim() {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.StateFlickable(this.deckAnimAPI.deckAnim.order.get().length)
    );
  }

  @animation
  @unstoppable()
  flipCardAnim() {
    if (this.cardAnimAPI.cardAnim.side.get() === "front") {
      return this.cardAnimAPI.setCardAnim.start(
        this.states.StateBack(this.cardAnimAPI.cardAnim)
      );
    } else {
      return this.cardAnimAPI.setCardAnim.start(
        this.states.StateFront(this.cardAnimAPI.cardAnim)
      );
    }
  }

  @animation
  cardFollowCursorAnim(mouseDelta: { dX: number; dY: number }) {
    return this.cardAnimAPI.setCardAnim.start(
      this.states.StateMove(mouseDelta)
    );
  }

  @animation
  putCardAnim(flickable: boolean) {
    return this.cardAnimAPI.setCardAnim.start(
      flickable
        ? this.states.StateFloor()
        : this.states.StateTop(
            this.cardAnimAPI.cardAnim.rz.get(),
            this.deckAnimAPI.deckAnim.order.get().length
          )
    );
  }
}
