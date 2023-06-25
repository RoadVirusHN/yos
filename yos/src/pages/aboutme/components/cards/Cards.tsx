import ClassNames from "./utils/Cards.module.scss";
import { projects as infos } from "./utils/CardsData";
import Card from "./card/Card";
import { RefObject, useRef } from "react";
import { CardRef } from "./card/utils/CardHook";
import React from "react";
import SquigTitle, { SquigRef } from "./card/title/SquigTitle";
/**
 * !!!Todos
 * - responsive compatibility
 * - more information about card. // title https://codepen.io/lbebber/pen/KwGEQv
 * - animation transition chaining
 * - cards fly from outside -> need to initiate when scrolled!
 */

export default function Cards() {
  const order = useRef<number[]>(Array.from(infos, (info) => info["index"])); // backward queue
  const children = useRef<RefObject<CardRef>[]>(
    Array.from(infos, (_info) => React.createRef())
  );
  const titleRef = useRef<SquigRef>(null);
  const changeOrder = (value: number[], except: number) => {
    order.current = value;
    
    children.current.forEach((child) => {
      if (child.current) {
        child.current!.stackUp(except);
      }
    });
    if (titleRef.current) {
      titleRef.current.updateProject(order.current.at(-1) as number);
    }
  };
  const getOrder = () => order.current;
  return (
    <div className={ClassNames.deckContainer}>
      <SquigTitle ref={titleRef} />
      <div className={ClassNames.deck}>
        {infos.map((info) => (
          <Card
            key={info.index}
            info={info}
            ref={children.current[info.index]}
            changeOrder={changeOrder}
            getOrder={getOrder}
          />
        ))}
      </div>
    </div>
  );
}
