import { ReactComponent as Me } from "src/assets/img/cards/teams/mePicto.svg";
import { ReactComponent as Teammate } from "src/assets/img/cards/teams/teammatePicto.svg";
import { ReactComponent as Solo } from "src/assets/img/cards/teams/soloPicto.svg";
import ClassNames from "./BackInfo.module.scss";
import ScalableSVGWrapper from "src/components/ScalableSVG";

const Teammates = ({ teamSize }: { teamSize: number }) => {
  return (
    <div className={ClassNames.team}>
      {teamSize === 1 ? (
        <span className={ClassNames.meTheKing}>
          <ScalableSVGWrapper content={<Solo />} />
        </span>
      ) : (
        <span className={ClassNames.me}>
          <ScalableSVGWrapper content={<Me />} />
        </span>
      )}
      {teamSize > 6 ? (
        <>
          <span>+</span>{" "}
          <span className={ClassNames.teammate}>
            <ScalableSVGWrapper content={<Teammate />} />
          </span>
          <span>&times; {teamSize - 1}</span>
        </>
      ) : (
        Array.from(Array(teamSize - 1).keys()).map((i) => (
          <Teammate key={i} className={ClassNames.teammate} />
        ))
      )}
    </div>
  );
};

export default Teammates;
