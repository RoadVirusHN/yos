/* eslint-disable no-unused-vars */
import { type BandStatus, type CardType } from "@customTypes/Card";
import { type CardComponentProps } from "@components/CardTypes/Card";
import { type TagType } from "@components/InfinityLoopSlider/InfinityLoopSlider";
import { type InfoItem } from "@components/InfoMapper/InfoMapper";
import { CardTypeEnum } from "./Enums";
import PjtBack from "@components/CardTypes/PjtCard/PjtBack/PjtBack";
import PjtCommon from "@components/CardTypes/PjtCard/PjtCommon/PjtCommon";
import PjtDesc from "@components/CardTypes/PjtCard/PjtDesc/PjtDesc";
import PjtFloat from "@components/CardTypes/PjtCard/PjtFloat/PjtFloat";
import PjtFront from "@components/CardTypes/PjtCard/PjtFront/PjtFront";
import TutoCommon from "@components/CardTypes/TutoCard/TutoCommon/TutoCommon";
import TutoBack from "@components/CardTypes/TutoCard/TutoBack/TutoBack";
import TutoFront from "@components/CardTypes/TutoCard/TutoFront/TutoFront";
import TutoDesc from "@components/CardTypes/TutoCard/TutoDesc/TutoDesc";

export interface CardComponentData<T> {
  Data: T[keyof Omit<T, "Index">];
  Component: React.ComponentType<CardComponentProps<T>>;
}

const EmptyComponent = {
  Data: null,
  Component: ()=><></>,
};

type CardComponentKeys = keyof Omit<AllCardData, "Type" | "Index">;

type CardComponentMap<T> = {
  [key in CardComponentKeys]: CardComponentData<T>;
};

export type CardStates<T> = {
  Index: number;
  Type: CardType;
  AdditionalHandlers: (
    props: CardComponentProps<T>
  ) => Record<string, (e: Event) => any>;
} & CardComponentMap<T>;

export type AllCardData = {
  Type: Function;
  Index: number;
  Description: Record<string, unknown>;
  FrontFace: Record<string, unknown>;
  Float: Record<string, unknown>;
  BackFace: Record<string, unknown>;
  CommonFace: Record<string, unknown>;
};

export interface TutoCardData {
  Type: (cardData: TutoCardData) => CardStates<TutoCardData>;
  Index: number;
  Description: { Src: string };
  FrontFace: Record<string, unknown>;
  Float: any;
  BackFace: { Src: string };
  CommonFace: { Status: BandStatus };
}
export interface PjtCardData {
  Type: (cardData: PjtCardData) => CardStates<PjtCardData>;
  Index: number;
  Description: {
    Title: string;
    Subtitle: string;
    Doodle: (args: any) => JSX.Element;
  };
  Float: { URL: string };
  FrontFace: {
    VideoURL: string;
    PreviewImage: string;
    TechStacks: TagType[];
  };
  BackFace: {
    Teammates: number;
    Infos: InfoItem[];
    Links: InfoItem[];
  };
  CommonFace: { Status: BandStatus };
}

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
