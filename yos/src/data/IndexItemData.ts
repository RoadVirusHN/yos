import { unstoppable } from "@lib/Animation/Animation";
import { AnimStates, AnimStatesOutput } from "./CardData";
export interface IndexItemStyles {
  // Styles for cards.{
  scale: number,
  fill: [r: number, g: number, b: number],
  y: number,
}
export class IndexItemAnimStates extends AnimStates<IndexItemStyles> {
  @unstoppable()
  StateInit(isTop: boolean): AnimStatesOutput<IndexItemStyles> {
    return {
      scale: isTop ? 1.3 : 1,
      fill: isTop ? [232, 239, 249] : [182, 199, 219],
      y: isTop ? -10 : 0,
    };
  }
}
