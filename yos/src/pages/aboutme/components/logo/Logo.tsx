import { animated } from "react-spring";
import Class from "./utils/Logo.module.scss";
import useLogoHook from "./utils/LogoHook";
/**
 * !!!Todos
 * - responsive compatibility
 */

// stolen from https://github.com/pmndrs/use-gesture/blob/main/documentation/pages/HeroSandbox/index.js#L153
// and https://codesandbox.io/s/pf74x?file=/src/App.tsx
export default function Logo() {
  const { Refs, Handlers, Styles } = useLogoHook();
  return (
    <div className={Class.logoContainer}>
      <animated.div
        ref={Refs.logo}
        className={Class.logo}
        style={Styles.logo}
        {...Handlers.logo}
      >
        <animated.div className={Class.logoReflection} style={Styles.reflection} />
        <animated.div className={Class.logoText} style={Styles.text}>
          ROADVIRUSHN  
          {/* When change it, you need to change text in hard coded content in ./utils/Logo.module.scss.*/}
        </animated.div>
       
      </animated.div>
    </div>
  );
}
