import { AllCardInfoType, EndCardInfo, PjtCardInfo, TutorialCardInfo } from "@customTypes/Card";
import { CardRef } from "../CardTypes/CardCommon/CardHook";
import SquiggleFilter from "../CardTypes/CardCommon/Filters/SquiggleFilter";
import ClassNames from "./Deck.module.scss";
import { RefObject, useRef } from "react";
import React from "react";
import CardDescription, {
  DescRef,
} from "../CardTypes/CardCommon/CardDescription";
import cardComponentMap from "./cardMapper";
/**
 * !!!Todos
 * - responsive compatibility
 * - more information about card. // title https://codepen.io/lbebber/pen/KwGEQv
 * - animation transition chaining
 * - cards fly from outside -> need to initiate when scrolled!
 */

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
              info={info as PjtCardInfo & TutorialCardInfo & EndCardInfo}
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
