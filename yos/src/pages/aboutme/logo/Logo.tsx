import { animated } from "react-spring";
import ClassNames from "./Logo.module.scss";
import useLogoHook from "./LogoHook";
import React from "react";
/**
 * !!!Todos
 * - responsive compatibility
 * - refactoring like cards.
 */

// stolen from https://github.com/pmndrs/use-gesture/blob/main/documentation/pages/HeroSandbox/index.js#L153
// and https://codesandbox.io/s/pf74x?file=/src/App.tsx
export default function Logo() {
  const { Refs, Handlers, Styles } = useLogoHook();
  return (
    <div className={ClassNames.logoContainer}>
      <animated.div
        ref={Refs.logo}
        className={ClassNames.logo}
        style={Styles.logo}
        {...Handlers.logo}
      >
        <animated.div
          className={ClassNames.logoReflection}
          style={Styles.reflection}
        />
        <animated.div className={ClassNames.logoText} style={Styles.text}>
          ROADVIRUSHN
          {/* When change it, you need to change text in hard coded content in ./utils/Logo.module.scss.*/}
        </animated.div>
      </animated.div>
    </div>
  );
}
