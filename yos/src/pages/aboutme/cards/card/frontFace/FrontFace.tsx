import { filt } from "src/utils/animation";
import ClassNames from "./FrontFace.module.scss";
import { animated, to } from "react-spring";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TechStacks from "./TechStacks";
/**
 * tap, click to full screen effect!
 */
const FrontFace = ({
  frontInfo,
  gray,
  blur,
}: {
  frontInfo: {
    preview: string;
    techs: [string];
  };
  gray: number;
  blur: number;
}) => {
  const enterFullscreen = (e: React.MouseEvent) => {
    if ((e.target as HTMLImageElement).requestFullscreen) {
      (e.target as HTMLImageElement).requestFullscreen();
    }
  };
  return (
    <animated.div
      className={`${ClassNames.front} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <picture onDoubleClick={enterFullscreen}>
          <LazyLoadImage
            className={ClassNames.preview}
            alt="dorf"
            effect="opacity"
            placeholder={<div>some lazy loading spinner</div>}
            src={frontInfo.preview}
          />
        </picture>
        <TechStacks techs={frontInfo.techs} />
      </div>
    </animated.div>
  );
};

export default FrontFace;
