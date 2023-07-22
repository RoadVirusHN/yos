import { CardComponentProps } from "src/components/CardTypes/Card";
import { animated, to } from "react-spring";
import ClassNames from "./TutoDesc.module.scss";
import { CardComponentData, TutoCardData } from "src/data/CardProcessors";
import { useEffect, useState } from "react";

type DescData = { Src: string };

const TutoDesc = (
  tutoData: TutoCardData
): CardComponentData<"Description", TutoCardData> => ({
  Data: tutoData.Description,
  Component: ({ cardData, cardAnimController }: CardComponentProps) => {
    const { Src } = cardData.Description as DescData;
    const [DoodleComponent, setDoodle] = useState<() => JSX.Element>();
    useEffect(() => {
      const loadModule = async () => {
        try {
          const dynamicImport = await import(
            `src/assets/${Src}`);
          const YourComponent = dynamicImport.default || dynamicImport;
          setDoodle(() => YourComponent);
        } catch (error) {
          console.error("Failed to load module:", error);
        }
      };

      loadModule();
    }, [Src]);

    return <>{DoodleComponent ? <DoodleComponent /> : <div>Loading...</div>}</>;
  },
});

export default TutoDesc;
