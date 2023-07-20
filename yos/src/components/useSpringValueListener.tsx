import { animated, to } from "react-spring";
import { AnimatedStyles } from "src/animations/AnimController";

type Handlers<T extends AnimatedStyles<any>> = {
  [K in keyof T]: (v: ReturnType<T[K]["get"]>) => void; // 'T' only refers to a type, but is being used as a value here.ts(2693)
};

const useSpringValueListner = <T extends AnimatedStyles<any>>(
  props: T,
  handlers: Handlers<T>
) => {
  return (
    <>
      {Object.keys(props).map((prop, i) => (
        <animated.div
          key={i}
          style={{
            display: "none",
            content: to([props[prop]], (v) => {
              handlers[prop](v);
              return "";
            }),
          }}
        ></animated.div>
      ))}
    </>
  );
};
export default useSpringValueListner;
