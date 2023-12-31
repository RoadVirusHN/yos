import { animated, to } from "@react-spring/web";
import { shadowFilt } from "@utils/MyAnimation";
import ClassNames from "./CardFrontFace.module.scss";
import { type CardComponentProps } from "../Card";
import { type AllCardData, type CardStates } from "@data/CardProcessors";

const CardFrontFace = ({
  cardStates,
  props,
}: {
  cardStates: CardStates<AllCardData>;
  props: CardComponentProps<AllCardData>;
}) => {
  const { gray, blur } = props.cardAnimController.AnimStates.AnimValues;
  return (
    <animated.div
      className={`${ClassNames.front} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], shadowFilt),
      }}
    >
      <cardStates.FrontFace.Component {...props} />
    </animated.div>
  );
};
export default CardFrontFace;
