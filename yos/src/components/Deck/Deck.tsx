import { AllCardInfoType, PjtCardInfo } from "@customTypes/Card";
import { CardRef } from "../CardTypes/CardCommon/CardHook";
import SquiggleFilter from "../CardTypes/CardCommon/Filters/SquiggleFilter";
import ClassNames from "./Deck.module.scss";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import React from "react";
import CardDescription, {
  DescRef,
} from "../CardTypes/CardCommon/CardDescription";
import cardMapper from "./cardMapper";
import cardComponentMap from "./cardMapper";
/**
 * !!!Todos
 * - responsive compatibility
 * - more information about card. // title https://codepen.io/lbebber/pen/KwGEQv
 * - animation transition chaining
 * - cards fly from outside -> need to initiate when scrolled!
 */
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
export default function Deck({ cardInfos }: { cardInfos: AllCardInfoType[] }) {
  const order = useRef<number[]>(Array.from(cardInfos, (info) => info.index)); // backward queue
  const children = useRef<RefObject<CardRef>[]>(
    Array.from(cardInfos, (_info) => React.createRef())
  );
  const descRef = useRef<DescRef>(null);
  const changeOrder = (value: number[], except: number) => {
    order.current = value;

    children.current.forEach((child) => {
      if (child.current) {
        child.current!.stackUp(except);
      }
    });
    if (descRef.current) {
      descRef.current.updateProject(order.current.at(-1) as number);
    }
  };
  const getOrder = () => order.current;
  const [_width, _height] = useWindowSize();

  return (
    <div className={ClassNames.deckContainer}>
      <SquiggleFilter />
      <CardDescription ref={descRef} cardInfos={cardInfos} />
      <div className={ClassNames.deck}>
        {cardInfos.map((info) => {
          const CardComponent = cardComponentMap[info.type];
          return (
            <CardComponent
              key={info.index}
              info={info as PjtCardInfo}
              ref={children.current[info.index]}
              changeOrder={changeOrder}
              getOrder={getOrder}
            />
          );
        })}
      </div>
    </div>
  );
}
