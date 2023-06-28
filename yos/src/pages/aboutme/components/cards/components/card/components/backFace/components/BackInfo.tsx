import { BandStatus } from "../../../../../utils/CardsData";
import InfoMapper from "./components/InfoMapper";
import Teammates from "./components/Teammates";
import ClassNames from "./BackInfo.module.scss";

const BackInfo = ({
  backInfo,
  width,
  height,
}: {
  backInfo: {
    team: number;
    date: string;
    role: string;
    status: BandStatus;
    description: string;
    teammates: number;
    term: string;
  };
  width: number;
  height: number;
}) => {
  return (
    <div
      className={ClassNames.backInfoContainer}
      style={{ width: height, height: width }}
    >
      <Teammates teamSize={backInfo.teammates} />
      <InfoMapper infos={backInfo} />
    </div>
  );
};

export default BackInfo;
