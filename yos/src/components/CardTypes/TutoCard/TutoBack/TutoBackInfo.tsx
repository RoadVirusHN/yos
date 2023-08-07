import ClassNames from "./TutoBack.module.scss";
import { ScalableSVGWrapper } from "src/components/ScalableSVG";
import TutoBack from "src/assets/components/TutoCard/doodles/tutoBack/TutoBack";

const TutoBackInfo = ({
  backInfo: _,
  width,
  height,
}: {
  backInfo: { Src: string };
  width: number;
  height: number;
}): JSX.Element => {
  return (
    <div
      className={ClassNames.backInfoContainer}
      style={{ width: height, height: width, padding: "5px" }}
    >
      <ScalableSVGWrapper content={<TutoBack />} />
    </div>
  );
};

export default TutoBackInfo;
