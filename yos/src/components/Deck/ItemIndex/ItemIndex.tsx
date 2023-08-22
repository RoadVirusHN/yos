import { DeckAnimStates } from "@data/DeckData";
import AnimController from "@lib/Animation/AnimController";
import { DeckStyles } from "../Deck";
import { ReactComponent as Dot } from "@assets/components/ItemIndex/IndexDot.svg";
import ClassNames from "./ItemIndex.module.scss";
import { animated, useSprings } from "react-spring";
import useSpringValueListner from "@lib/Animation/useSpringValueListener";
import TooltipWrapper from "@lib/TooltipWrapper/TooltipWrapper";
import { DirectionEnum } from "@data/Enums";
import { useDrag } from "@use-gesture/react";
import { ReactElement } from "react";
import { sliceThenConcat } from "@utils/MyArray";

const AnimatedDot = animated(Dot);
const ItemIndex =
  // <
  //   State extends AnimStates<DeckStyles>
  //   // Styles extends Lookup<any>
  // >
  ({
    items,
    AnimController,
  }: {
    items: { tooltip: ReactElement; index: number }[];
    AnimController: AnimController<DeckAnimStates, DeckStyles>;
  }) => {
    const [values, refs] = useSprings(items.length, (idx) => {
      const isTop = items[idx] === items.at(-1);
      return {
        scale: isTop ? 1.3 : 1,
        fill: isTop ? [232, 239, 249] : [182, 199, 219],
        y: isTop ? 0 : 10,
      };
    });
    const reversedItems = items.slice().reverse();

    const SpringValueListener = useSpringValueListner(
      AnimController.AnimStates.AnimValues,
      {
        order: (order) => {
          refs.start((idx) => {
            const isTop = items[idx].index === (order.at(-1) ?? 0);
            return {
              scale: isTop ? 1.3 : 1,
              fill: isTop ? [232, 239, 249] : [152, 169, 189],
              y: isTop ? 0 : 10,
            };
          });
        },
        mode: () => {},
        beforOrder: () => {},
      }
    );
    const bind = useDrag(({ tap, args }) => {
      const index = args[0] as number;
      let newOrder = items.map((v) => v.index);
      if (tap) {
        AnimController.TransitionTo.StateShuffle(
          sliceThenConcat(newOrder, index)
        );
      }
    }, {});
    return (
      <div className={ClassNames.itemIndex}>
        {SpringValueListener}
        {values.reverse().map((v, i) => (
          <animated.div
            style={{
              y: v.y,
            }}
          >
            <TooltipWrapper
              key={i}
              tooltip={reversedItems[i].tooltip}
              content={
                <AnimatedDot
                  {...bind(reversedItems[i].index)}
                  style={{
                    fill: v.fill.to((r, g, b) => `rgb(${r},${g},${b})`),
                    transform: v.scale.to((scale) => `scale(${scale})`),
                    touchAction: "none",
                  }}
                />
              }
              initialOpacity={1}
              initialDirection={DirectionEnum.LEFT}
            />
          </animated.div>
        ))}
      </div>
    );
  };
export default ItemIndex;
