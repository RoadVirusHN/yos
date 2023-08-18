import { DeckStyles } from "@components/Deck/Deck";
import { animation, unstoppable } from "@lib/Animation/Animation";
import { AnimStates, AnimStatesOutput } from "./CardData";

export class DeckAnimStates extends AnimStates<DeckStyles> {
  @unstoppable()
  StateInit(order: number[]): AnimStatesOutput<DeckStyles> {
    return {
      beforOrder: order,
      order,
      mode: "DECK",
    };
  }

  @animation()
  StateShuffle(newOrder: number[]): AnimStatesOutput<DeckStyles> {
    return {
      beforOrder: this.AnimValues.order.get(),
      order: newOrder,
      immediate: true
    }
  }
  // @animation()
  // StateStart(order: number, deckLength: number): AnimStatesOutput<DeckStyles> {
  //   return {
  //     x: 0,
  //     y: order * -4, // make slightly upward
  //     z: order + 1,
  //     rx: 0,
  //     ry: 0,
  //     scale: 1,
  //     rz: -8 + Math.random() * 16,
  //     gray: 0,
  //     blur: 0,
  //     side: CardSideEnum.FRONT,
  //     isTop: order === deckLength - 1 ? 1 : 0,
  //     cursor: order === deckLength - 1 ? 'grab' : 'default',
  //     delay: order * 200
  //   };
  // }

}
