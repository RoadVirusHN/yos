import ClassNames from "./TutoBack.module.scss";
import { ScalableSVGWrapper } from "@lib/SVG/ScalableSVG";
import TutoBack from "@assets/components/TutoCard/doodles/tutoBack/TutoBack";

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
      style={{ width: height, height: width}}
    >
      <ScalableSVGWrapper content={<TutoBack />} />
    </div>
  );
};

export default TutoBackInfo;
