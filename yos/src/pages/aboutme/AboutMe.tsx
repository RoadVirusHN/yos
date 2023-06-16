import Logo from "./components/Logo";
import Cards from "./components/cards/Cards";
import "./AboutMe.scss";

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
