import { ReactComponent as Dunno } from "./dunno.svg";
import ClassNames from "../../utils/Card.module.scss";
import { ReactComponent as Unavailable } from "./unavailable.svg";
import { animated, useSpring } from "react-spring";
const ServerStatus = ({ status }: { status: string }) => {
  return (
    <div className={ClassNames.serverStatus}>
      {status === "checking" ? (
        <Dunno />
      ) : status === "unavailable" ? (
        <Unavailable />
      ) : (
        <Blinker status={status} />
      )}
    </div>
  );
};

const Blinker = ({ status }: { status: string }) => {
  let color;
  switch (status) {
    case "ready":
      color = "#5C9F44";
      break;
    case "pending":
      color = "#EED22F";
      break;
    case "stopped":
      color = "#C9274C";
      break;
    default:
      color = "black"; // do not set it to grey!
      break;
  }
  const props = useSpring({
    from: { fill: color, config: { duration: 1000 } },
    to: [
      { fill: "grey", config: { duration: 100 } },
      { fill: color, config: { duration: 1000 } },
      { fill: "grey", config: { duration: 100 } },
    ],
    loop: true,
  });
  return (
    <animated.svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      filter="url(#squiggly) drop-shadow( 2px 2px 3px rgba(50, 50, 50, .7))"
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M23.0345 9.47826C23.0345 14.713 18.7735 18.9565 13.5172 18.9565C8.26101 18.9565 4 14.713 4 9.47826C4 4.24356 8.26101 0 13.5172 0C18.7735 0 23.0345 4.24356 23.0345 9.47826Z" />
      </g>
    </animated.svg>
  );
};

export default ServerStatus;
