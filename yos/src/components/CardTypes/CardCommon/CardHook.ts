import { SpringValue, useSpring } from "react-spring";
import { animationData, flickableDistance } from "src/data/CardData";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { CardAnimations } from "src/animations/CardAnim";
import { MyHook } from "@customTypes/MyHook";
import { getManhattanDistance } from "src/utils/MyMath";

export function canFlick(props: { [keys: string]: SpringValue<number> }) {
  const [dX, dY] = [Math.abs(props.x.get()), Math.abs(props.y.get())];
  const flickable = dX > flickableDistance.w || dY > flickableDistance.h;
  return flickable;
}

export type CardRef = {
  stackUp: (except: number) => void;
};

export default function useCardHook(
  info: { [key: string]: any },
  changeOrder: (value: number[], except: number) => void,
  getOrder: () => number[],
  selfRef: React.ForwardedRef<CardRef>
): MyHook {
  const [props, api] = useSpring(() => animationData.initialProps(info.index));
  const orderCache = useRef(getOrder());
  const dragStart = useRef({ x: -1, y: -1 });
  const cardAnim = new CardAnimations();

  const memoizedGetOrder = useCallback(getOrder, [getOrder]);

  useImperativeHandle(selfRef, () => ({
    stackUp: (except: number) => {
      if (info.index !== except) {
        cardAnim.toDeckCardAnim(
          api,
          props,
          memoizedGetOrder().indexOf(info.index)
        );
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
    // only dragging&top card can be moved.

    if (e.buttons === 1 && orderCache.current.at(-1) === info.index) {
      const fr = { x: e.pageX, y: e.pageY };
      const dragDist = getManhattanDistance(fr, dragStart.current);

      if (canFlick(props)) {
        cardAnim.setFlickableCardAnim(api, props);
      } else {
        cardAnim.setFloatCardAnim(api, props);
      }
      cardAnim.cardFollowCursorAnim(api, props, dragDist);
    } else if (
      dragStart.current.x !== -1 &&
      dragStart.current.y !== -1 &&
      e.buttons === 0
    ) {
      handleMouseUp(e);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    orderCache.current = memoizedGetOrder();
    // only top card can be placed.
    if (orderCache.current.at(-1) === info.index) {
      const flickable = canFlick(props);
      if (flickable) {
        changeOrder(
          [info.index].concat(
            orderCache.current.filter((ele) => ele !== info.index)
          ),
          info.index
        );
      }
      cardAnim.putCardAnim(api, props, flickable);
      dragStart.current = { x: -1, y: -1 };
    }
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mousemove", handleMove);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      // when clicked
      orderCache.current = memoizedGetOrder();
      if (orderCache.current.at(-1) === info.index) {
        // pick card animation.
        dragStart.current = { x: e.pageX, y: e.pageY };
        cardAnim.pickCardAnim(api, props);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMove);
      } else if (orderCache.current[0] === info.index) {
        // floor card to top
        cardAnim.toTopCardAnim(api, props);
        changeOrder(
          orderCache.current.slice(1).concat([info.index]),
          info.index
        );
      }
    }
  };

  const beforeBandMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.button === 0) {
      orderCache.current = memoizedGetOrder();
      if (
        orderCache.current.at(-1) === info.index ||
        orderCache.current[0] === info.index
      ) {
        cardAnim.flipCardAnim(api, props);
      }
    }
    return props.side.get();
  };

  const Handlers = {
    onMouseDown: handleMouseDown,
    onDragOver: defaultPreventor,
    onDragStart: defaultPreventor,
  };

  const result: MyHook = {
    Refs: {},
    Handlers: {
      card: Handlers,
      band: {
        onMouseDown: beforeBandMouseDown,
        onDragOver: defaultPreventor,
        onDragStart: defaultPreventor,
      },
    },
    Styles: {
      ...props,
    },
  };
  return result;
}
