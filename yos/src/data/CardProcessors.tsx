import { BandStatus, CardType } from "@customTypes/Card";
import { CardComponentProps } from "src/components/CardTypes/Card";
import { TagType } from "src/components/InfinityLoopSlider/InfinityLoopSlider";
import { InfoItem } from "src/components/InfoMapper/InfoMapper";
import { CardTypeEnum } from "./enums/enums";
import PjtBack from "src/components/CardTypes/PjtCard/PjtBack/PjtBack";
import PjtCommon from "src/components/CardTypes/PjtCard/PjtCommon/PjtCommon";
import PjtDesc from "src/components/CardTypes/PjtCard/PjtDesc/PjtDesc";
import PjtFloat from "src/components/CardTypes/PjtCard/PjtFloat/PjtFloat";
import PjtFront from "src/components/CardTypes/PjtCard/PjtFront/PjtFront";
import TutoCommon from "src/components/CardTypes/TutoCard/TutoCommon/TutoCommon";
import TutoBack from "src/components/CardTypes/TutoCard/TutoBack/TutoBack";
import TutoFront from "src/components/CardTypes/TutoCard/TutoFront/TutoFront";
import TutoDesc from "src/components/CardTypes/TutoCard/TutoDesc/TutoDesc";

type ExcludeIndex<T> = Pick<T, Exclude<keyof T, "index">>;

export type CardComponentData<T extends keyof ExcludeIndex<U>, U> = {
  Data: ExcludeIndex<U>[T];
  Component: React.ComponentType<CardComponentProps>;
};

const EmptyComponent = {
  Data: null,
  Component: ({ cardAnimController }: CardComponentProps) => {
    return <></>;
  },
};

export type CardStates<T> = {
  Index: number;
  Type: CardType;
  Description: CardComponentData<keyof ExcludeIndex<T>, T>;
  Float: CardComponentData<keyof ExcludeIndex<T>, T>;
  FrontFace: CardComponentData<keyof ExcludeIndex<T>, T>;
  BackFace: CardComponentData<keyof ExcludeIndex<T>, T>;
  CommonFace: CardComponentData<keyof ExcludeIndex<T>, T>;
  AdditionalHandlers: (props: CardComponentProps) => {
    [key: string]: (e: Event) => any;
  };
};
export type AllCardData = PjtCardData | TutoCardData;

export type TutoCardData = {
  Type: (cardData: TutoCardData) => CardStates<TutoCardData>;
  Index: number;
  Description: { Src: string };
  FrontFace: {};
  BackFace: { Src: string };
  CommonFace: { Status: BandStatus };
};
export type PjtCardData = {
  Type: (cardData: PjtCardData) => CardStates<PjtCardData>;
  Index: number;
  Description: { Title: string; Subtitle: string; Doodle: string };
  Float: { URL: string };
  FrontFace: {
    VideoURL: string;
    TechStacks: TagType[];
  };
  BackFace: {
    Teammates: number;
    Infos: InfoItem[];
    Links: InfoItem[];
  };
  CommonFace: { Status: BandStatus };
};

export const TutoCardProcessor = (
  cardData: TutoCardData
): CardStates<TutoCardData> => {
  return {
    Index: cardData.Index,
    Type: CardTypeEnum.TUTORIAL,
    Description: TutoDesc(cardData),
    Float: EmptyComponent as any,
    FrontFace: TutoFront(cardData),
    BackFace: TutoBack(cardData),
    CommonFace: TutoCommon(cardData),
    AdditionalHandlers: () => ({}),
  };
};
export const PjtCardProcessor = (
  cardData: PjtCardData
): CardStates<PjtCardData> => {
  return {
    Index: cardData.Index,
    Type: CardTypeEnum.PROJTECT,
    Description: PjtDesc(cardData),
    Float: PjtFloat(cardData),
    FrontFace: PjtFront(cardData),
    BackFace: PjtBack(cardData),
    CommonFace: PjtCommon(cardData),
    AdditionalHandlers: () => ({}),
  };
};
