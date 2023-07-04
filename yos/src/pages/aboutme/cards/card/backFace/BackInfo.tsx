import { CardInfoBackInfos } from "src/data/CardsData";
import InfoMapper from "./InfoMapper";
import Teammates from "./Teammates";
import ClassNames from "./BackInfo.module.scss";
import IconLink from "./IconLink";

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
