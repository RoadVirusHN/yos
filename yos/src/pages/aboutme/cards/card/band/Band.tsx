import ClassNames from "../Card.module.scss";
import { animated, to } from "react-spring";
import { ReactComponent as Default } from "src/assets/img/cards/bands/DEFAULT.svg"; 
import { ReactComponent as InProgress } from "src/assets/img/cards/bands/INPROGRESS.svg"; 
import { ReactComponent as DONE } from "src/assets/img/cards/bands/DONE.svg"; 
import { ReactComponent as DROPPED } from "src/assets/img/cards/bands/DROPPED.svg"; 
import { ReactComponent as POSTPONED } from "src/assets/img/cards/bands/POSTPONED.svg";
import { useState } from "react";
import { filt } from "src/utils/Animation";
import { BandStatus, BandEnum } from "src/data/CardsData";

const BandMapper = (
  status: BandStatus,
  newHandler: { [onEvent: string]: any }
) => {
  switch (status) {
    case BandEnum.INPROGRESS:
      return <InProgress {...newHandler} />;
    case BandEnum.DROPPED:
      return <DROPPED {...newHandler} />;
    case BandEnum.POSTPONED:
      return <POSTPONED {...newHandler} />;
    case BandEnum.DONE:
      return <DONE {...newHandler} />;
    default:
      return <Default {...newHandler} />;
  }
};
const Band = ({
  beforeMouseDown,
  handlers,
  status,
  styles,
}: {
  beforeMouseDown: (e: React.MouseEvent) => string;
  handlers: { [onEvent: string]: any };
  status: BandStatus;
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
      {side === "front" ? (
        <Default {...newHandler} />
      ) : (
        BandMapper(status, newHandler)
      )}
    </animated.div>
  );
};

export default Band;
