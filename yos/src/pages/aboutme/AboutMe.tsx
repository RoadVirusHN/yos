import ClassNames from "./AboutMe.module.scss";
import Portfolio from "./Portfolio";
// import Logo from "./logo/Logo";
// import Loading from "src/components/Loading/Loading";

function AboutMe() {
  return (
    <div className={ClassNames.container}>
      <div className={ClassNames.wrapper}>
        {/* <div style={{width: "500px", height: "500px", }}>
          <Loading />
        </div> */}
        {/* <Logo /> */}
        <Portfolio />
      </div>
    </div>
  );
}
/**
 * animation component should be the minimum set of animation-sharing components.
 */
export default AboutMe;
