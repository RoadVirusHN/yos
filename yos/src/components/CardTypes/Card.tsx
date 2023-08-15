import {
  type SpringRef,
  type SpringValues,
  animated,
  to,
  useSpring,
} from "react-spring";
import ClassNames from "./Card.module.scss";
import { trans } from "@utils/MyAnimation";
import useDefaultCardHandlers from "./CardComponents/useDefaultCardHandlers";
import { type DeckStyles } from "@components/Deck/Deck";
import { CardAnimStates, type CardStyles } from "@data/CardData";
import useSpringValueListner from "@lib/Animation/useSpringValueListener";
import CardFrontFace from "./CardComponents/CardFrontFace";
import CardBackFace from "./CardComponents/CardBackFace";
import { type AllCardData } from "@data/CardProcessors";
import AnimController from "@lib/Animation/AnimController";
export interface CardProps {
  cardData: AllCardData;
  deckAnimAPI: {
    setDeckAnim: SpringRef<DeckStyles>;
    deckAnim: SpringValues<DeckStyles>;
  };
}

export interface CardComponentProps<CardData> {
  cardData: CardData;
  cardAnimController: AnimController<CardAnimStates, CardStyles>;
  deckAnimAPI: {
    setDeckAnim: SpringRef<DeckStyles>;
    deckAnim: SpringValues<DeckStyles>;
  };
}
const Card = ({ cardData, deckAnimAPI }: CardProps) => {
  const cardStates = cardData.Type(cardData);
  const [cardAnimValues, cardAnimRef] = useSpring<CardStyles>(() =>
    CardAnimStates.prototype.StateInit(
      cardStates.Index,
      deckAnimAPI.deckAnim.order.get().length
    )
  );
  const cardAnimAPI = {
    AnimRef: cardAnimRef as unknown as SpringRef<CardStyles>,
    AnimValues: cardAnimValues as SpringValues<CardStyles>,
  };
  const cardAnimController = new AnimController<CardAnimStates, CardStyles>(
    new CardAnimStates(cardAnimAPI)
  );
  const PropForComponents = {
    cardData,
    cardAnimController,
    deckAnimAPI,
  };
  const Handlers = useDefaultCardHandlers(PropForComponents);

  const SpringValueListener = useSpringValueListner(deckAnimAPI.deckAnim, {
    order: Handlers.onChangeOrder,
    mode: Handlers.onChangeMode,
  });
  const { x, y, z, rx, ry, rz, cursor, scale, ratio, shadow } =
    cardAnimAPI.AnimValues;
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
