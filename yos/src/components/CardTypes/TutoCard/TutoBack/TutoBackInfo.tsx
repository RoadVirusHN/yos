import { useEffect, useState } from "react";
import ClassNames from "./TutoBack.module.scss";
import { ScalableSVGWrapper } from "src/components/ScalableSVG";

const TutoBackInfo = ({
  backInfo,
  width,
  height,
}: {
  backInfo: { Src: string };
  width: number;
  height: number;
}) => {
  const [DoodleComponent, setDoodle] = useState<() => JSX.Element>();
  useEffect(() => {
    const loadModule = async () => {
      try {
        const dynamicImport = await import(`src/assets/${backInfo.Src}`);

        const YourComponent = dynamicImport.default || dynamicImport;
        setDoodle(() => YourComponent);
      } catch (error) {
        console.error("Failed to load module:", error);
      }
    };

    loadModule();
  }, [backInfo.Src]);
  return (
    <div
      className={ClassNames.backInfoContainer}
      style={{ width: height, height: width, padding: "5px" }}
    >
      <ScalableSVGWrapper
        content={DoodleComponent ? <DoodleComponent /> : <div>Loading...</div>}
      />
    </div>
  );
};

export default TutoBackInfo;
