import { DirectionEnum } from "@data/Enums";
import { animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { ReactNode } from "react";
import { useSpring } from "react-spring";
import ClassNames from "./TooltipWrapper.module.scss";

interface TooltipWrapperProps {
  tooltip: ReactNode;
  content: ReactNode;
  initialOpacity?: number;
  initialDirection?: DirectionEnum;
}

const directionClassMapper = (initialDirection: DirectionEnum) => {
  switch (initialDirection) {
    case DirectionEnum.UP:
      return ClassNames.UP;
    case DirectionEnum.DOWN:
      return ClassNames.DOWN;
    case DirectionEnum.LEFT:
      return ClassNames.LEFT;
    case DirectionEnum.RIGHT:
      return ClassNames.RIGHT;
    default:
      return ClassNames.UP;
  }
};

const TooltipWrapper = ({
  content,
  tooltip,
  initialOpacity = 1,
  initialDirection = DirectionEnum.UP,
}: TooltipWrapperProps) => {
  const [values, ref] = useSpring(() => ({
    opacity: initialOpacity,
    tooltipOpacity: 0,
  }));
  const { opacity, tooltipOpacity } = values;
  const bind = useGesture(
    {
      onHover: ({ hovering, first }) => {
        ref.start({
          opacity: hovering && first ? 1 : initialOpacity,
          tooltipOpacity: hovering && first ? 1 : 0,
        });
      },
    },
    {}
  );
  return (
    <div {...bind()} className={`${ClassNames.toolipWrapper}`}>
      <animated.div className={`${ClassNames.tooltip}`} style={{ opacity }}>
        {content}
      </animated.div>
      <animated.div
        className={`${ClassNames.tooltiptext} ${directionClassMapper(
          initialDirection
        )}`}
        style={{ opacity: tooltipOpacity }}
      >
        {tooltip}
      </animated.div>
    </div>
  );
};

export default TooltipWrapper;
