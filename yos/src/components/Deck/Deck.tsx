import ClassNames from "./Deck.module.scss";
import Card from "../CardTypes/Card";
import { useSpring } from "@react-spring/web";
import { type AllCardData } from "@data/CardProcessors";
import SquiggleFilter from "../CardTypes/CardComponents/Filters/SquiggleFilter";
import IndexList from "./IndexList/IndexList";
import AnimController from "@lib/Animation/AnimController";
import { DeckAnimStates } from "@data/DeckData";
/**
 * !!!Todos
 * - responsive compatibility
 * - animation transition chaining
 * - cards fly from outside -> need to initiate when scrolled!
 */

export interface DeckStyles {
  mode: "DECK";
  order: number[];
  beforOrder: number[];
}

export default function Deck({ cardDatas }: { cardDatas: AllCardData[] }) {
  const [AnimValues, AnimRef] = useSpring<DeckStyles>(() =>
    DeckAnimStates.prototype.StateInit(cardDatas.map((data) => data.Index))
  );
  const deckAnimController = new AnimController<DeckAnimStates, DeckStyles>(
    new DeckAnimStates(AnimRef, AnimValues),
    `portfolioDeck`
  );
  return (
    <div className={ClassNames.overflowHider}>
      <SquiggleFilter />
      <IndexList
        items={cardDatas.map((data) => ({
          tooltip: <>{data.Description.Title ?? "Cover"}</>,
          index: data.Index,
        }))}
        animController={deckAnimController}
      />
      <div className={ClassNames.deck}>
        {cardDatas.map((data) => {
          return (
            <Card
              key={data.Index}
              cardData={data}
              deckAnimController={deckAnimController}
            />
          );
        })}
      </div>
    </div>
  );
}
