import { DirectionEnum } from "@data/Enums";
import { ItemIndexAnimStates, ItemIndexStyles } from "@data/ItemIndexData";
import AnimController from "@lib/Animation/AnimController";
import useSpringValueListner from "@lib/Animation/useSpringValueListener";
import { ReactComponent as Dot } from "@assets/components/ItemIndex/IndexDot.svg";
import TooltipWrapper from "@lib/TooltipWrapper/TooltipWrapper";
import { useDrag } from "@use-gesture/react";
import { sliceThenConcat } from "@utils/MyArray";
import { animated, useSpring } from "react-spring";
import { DeckAnimStates } from "@data/DeckData";
import { DeckStyles } from "../Deck";
import { ReactElement } from "react";

const AnimatedDot = animated(Dot);
const Item = ({
  itemInfo,
  deckAnimController,
}: {
  itemInfo: { tooltip: ReactElement; index: number };
  deckAnimController: AnimController<DeckAnimStates, DeckStyles>;
}) => {
  const [value, ref] = useSpring<ItemIndexStyles>(() => {
    const isTop =
      deckAnimController.AnimStates.AnimValues.order.get().at(-1) ===
      itemInfo.index;
    return ItemIndexAnimStates.prototype.StateInit(isTop);
  });
  const deckStateListener = useSpringValueListner(
    deckAnimController.AnimStates.AnimValues,
    {
      order: (order) => {
        ref.start(() => {
          const isTop = itemInfo.index === (order.at(-1) ?? 0);
          return ItemIndexAnimStates.prototype.StateInit(isTop);
        });
      },
      mode: () => {},
      beforOrder: () => {},
    }
  );
  const bind = useDrag(
    ({ tap, args }) => {
      const index = args[0] as number;
      let newOrder = deckAnimController.AnimStates.AnimValues.order.get();
      if (tap) {
        deckAnimController.TransitionTo.StateShuffle(
          sliceThenConcat(newOrder, index)
        );
      }
    },
    { filterTaps: true }
  );
  return (
    <animated.div
      style={{
        y: value.y,
      }}
    >
      {deckStateListener}
      <TooltipWrapper
        tooltip={itemInfo.tooltip}
        content={
          <AnimatedDot
            {...bind(itemInfo.index)}
            style={{
              fill: value.fill.to((r, g, b) => `rgb(${r},${g},${b})`),
              transform: value.scale.to((scale) => `scale(${scale})`),
              touchAction: "none",
            }}
          />
        }
        initialOpacity={1}
        initialDirection={DirectionEnum.BOTTOM}
      />
    </animated.div>
  );
};
export default Item;
