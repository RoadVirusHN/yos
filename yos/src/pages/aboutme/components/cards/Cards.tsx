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
 * - onMouseUp global EventHandler for debugging.
 * - cards fly from outside -> need to initiate when scrolled!
 */

export default function Cards() {
  const order = useRef(Array.from(infos, (info) => info["index"])); // backward queue
  const children = useRef(Array.from(infos, (info) => React.createRef()));
  const titleRef = useRef(null);
  const changeOrder = (value: number[], except: number) => {
    order.current = value;
    children.current.forEach((child) => {
      if (child && child.current) {
        (child as RefObject<CardRef>).current!.stackUp(except);
      }
    });
    (titleRef as RefObject<SquigRef>).current!.updateProject(
      order.current.at(-1) || 0
    );
  };
  const getOrder = () => order.current;
  return (
    <div className={ClassNames.deckContainer}>
      <SquigTitle
        squigVisible="visible"
        ref={titleRef as RefObject<SquigRef>}
      />
      <div className={ClassNames.deck}>
        {infos.map((info) => (
          <Card
            key={info.index}
            info={info}
            ref={children.current[info.index] as RefObject<CardRef>}
            changeOrder={changeOrder}
            getOrder={getOrder}
          />
        ))}
      </div>
    </div>
  );
}
