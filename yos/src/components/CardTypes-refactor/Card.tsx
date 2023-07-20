import { Lookup, SpringRef, animated, to, useSpring } from "react-spring";
import ClassNames from "./Card.module.scss";
import { trans } from "src/utils/MyAnimation";
import useDefaultCardHandlers from "./CardComponents/useDefaultCardHandlers";
import { DeckStyles } from "src/components/Deck-refactor/Deck";
import { CardStyles, animationData } from "src/data/CardData";
import useSpringValueListner from "../useSpringValueListener";
import CardFrontFace from "./CardComponents/CardFrontFace";
import CardBackFace from "./CardComponents/CardBackFace";
import { useState } from "react";
import { CardStates, IndexedCardData } from "src/data/CardProcessors";
import { AnimatedStyles } from "src/animations/AnimController";
import { CardAnimController } from "src/animations/CardAnim";
export type CardProps = {
  indexedCardData: IndexedCardData;
  deckAnimAPI: {
    setDeckAnim: SpringRef<DeckStyles>;
    deckAnim: AnimatedStyles<DeckStyles>;
  };
};

export interface CardComponentProps {
  indexedCardData: IndexedCardData;
  cardAnimController: CardAnimController;
}
const Card = ({ indexedCardData, deckAnimAPI }: CardProps) => {
  const [cardStates, setCardStates] = useState<CardStates>(
    indexedCardData.type(indexedCardData)
  );
  const [cardAnim, setCardAnim] = useSpring<CardStyles>(() =>
    animationData.states.stateInit(
      cardStates.index,
      deckAnimAPI.deckAnim.order.get().length
    )
  );
  const cardAnimAPI = { setCardAnim, cardAnim };
  const cardAnimController = new CardAnimController(cardAnimAPI, deckAnimAPI);
  const PropForComponents = {
    indexedCardData,
    cardAnimController,
  };
  const Handlers = useDefaultCardHandlers(PropForComponents);

  const SpringValueListener = useSpringValueListner(deckAnimAPI.deckAnim, {
    order: Handlers.onChangeOrder,
    mode: Handlers.onChangeMode,
  });
  const { x, y, z, rx, ry, rz, cursor, scale } = cardAnim;
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
            transform: to([rx, ry, rz, scale], trans),
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
