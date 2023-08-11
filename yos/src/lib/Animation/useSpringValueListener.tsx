import { type Lookup, type SpringValues, animated, to } from 'react-spring';

type Handlers<T extends SpringValues<Lookup<any>>> = {
  [K in keyof T]: (_v: ReturnType<T[K]['get']>) => void; 
};

const useSpringValueListner = <T extends SpringValues<Lookup<any>>>(
  props: T,
  handlers: Handlers<T>
) => {
  return (
    <>
      {Object.keys(props).map((prop, i) => (
        <animated.div
          key={i}
          style={{
            display: 'none',
            content: to([props[prop]], (v) => {
              handlers[prop](v);
              return '';
            })
          }}
        ></animated.div>
      ))}
    </>
  );
};
export default useSpringValueListner;