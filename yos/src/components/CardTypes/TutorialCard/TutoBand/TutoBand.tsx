import ClassNames from "./TutoBand.module.scss";
import { animated, to } from "react-spring";
import { ReactComponent as Default } from "src/assets/img/cards/bands/DEFAULT.svg";
import { useState } from "react";
import { filt } from "src/utils/Animation";

const TutoBand = ({
  beforeMouseDown,
  handlers,
  styles,
}: {
  beforeMouseDown: (e: React.MouseEvent) => string;
  handlers: { [onEvent: string]: any };
  styles: {
    gray: number;
    blur: number;
  };
}) => {
  const [side, setSide] = useState("front");

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSide(beforeMouseDown(e));
  };
  const { gray, blur } = styles;
  const newHandler = {
    onMouseDown,
    onDragOver: handlers.onDragOver,
    onDragStart: handlers.onDragStart,
  };
  return (
    <animated.div
      className={ClassNames.band}
      style={{
        filter: to([gray, blur], filt),
      }}
      draggable="false"
    >
      {side === "front" ? <Default {...newHandler} /> : <></>}
    </animated.div>
  );
};

export default TutoBand;
