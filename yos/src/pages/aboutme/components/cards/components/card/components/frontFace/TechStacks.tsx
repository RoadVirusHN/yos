import ClassNames from "./FrontFace.module.scss";
/**
 * cool slide effect! : https://codepen.io/ykadosh/pen/KKezJzz
 * tech logo!
 */
const TechStacks = ({ techs }: { techs: [string] }) => {
  return (
    <div className={ClassNames.techStacks} style={{ height: "100%" }}>
      {techs.map((tech) => (
        <div className={ClassNames.tech}>{tech}</div>
      ))}
    </div>
  );
};

export default TechStacks;
