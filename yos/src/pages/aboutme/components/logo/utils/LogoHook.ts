import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";
import { animationData } from "./LogoData";
import {
  calcX,
  calcY,
  refelctionDefaultFunction,
  reflect,
  xText,
  yText,
} from "./LogoHelpers";
import { MyHook } from "../../../../../types/MyHook";
import { toEmphasizeAnim, toIdleAnim, toRotateAnim } from "./LogoAnim";

export default function useLogoHook(): MyHook {
  // Create Refs, States and Handlers, Styles then return them.

  const { initialProps, states } = animationData;
  const [logoStyles, apiLogo] = useSpring(() => initialProps.logo);
  const [textStyles, apiText] = useSpring(() => initialProps.text);
  const [reflectionStyles, apiReflection] = useSpring(
    () => initialProps.reflection
  );

  const rect = useRef<DOMRect | null>(null);
  const refLogo = useRef<HTMLDivElement>(null);
  const prevAngleTurns = useRef([135, 0]);

  const onMouseDown = (_e: React.MouseEvent) => {
    toEmphasizeAnim(
      states.stateIdle(refelctionDefaultFunction(prevAngleTurns)),
      { apiLogo, apiText }
    );
  };

  const onMouseUpandLeave = (_e: React.MouseEvent) => {
    toIdleAnim(states.stateEmphasize(), { apiLogo, apiText, apiReflection });
  };

  useEffect(() => {
    const onMouseMove : toRotateAnim = (e: MouseEvent) => {
      rect.current = refLogo.current!.getBoundingClientRect();
      apiLogo.start({
        rotateX: calcX(e.pageY, rect),
        rotateY: calcY(e.pageX, rect),
      });
      apiText.start({ y: yText(e.pageY), x: xText(e.pageX), scale: 1.3 });
      apiReflection.start({
        background: reflect(e.pageX, e.pageY, rect, prevAngleTurns),
      });
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [apiLogo, apiReflection, apiText]);

  return {
    Refs: {
      logo: refLogo,
    },
    Handlers: {
      logo: {
        onMouseDown,
        onMouseUp: onMouseUpandLeave,
        onMouseLeave: onMouseUpandLeave,
      },
    },
    Styles: {
      logo: logoStyles,
      reflection: reflectionStyles,
      text: textStyles,
    },
  };
}
