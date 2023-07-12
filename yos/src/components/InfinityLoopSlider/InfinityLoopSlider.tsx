import ClassNames from "./InfinityLoopSlider.module.scss";
/**
 * cool slide effect! : https://codepen.io/ykadosh/pen/KKezJzz
 */

const Tag = ({ text }: { text: string }) => (
  <div className={ClassNames.tag}>
    <span>#</span> {text}
  </div>
);

const InfiniteLoopSlider = ({ tags }: { tags: string[] }) => {
  return (
    <div className={ClassNames.sliderContainer}>
        <div className={ClassNames.loopSlider}>
          <div className={ClassNames.inner}>
            {tags.map((name, i) => (
              <Tag key={i} text={name} />
            ))}
            {tags.map((name, i) => (
              <Tag key={i} text={name} />
            ))}
          </div>
        </div>
        <div className={ClassNames.fade} />
    </div>
  );
};

export default InfiniteLoopSlider;
