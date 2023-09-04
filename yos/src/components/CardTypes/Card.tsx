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
import { DeckAnimStates } from "@data/DeckData";
export interface CardProps {
  cardData: AllCardData;
  deckAnimController: AnimController<DeckAnimStates, DeckStyles>;
}

export interface CardComponentProps<CardData> {
  cardData: CardData;
  cardAnimController: AnimController<CardAnimStates, CardStyles>;
  deckAnimController: AnimController<DeckAnimStates, DeckStyles>;
}
const Card = ({ cardData, deckAnimController }: CardProps) => {
  const cardStates = cardData.Type(cardData);
  const [cardAnimValues, cardAnimRef] = useSpring<CardStyles>(() =>
    CardAnimStates.prototype.StateInit(
      cardStates.Index,
      deckAnimController.AnimStates.AnimValues.order.get().length
    )
  );
  const cardAnimController = new AnimController<CardAnimStates, CardStyles>(
    new CardAnimStates(
      cardAnimRef as unknown as SpringRef<CardStyles>,
      cardAnimValues as SpringValues<CardStyles>
    ),
    `${cardData.Index}`
  );
  const PropForComponents = {
    cardData,
    cardAnimController,
    deckAnimController,
  };
  const Handlers = useDefaultCardHandlers(PropForComponents);

  const SpringValueListener = useSpringValueListner(
    deckAnimController.AnimStates.AnimValues,
    {
      order: Handlers.onChangeOrder,
      mode: Handlers.onChangeMode,
      beforOrder: () => {},
    }
  );
  const { x, y, z, rx, ry, rz, cursor, scale, ratio } =
    cardAnimValues as SpringValues<CardStyles>;

  return (
    <>
      {SpringValueListener}
      <cardStates.Description.Component {...PropForComponents} />
      <animated.div className={ClassNames.cardWrapper} style={{ x, y, z }}>
        <cardStates.Float.Component {...PropForComponents} />
        <animated.div
          className={ClassNames.card}
          {...Handlers.bind()}
          {...cardStates.AdditionalHandlers(PropForComponents)}
          style={{
            cursor,
            transform: to(
              [rx, ry, rz, scale, ratio] as unknown as [
                rx: number,
                ry: number,
                rz: number,
                s: number,
                r: string
              ],
              trans
            ),
            aspectRatio: ratio,
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
