import { CardRef } from "./CardCommon/CardHook";
import PjtCard from "./PjtCard/PjtCard";
import {
  AllCardInfoType,
  CardTypeEnum,
  EndCardInfo,
  PjtCardInfo,
  TutorialCardInfo,
} from "@customTypes/Cards";

type AnyCardProps = {
  info: AllCardInfoType;
  ref: React.ForwardedRef<CardRef>;
  changeOrder: (value: number[], except: number) => void;
  getOrder: () => number[];
};
const AnyCard = ({ info, ref, changeOrder, getOrder }: AnyCardProps) => {
  let Card;
  switch (info.type) {
    case CardTypeEnum.PROJTECT:
      Card = (
        <PjtCard
          key={info.index}
          info={info as PjtCardInfo}
          ref={ref}
          changeOrder={changeOrder}
          getOrder={getOrder}
        />
      );
      break;
    case CardTypeEnum.TUTORIAL:
      Card = (
        <TutoCard
          key={info.index}
          info={info as TutorialCardInfo}
          ref={ref}
          changeOrder={changeOrder}
          getOrder={getOrder}
        />
      );
      break;
    case CardTypeEnum.END:
      Card = (
        <EndCard
          key={info.index}
          info={info as EndCardInfo}
          ref={ref}
          changeOrder={changeOrder}
          getOrder={getOrder}
        />
      );
      break;

    default:
      Card = <></>;
      break;
  }
  return <>{Card}</>;
};

export default AnyCard;
