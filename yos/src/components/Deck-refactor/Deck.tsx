import ClassNames from "./Deck.module.scss";
import Card from "../CardTypes-refactor/Card";
import { useSpring } from "react-spring";
import { AllCardDatas } from "src/data/CardProcessors";
import SquiggleFilter from "../CardTypes-refactor/CardComponents/Filters/SquiggleFilter";
/**
 * !!!Todos
 * - responsive compatibility
 * - animation transition chaining
 * - cards fly from outside -> need to initiate when scrolled!
 */

export type DeckStyles = {
  mode: "DECK";
  order: number[];
};

export default function Deck({ cardDatas }: { cardDatas: AllCardDatas[] }) {
  const indexedCardDatas = cardDatas.map((data, i) => ({ ...data, index: i }));
  const [deckAnim, setDeckAnim] = useSpring<DeckStyles>(() => ({
    order: indexedCardDatas.map((data) => data.index),
    mode: "DECK",
  }));

  const deckAnimAPI = {
    setDeckAnim,
    deckAnim,
  };
  return (
    <div className={ClassNames.overflowHider}>
      <SquiggleFilter />
      <div className={ClassNames.deck}>
        {indexedCardDatas.map((data) => {
          return (
            <Card
              key={data.index}
              indexedCardData={data}
              deckAnimAPI={deckAnimAPI}
            />
          );
        })}
      </div>
    </div>
  );
}
