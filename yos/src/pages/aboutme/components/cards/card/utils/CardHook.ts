import { useSpring } from "react-spring";
import { MyHook } from "../../../../../../types/MyHook";
import { animationData } from "./CardsData";
import { useEffect, useImperativeHandle, useRef } from "react";
import { canFlick, getDistance } from "./CardsHelpers";
import {
  cardFollowCursorAnim,
  toTopCardAnim,
  pickCardAnim,
  putCardAnim,
  setFlickableCardAnim,
  setFloatCardAnim,
  toDeckCardAnim,
} from "./CardsAnim";
export type CardRef = {
  stackUp: (except: number) => void;
};

export default function useCardHook(
  info: { [key: string]: any },
  changeOrder: (value: number[], except: number) => void,
  getOrder: () => number[],
  ref: React.ForwardedRef<CardRef>
): MyHook {
  const [props, api] = useSpring(() => animationData.initialProps(info.index));
  const orderCache = useRef(getOrder());
  const dragStart = useRef({ x: -1, y: -1 });

  useImperativeHandle(ref, () => ({
    stackUp: (except: number) => {
      if (info.index !== except) {
        toDeckCardAnim(api, getOrder().indexOf(info.index));
      }
    },
  }));

  useEffect(() => {
    api.start(animationData.states.stateStart(info.index));
  }, [api, info.index]);

  const defaultPreventor = (e: Event) => {
    e.preventDefault();
  };

  const handleMove = (e: MouseEvent) => {
    // should be added in document event listner
    if (e.button === 0 && orderCache.current.at(-1) === info.index) {
      const fr = { x: e.pageX, y: e.pageY };
      const dragDist = getDistance(fr, dragStart.current);
      canFlick(props) ? setFlickableCardAnim(api) : setFloatCardAnim(api);
      cardFollowCursorAnim(api, dragDist);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    orderCache.current = getOrder();
    if (orderCache.current.at(-1) === info.index) {
      dragStart.current = { x: -1, y: -1 };
      const flickable = canFlick(props);
      if (flickable) {
        changeOrder(
          [info.index].concat(
            orderCache.current.filter((ele) => ele !== info.index)
          ),
          info.index
        );
      }
      putCardAnim(flickable, api);
    }
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mousemove", handleMove);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      orderCache.current = getOrder();
      if (orderCache.current.at(-1) === info.index) {
        dragStart.current = { x: e.pageX, y: e.pageY };
        pickCardAnim(api, props);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMove);
      } else if (orderCache.current[0] === info.index) {
        toTopCardAnim(api);
        changeOrder(
          orderCache.current.slice(1).concat([info.index]),
          info.index
        );
      }
    }
  };

  const Handlers = {
    onMouseDown: handleMouseDown,
    onDragOver: defaultPreventor,
    onDragStart: defaultPreventor,
  };

  const result: MyHook = { Refs: {}, Handlers, Styles: props };
  return result;
}
