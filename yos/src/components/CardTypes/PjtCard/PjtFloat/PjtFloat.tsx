import { type CardComponentData, type PjtCardData } from "@data/CardProcessors";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { animated, config, to, useSpring } from "react-spring";
import ClassNames from "./PjtFloat.module.scss";
import { useEffect, useState } from "react";
import { shadowFilt } from "@utils/MyAnimation";
import Cloud from "@assets/commons/serviceCloud/Cloud.svg";
import { ServerStatusEnum } from "@data/Enums";
import ServerStatus from "./ServerStatus";

const PjtFloat = (pjtInfo: PjtCardData): CardComponentData<PjtCardData> => ({
  Data: pjtInfo.Float,
  Component: ({
    cardData,
    cardAnimController,
  }: CardComponentProps<PjtCardData>) => {
    const [url, _] = useState((cardData as PjtCardData).Float.URL);
    const [status, _setStatus] = useState<ServerStatusEnum>(
      ServerStatusEnum.CHECKING
    );
    const [{ scale }, api] = useSpring(() => ({
      scale: 1,
    }));

    const { gray, blur, isTop } = cardAnimController.AnimStates.AnimValues;
    const onHover = (_e: React.MouseEvent) => {
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
    const onHoverOut = (_e: React.MouseEvent) => {
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
      // fetch with url
      // fetch().then(res=>setStatus(res.json()))
    }, []);
    let serviceDesc = <span>Service InAccessible</span>;
    if (url !== "") {
      switch (status) {
        case ServerStatusEnum.READY:
          serviceDesc = <span>Click to Access This Service!</span>;
          break;
        case ServerStatusEnum.CHECKING:
          serviceDesc = <span>Checking...</span>;
          break;
        case ServerStatusEnum.PENDING:
          serviceDesc = <span>Pending...</span>;
          break;
        case ServerStatusEnum.STOPPED:
          serviceDesc = <span>Click to Restart Server!</span>;
          break;
        default:
          serviceDesc = <span>Error!</span>;
      }
    }
    return (
      <animated.div
        className={ClassNames.float}
        onMouseOver={onHover}
        onMouseOut={onHoverOut}
        style={{
          filter: to([gray, blur], shadowFilt),
          transform: to([isTop, scale], (isTop, scale) => {
            return `rotateZ(${(1 - isTop) * 160}deg) scale(${isTop * scale})`;
          }),
          backgroundImage: `url(${Cloud})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      >
        <div className={ClassNames.serviceDesc}>{serviceDesc}</div>
        <ServerStatus
          status={
            (url === ""
              ? ServerStatusEnum.UNAVAILABLE
              : status) as ServerStatusEnum
          }
        />
      </animated.div>
    );
  },
});

export default PjtFloat;
