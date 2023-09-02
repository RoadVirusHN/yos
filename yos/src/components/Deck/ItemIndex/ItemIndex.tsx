import { DeckAnimStates } from "@data/DeckData";
import AnimController from "@lib/Animation/AnimController";
import { DeckStyles } from "../Deck";
import { ReactComponent as CaretLeft } from "@assets/commons/icons/caret-left.svg";
import { ReactComponent as CaretRight } from "@assets/commons/icons/caret-right.svg";
import ClassNames from "./ItemIndex.module.scss";
import { useDrag } from "@use-gesture/react";
import { ReactElement } from "react";
import { moveFirstToLast, moveLastToFirst } from "@utils/MyArray";
import { ScalableSVGWrapper } from "@lib/SVG/ScalableSVG";
import Item from "./Item";

const ItemIndex = ({
  items,
  animController,
}: {
  items: { tooltip: ReactElement; index: number }[];
  animController: AnimController<DeckAnimStates, DeckStyles>;
}) => {  
  const reversedItems = [...items].reverse();
  const caretLeftBind = useDrag(
    ({ tap }) => {
      if (tap) {
        let newOrder = animController.AnimStates.AnimValues.order.get();
        animController.TransitionTo.StateShuffle(moveLastToFirst(newOrder));
      }
    },
    { filterTaps: true }
  );
  const caretRightBind = useDrag(
    ({ tap }) => {
      if (tap) {
        let newOrder = animController.AnimStates.AnimValues.order.get();
        animController.TransitionTo.StateShuffle(moveFirstToLast(newOrder));
      }
    },
    { filterTaps: true }
  );
  return (
    <div className={ClassNames.itemIndex}>
      <div
        className={`${ClassNames.caret} ${ClassNames.left}`}
        {...caretLeftBind()}
      >
        <ScalableSVGWrapper content={<CaretLeft />} />
      </div>
      {reversedItems.map((v, i) => (
        <Item key={i} itemInfo={v} deckAnimController={animController} />
      ))}
      <div
        className={`${ClassNames.caret} ${ClassNames.right}`}
        {...caretRightBind()}
      >
        <ScalableSVGWrapper content={<CaretRight />} />
      </div>
    </div>
  );
};
export default ItemIndex;
