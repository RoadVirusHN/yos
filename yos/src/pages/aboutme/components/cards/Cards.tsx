import Card from "./components/card/Card";
import { CardRef } from "./components/card/utils/CardHook";
import Doodle, { DoodleRef } from "./components/doodle/Doodle";
import SquiggleFilter from "./components/squiggleFilter/SquiggleFilter";
import ClassNames from "./utils/Cards.module.scss";
import { projects as infos } from "./utils/CardsData";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import React from "react";
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
  console.log(size);

  return size;
}
export default function Cards() {
  const order = useRef<number[]>(Array.from(infos, (info) => info.index)); // backward queue
  const children = useRef<RefObject<CardRef>[]>(
    Array.from(infos, (_info) => React.createRef())
  );
  const DoodleRef = useRef<DoodleRef>(null);
  const changeOrder = (value: number[], except: number) => {
    order.current = value;

    children.current.forEach((child) => {
      if (child.current) {
        child.current!.stackUp(except);
      }
    });
    if (DoodleRef.current) {
      DoodleRef.current.updateProject(order.current.at(-1) as number);
    }
  };
  const getOrder = () => order.current;
  const [_width, _height] = useWindowSize();

  return (
    <div className={ClassNames.deckContainer}>
      <SquiggleFilter />
      <Doodle ref={DoodleRef} />
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
