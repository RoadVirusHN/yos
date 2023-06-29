import { CardInfoBackInfos } from "../../../../../utils/CardsData";
import InfoMapper from "./components/InfoMapper";
import Teammates from "./components/Teammates";
import ClassNames from "./BackInfo.module.scss";
import IconLink from "./components/IconLink";

const BackInfo = ({
  backInfo,
  width,
  height,
}: {
  backInfo: CardInfoBackInfos;
  width: number;
  height: number;
}) => {
  return (
    <div
      className={ClassNames.backInfoContainer}
      style={{ width: height, height: width }}
    >
      <Teammates teamSize={backInfo.teammates} />
      <InfoMapper infos={backInfo.infos} />
      <IconLink links={backInfo.links} />
    </div>
  );
};

export default BackInfo;
