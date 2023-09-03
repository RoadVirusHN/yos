import { DirectionEnum } from "@data/Enums";
import { IndexItemAnimStates, IndexItemStyles } from "@data/IndexItemData";
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
import { ScalableSVGWrapper } from "@lib/SVG/ScalableSVG";
import classNames from "./IndexList.module.scss";

const AnimatedDot = animated(Dot);
const IndexItem = ({
  itemInfo,
  deckAnimController,
}: {
  itemInfo: { tooltip: ReactElement; index: number };
  deckAnimController: AnimController<DeckAnimStates, DeckStyles>;
}) => {
  const [value, ref] = useSpring<IndexItemStyles>(() => {
    const isTop =
      deckAnimController.AnimStates.AnimValues.order.get().at(-1) ===
      itemInfo.index;
    return IndexItemAnimStates.prototype.StateInit(isTop);
  });
  const deckStateListener = useSpringValueListner(
    deckAnimController.AnimStates.AnimValues,
    {
      order: (order) => {
        ref.start(() => {
          const isTop = itemInfo.index === (order.at(-1) ?? 0);
          return IndexItemAnimStates.prototype.StateInit(isTop);
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
      className={classNames.index}
      style={{
        y: value.y,
      }}
    >
      <TooltipWrapper
        tooltip={itemInfo.tooltip}
        content={
          <ScalableSVGWrapper
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
          />
        }
        initialOpacity={1}
        initialDirection={DirectionEnum.BOTTOM}
      />
      {deckStateListener}
    </animated.div>
  );
};
export default IndexItem;
