import Cards from "./components/cards/Cards";
import "./AboutMe.scss";
import Logo from "./components/logo/Logo";

function AboutMe() {
  return (
    <div className="container">
      <div className="wrapper">
        <Cards />
      </div>
        {/* <Logo /> */}
      {/* <div className="bg">I'm sticky</div> */}
    </div>
  );
}
/**
 * animation component should be the minimum set of animation-sharing components.
 */
export default AboutMe;
