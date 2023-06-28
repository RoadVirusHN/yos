import { ReactComponent as Me } from "./assets/mePicto.svg";
import { ReactComponent as Teammate } from "./assets/teammatePicto.svg";
import { ReactComponent as Solo } from "./assets/soloPicto.svg";
import ClassNames from "../BackInfo.module.scss";

const Teammates = ({ teamSize }: { teamSize: number }) => {
  return (
    <div className={ClassNames.team}>
      {teamSize === 1 ? <Solo /> : <Me />}
      {teamSize > 6 ? (
        <>
          <span>+</span> <Teammate /> <span>&times; {teamSize - 1}</span>
        </>
      ) : (
        Array.from(Array(teamSize - 1).keys()).map((i) => <Teammate key={i} />)
      )}
    </div>
  );
};

export default Teammates;
