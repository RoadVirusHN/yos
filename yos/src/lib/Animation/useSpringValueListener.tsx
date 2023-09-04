import { type Lookup, type SpringValues, animated, to } from "@react-spring/web";

type Handlers<T extends SpringValues<Lookup<any>>> = {
  [K in keyof T]: (_v: ReturnType<T[K]["get"]>) => void;
};

const useSpringValueListner = <T extends SpringValues<Lookup<any>>>(
  props: T,
  handlers: Handlers<T>
) => {
  return (
    <>
      {Object.keys(props).map((prop, i) => {
        if (prop !== "AnimConfig") {
          return (
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
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
export default useSpringValueListner;
