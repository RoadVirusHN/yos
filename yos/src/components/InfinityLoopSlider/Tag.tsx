import ClassNames from "./InfinityLoopSlider.module.scss";
const Tag = ({
  text,
  color: bgcolor = "#334155",
}: {
  text: string;
  color?: string;
}) => (
  <div className={ClassNames.tag} style={{ backgroundColor: bgcolor }}>
    <span>#</span> {text}
  </div>
);

export default Tag;
