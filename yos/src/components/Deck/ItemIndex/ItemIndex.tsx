import { DeckAnimStates } from "@data/DeckData";
import AnimController from "@lib/Animation/AnimController";
import { DeckStyles } from "../Deck";
import { ReactComponent as Dot } from "@assets/components/ItemIndex/IndexDot.svg";
import ClassNames from "./ItemIndex.module.scss";
import { animated, useSprings } from "react-spring";
import useSpringValueListner from "@lib/Animation/useSpringValueListener";
import TooltipWrapper from "@lib/TooltipWrapper/TooltipWrapper";
import { DirectionEnum } from "@data/Enums";

const AnimatedDot = animated(Dot);
const ItemIndex = ({
  items,
  AnimController,
}: {
  items: number[];
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

  const SpringValueListener = useSpringValueListner(
    AnimController.AnimStates.AnimValues,
    {
      order: (order) => {
        refs.start((idx) => {
          const isTop = items[idx] === order.at(-1);
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
  return (
    <div className={ClassNames.itemIndex}>
      {SpringValueListener}
      {values.reverse().map((v, i) => (
        <TooltipWrapper
          tooltip={<>asdfasdfasdf</>}
          content={
            <AnimatedDot
              key={i}
              style={{
                fill: v.fill.to((r, g, b) => `rgb(${r},${g},${b})`),
                transform: v.scale.to((scale) => `scale(${scale})`),
                y: v.y,
              }}
            />
          }
          initialOpacity={1}
          initialDirection={DirectionEnum.TOP}
        />
      ))}
    </div>
  );
};
export default ItemIndex;
