import { SpringValue, Controller } from "react-spring";
import { CardProperties, animationData } from "./CardsData";

// define animation play functions

export function makeCardTopAnim(index: number, api: any) {
  api.start((i: number) => {
    if (index !== i) return;
    return animationData.states.stateTop().card;
  });
}

export const pickCardAnim = (
  index: number,
  api: any,
  props: { [keys: string]: SpringValue<number> }[]
) => {
  api.start((i: number) => {
    if (index !== i) return;
    return animationData.states.statePick(props[index].rot.get()).card;
  });
};
export function setFloatCardAnim(index: number, api: any) {
  api.start((i: number) => {
    if (index !== i) return;
    return animationData.states.stateFloat().card;
  });
}
export function setFlickableCardAnim(index: number, api: any) {
  api.start((i: number) => {
    if (index !== i) return;
    return animationData.states.stateFlickable().card;
  });
}

export function cardFollowCursorAnim(
  index: number,
  mouseDelta: { dX: number; dY: number },
  api: any
) {
  api.set((i: number, _ctrl: Controller<CardProperties>) => {
    if (index !== i) return {};
    return animationData.states.stateMove(mouseDelta).card;
  });
}
export function putCardAnim(
  index: number,
  flickable: boolean,
  api: any,
  queue: React.MutableRefObject<number[]>
) {
  api.start((i: number) => {
    if (flickable && index === i) {
      return animationData.states.stateFloor().card;
    } else {
      // rearrange all card by their order in the deck.
      const currentIndex = queue.current.indexOf(i);
      return animationData.states.stateDeck(currentIndex).card;
    }
  });
}
