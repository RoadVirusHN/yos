import { animated, to } from "react-spring";
import { faceFilt } from "@utils/MyAnimation";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { type AllCardData, type CardStates } from "@data/CardProcessors";
import ClassNames from "./CardBackFace.module.scss";

const CardBackFace = ({
  cardStates,
  props,
}: {
  cardStates: CardStates<AllCardData>;
  props: CardComponentProps<AllCardData>;
}) => {
  const { gray, blur } = props.cardAnimController.AnimStates.AnimValues;
  return (
    <animated.div
      className={`${ClassNames.back} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], faceFilt),
      }}
    >
      <cardStates.BackFace.Component {...props} />
    </animated.div>
  );
};
export default CardBackFace;
