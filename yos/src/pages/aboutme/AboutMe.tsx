import Cards from "./components/cards/Cards";
import "./AboutMe.scss";
import Logo from "./components/logo/Logo";

function AboutMe() {
  return (
    <div className="container">
      <Cards />
      <div className="wrapper">
        <Logo />
      </div>
      {/* <div className="bg">I'm sticky</div> */}
    </div>
  );
}

export default AboutMe;
