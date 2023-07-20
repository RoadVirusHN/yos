import { CardComponentData, IndexedCardData } from "src/data/CardProcessors";
import { CardComponentProps } from "src/components/CardTypes-refactor/Card";
import { animated, config, to, useSpring } from "react-spring";
import ClassNames from "./PjtFloat.module.scss";
import { useEffect, useState } from "react";
import { filt } from "src/utils/MyAnimation";
import ServerStatus from "./ServerStatus";
import Cloud from "src/assets/img/cards/serviceCloud/Cloud.svg";

const PjtFloat = (pjtInfo: IndexedCardData): CardComponentData<"Float"> => ({
  data: pjtInfo.Float,
  Component: ({
    indexedCardData,
    cardAnimController: ctrl,
  }: CardComponentProps) => {
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
        className={ClassNames.float}
        onMouseOver={onHover}
        onMouseOut={onHoverOut}
        style={{
          filter: to(
            [ctrl.cardAnimAPI.cardAnim.gray, ctrl.cardAnimAPI.cardAnim.blur],
            filt
          ),
          transform: to(
            [ctrl.cardAnimAPI.cardAnim.isTop, scale],
            (isTop, scale) => {
              return `rotateZ(${(1 - isTop) * 160}deg) scale(${
                isTop * (scale as number)
              })`;
            }
          ),
          backgroundImage: `url(${Cloud})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className={ClassNames.serviceDesc}>
          {indexedCardData.Float.URL === "" ? (
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
        <ServerStatus
          status={indexedCardData.Float.URL === "" ? "unavailable" : status}
        />
      </animated.div>
    );
  },
});

export default PjtFloat;
