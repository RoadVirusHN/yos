import { SpringRef, Lookup, SpringValue } from "react-spring";
import { animationData } from "src/data/CardData";
import { animation, unstoppable } from "src/lib/Animation";
// define animation play functions
export class CardAnimations {
  @animation
  toTopCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> }
  ) {
    console.log(props);

    return api.start(animationData.states.stateTop(props.rz.get()));
  }

  @animation
  toDeckCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    order: number
  ) {
    return api.start(animationData.states.stateDeck(order));
  }

  @animation
  pickCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> }
  ) {
    return api.start(animationData.states.statePick(props.rz.get()));
  }

  @animation
  setFloatCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> }
  ) {
    return api.start(animationData.states.stateFloat());
  }

  @animation
  setFlickableCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> }
  ) {
    return api.start(animationData.states.stateFlickable());
  }

  @animation
  @unstoppable
  flipCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> }
  ) {
    if (props.side.get() === "front") {
      return api.start(animationData.states.stateBack(props));
    } else {
      return api.start(animationData.states.stateFront(props));
    }
  }

  @animation
  cardFollowCursorAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    mouseDelta: { dX: number; dY: number }
  ) {
    return api.start(animationData.states.stateMove(mouseDelta));
  }

  @animation
  putCardAnim(
    api: SpringRef<Lookup<any>>,
    props: { [x: string]: SpringValue<any> },
    flickable: boolean
  ) {
    return api.start(
      flickable
        ? animationData.states.stateFloor()
        : animationData.states.stateTop(props.rz.get())
    );
  }
}
