import { ReactComponent as Cloud } from "src/assets/img/cards/serviceCloud/Cloud.svg";
import ClassNames from "./ServiceCloud.module.scss";
import { SpringValue, animated, config, to, useSpring } from "react-spring";
import { filt } from "src/utils/Animation";
import React, { useEffect, useState } from "react";
import ServerStatus from "./ServerStatus";
const ServiceCloud = ({
  isTop,
  styles,
  url,
}: {
  isTop: SpringValue<number>;
  styles: {
    gray: number;
    blur: number;
  };
  url: string;
}) => {
  const [status, _setStatus] = useState("checking");
  const [{ scale }, api] = useSpring(() => ({
    scale: 1,
  }));

  const onHover = (e: React.MouseEvent) => {
    api.start(() => ({
      from: {},
      to: [
        {
          scale: 1.2,
        },
      ],
      config: config.wobbly,
    }));
  };
  const onHoverOut = (e: React.MouseEvent) => {
    api.start(() => ({
      from: {},
      to: [
        {
          scale: 1,
        },
      ],
      config: config.wobbly,
    }));
  };

  useEffect(() => {
    //fetch with url
    //fetch().then(res=>setStatus(res.json()))
  }, []);
  return (
    <animated.div
      className={ClassNames.serviceOverlay}
      onMouseOver={onHover}
      onMouseOut={onHoverOut}
      style={{
        filter: to([styles.gray, styles.blur], filt),
        transform: to([isTop, scale], (isTop, scale) => {
          return `rotateZ(${(1 - isTop) * 160}deg) scale(${isTop * scale})`;
        }),
      }}
    >
      <div className={ClassNames.serviceDesc}>
        {url === "" ? (
          <span>Service InAccessible</span>
        ) : status === "ready" ? (
          <span>Click to Access This Service!</span>
        ) : status === "checking" ? (
          <span>Checking...</span>
        ) : status === "pending" ? (
          <span>Pending...</span>
        ) : status === "stopped" ? (
          <span>Click to Restart Server!</span>
        ) : (
          <span>Error!</span>
        )}
      </div>
      <a className={ClassNames.ServiceAccess} href="d">
        <ServerStatus status={url === "" ? "unavailable" : status} />
        <Cloud className={ClassNames.cloud} />
      </a>
    </animated.div>
  );
};

export default ServiceCloud;
