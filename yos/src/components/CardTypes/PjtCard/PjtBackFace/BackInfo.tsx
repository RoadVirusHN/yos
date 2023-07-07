import InfoMapper from "src/components/InfoMapper/InfoMapper";
import Teammates from "./Teammates";
import ClassNames from "./BackInfo.module.scss";
import IconLink from "../../../IconLink/IconLink";
import { PjtCardBackInfos } from "@customTypes/Card";

const BackInfo = ({
  backInfo,
  width,
  height,
}: {
  backInfo: PjtCardBackInfos;
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
