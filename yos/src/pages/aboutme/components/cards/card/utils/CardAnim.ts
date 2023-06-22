import { SpringRef, Lookup, SpringValue } from "react-spring";
import { animationData } from "./CardData";

// define animation play functions

export function toTopCardAnim(api: SpringRef<Lookup<any>>) {
  api.start(animationData.states.stateTop());
}

export function toDeckCardAnim(api: SpringRef<Lookup<any>>, order: number) {
  api.start(animationData.states.stateDeck(order));
}
export const pickCardAnim = (
  api: SpringRef<Lookup<any>>,
  props: { [x: string]: SpringValue<any> }
) => {
  api.start(animationData.states.statePick(props.rot.get()));
};
export function setFloatCardAnim(api: SpringRef<Lookup<any>>) {
  api.start(animationData.states.stateFloat());
}
export function setFlickableCardAnim(api: SpringRef<Lookup<any>>) {
  api.start(animationData.states.stateFlickable());
}

export function cardFollowCursorAnim(
  api: SpringRef<Lookup<any>>,
  mouseDelta: { dX: number; dY: number }
) {
  api.start(animationData.states.stateMove(mouseDelta));
}
export function putCardAnim(flickable: boolean, api: SpringRef<Lookup<any>>) {
  api.start(
    flickable
      ? animationData.states.stateFloor()
      : animationData.states.stateTop()
  );
}


export function frontCardAnim(api: SpringRef<Lookup<any>>) {
  
}


export function backCardAnim(api: SpringRef<Lookup<any>>) {
  
}