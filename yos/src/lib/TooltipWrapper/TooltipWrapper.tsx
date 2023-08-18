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
    case DirectionEnum.TOP:
      return ClassNames.TOP;
    case DirectionEnum.BOTTOM:
      return ClassNames.DOBOTTOMWN;
    case DirectionEnum.LEFT:
      return ClassNames.LEFT;
    case DirectionEnum.RIGHT:
      return ClassNames.RIGHT;
    default:
      return ClassNames.TOP;
  }
};

const TooltipWrapper = ({
  content,
  tooltip,
  initialOpacity = 1,
  initialDirection = DirectionEnum.TOP,
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
    <div {...bind()} className={`${ClassNames.tooltipWrapper}`}>
      <animated.div
        className={`${ClassNames.tooltipContent}`}
        style={{ opacity }}
      >
        {content}
      </animated.div>
      <animated.div
        className={`${ClassNames.tooltip} ${directionClassMapper(
          initialDirection
        )}`}
        style={{ opacity: tooltipOpacity }}
      >
        {tooltip}
        <i></i>
      </animated.div>
    </div>
  );
};

export default TooltipWrapper;
