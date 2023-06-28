import { filt } from "../../utils/CardHelpers";
import ClassNames from "./FrontFace.module.scss";
import { animated, to } from "react-spring";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FrontFace = ({
  preview,
  gray,
  blur,
}: {
  preview: string;
  gray: number;
  blur: number;
}) => {
  return (
    <animated.div
      className={`${ClassNames.front} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <picture>
        <LazyLoadImage
          className={ClassNames.preview}
          alt="dorf"
          effect="opacity"
          placeholder={<div>some lazy loading spinner</div>}
          src={preview}
        />
      </picture>
    </animated.div>
  );
};

export default FrontFace;
