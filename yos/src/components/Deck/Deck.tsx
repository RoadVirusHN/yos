import ClassNames from './Deck.module.scss';
import Card from '../CardTypes/Card';
import { useSpring } from 'react-spring';
import { type AllCardData } from 'src/data/CardProcessors';
import SquiggleFilter from '../CardTypes/CardComponents/Filters/SquiggleFilter';
/**
 * !!!Todos
 * - responsive compatibility
 * - animation transition chaining
 * - cards fly from outside -> need to initiate when scrolled!
 */

export interface DeckStyles {
  mode: 'DECK'
  order: number[]
}

export default function Deck ({ cardDatas }: { cardDatas: AllCardData[] }) {
  const [deckAnim, setDeckAnim] = useSpring<DeckStyles>(() => ({
    order: cardDatas.map((data) => data.Index),
    mode: 'DECK'
  }));

  const deckAnimAPI = {
    setDeckAnim,
    deckAnim
  };
  return (
    <div className={ClassNames.overflowHider}>
      <SquiggleFilter />
      <div className={ClassNames.deck}>
        {cardDatas.map((data) => {
          return (
            <Card
              key={data.Index}
              cardData={data}
              deckAnimAPI={deckAnimAPI}
            />
          );
        })}
      </div>
    </div>
  );
}
