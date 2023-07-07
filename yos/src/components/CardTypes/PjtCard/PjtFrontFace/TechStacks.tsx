import ClassNames from "./PjtFrontFace.module.scss";
/**
 * cool slide effect! : https://codepen.io/ykadosh/pen/KKezJzz
 * tech logo!
 */
const TechStacks = ({ techs }: { techs: [string] }) => {
  return (
    <div className={ClassNames.techStacks} style={{ height: "20%" }}>
      {techs.map((tech, i) => (
        <div className={ClassNames.tech} key={i}>
          {tech}
        </div>
      ))}
    </div>
  );
};

export default TechStacks;
