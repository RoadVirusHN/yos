import { SpringRef, animated, to, useSpring } from "react-spring";
import ClassNames from "./Card.module.scss";
import { trans } from "src/utils/MyAnimation";
import useDefaultCardHandlers from "./CardComponents/useDefaultCardHandlers";
import { DeckStyles } from "src/components/Deck/Deck";
import { CardStyles, animationData } from "src/data/CardData";
import useSpringValueListner from "../useSpringValueListener";
import CardFrontFace from "./CardComponents/CardFrontFace";
import CardBackFace from "./CardComponents/CardBackFace";
import { useState } from "react";
import {
  AllCardData,
  CardStates,
  PjtCardData,
  TutoCardData,
} from "src/data/CardProcessors";
import { AnimatedStyles } from "src/animations/AnimController";
import { CardAnimController } from "src/animations/CardAnim";
export type CardProps = {
  cardData: AllCardData;
  deckAnimAPI: {
    setDeckAnim: SpringRef<DeckStyles>;
    deckAnim: AnimatedStyles<DeckStyles>;
  };
};

export interface CardComponentProps {
  cardData: AllCardData;
  cardAnimController: CardAnimController;
}
const Card = ({ cardData, deckAnimAPI }: CardProps) => {
  let cardStates: any;
  if ("Float" in cardData) {
    cardStates = (cardData as PjtCardData).Type(cardData as PjtCardData);
  } else {
    // cardData is of type TutoCardData
    cardStates = (cardData as TutoCardData).Type(cardData as TutoCardData);
  }
  const [cardAnim, setCardAnim] = useSpring<CardStyles>(() =>
    animationData.states.stateInit(
      cardStates.Index,
      deckAnimAPI.deckAnim.order.get().length
    )
  );
  const cardAnimAPI = { setCardAnim, cardAnim };
  const cardAnimController = new CardAnimController(
    cardData,
    cardAnimAPI,
    deckAnimAPI
  );
  const PropForComponents = {
    cardData,
    cardAnimController,
  };
  const Handlers = useDefaultCardHandlers(PropForComponents);

  const SpringValueListener = useSpringValueListner(deckAnimAPI.deckAnim, {
    order: Handlers.onChangeOrder,
    mode: Handlers.onChangeMode,
  });
  const { x, y, z, rx, ry, rz, cursor, scale, ratio, shadow } = cardAnim;
  const { onMouseDown, onDragOver, onDragStart } = Handlers;
  const CardBodyHandlers = { onMouseDown, onDragOver, onDragStart };
  return (
    <>
      {SpringValueListener}
      <cardStates.Description.Component {...PropForComponents} />
      <animated.div className={ClassNames.cardWrapper} style={{ x, y, z }}>
        <cardStates.Float.Component {...PropForComponents} />
        <animated.div
          className={ClassNames.card}
          {...CardBodyHandlers}
          {...cardStates.AdditionalHandlers(PropForComponents)}
          style={{
            cursor,
            transform: to([rx, ry, rz, scale, ratio], trans),
            aspectRatio: ratio.to((v) => {
              if (v === 1) return "1 / 1  ";
              return "89 / 64";
            }),
            boxShadow: shadow.to((shadow) =>
              shadow
                ? "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)"
                : ""
            ),
          }}
        >
          <CardFrontFace cardStates={cardStates} props={PropForComponents} />
          <CardBackFace cardStates={cardStates} props={PropForComponents} />
          <cardStates.CommonFace.Component {...PropForComponents} />
        </animated.div>
      </animated.div>
    </>
  );
};
export default Card;
