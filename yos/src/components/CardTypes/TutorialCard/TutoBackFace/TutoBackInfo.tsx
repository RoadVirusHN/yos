import { ReactElement } from "react";
import ClassNames from "./TutoBackFace.module.scss";
import ScalableSVGWrapper from "src/components/ScalableSVG";

const TutoBackInfo = ({
  backInfo,
  width,
  height,
}: {
  backInfo: ReactElement;
  width: number;
  height: number;
}) => {
  return (
    <div
      className={ClassNames.backInfoContainer}
      style={{ width: height, height: width }}
    >
      <ScalableSVGWrapper content={backInfo} />
    </div>
  );
};

export default TutoBackInfo;
