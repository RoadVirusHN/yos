import Cards from "./cards/Cards";
import "./AboutMe.scss";
// import Logo from "./logo/Logo";
// import Loading from "src/components/Loading/Loading";

function AboutMe() {
  return (
    <div className="container">
      <div className="wrapper">
        {/* <div style={{width: "500px", height: "500px", }}>
          <Loading />
        </div> */}
        {/* <Logo /> */}
        <Cards />
      </div>
    </div>
  );
}
/**
 * animation component should be the minimum set of animation-sharing components.
 */
export default AboutMe;
