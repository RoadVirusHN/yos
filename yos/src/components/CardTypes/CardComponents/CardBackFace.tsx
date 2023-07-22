import { useRef, useState, useEffect } from "react";
import { animated, to } from "react-spring";
import { filt } from "src/utils/MyAnimation";
import { CardComponentProps } from "src/components/CardTypes/Card";
import { AllCardData, CardStates } from "src/data/CardProcessors";
import ClassNames from "./CardBackFace.module.scss";

const CardBackFace = ({
  cardStates,
  props,
}: {
  cardStates: CardStates<AllCardData>;
  props: CardComponentProps;
}) => {
  const { gray, blur } = props.cardAnimController.cardAnimAPI.cardAnim;
  return (
    <animated.div
      className={`${ClassNames.back} ${ClassNames.face}`}
      style={{
        filter: to([gray, blur], filt),
      }}
    >
      <cardStates.BackFace.Component {...props} />
    </animated.div>
  );
};
export default CardBackFace;
