/* eslint-disable no-unused-vars */
import { type BandStatus, type CardType } from "@customTypes/Card";
import { type CardComponentProps } from "src/components/CardTypes/Card";
import { type TagType } from "src/components/InfinityLoopSlider/InfinityLoopSlider";
import { type InfoItem } from "src/components/InfoMapper/InfoMapper";
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

export interface CardComponentData<T> {
  Data: T[keyof Omit<T, "Index">];
  Component: React.ComponentType<CardComponentProps>;
}

const EmptyComponent = {
  Data: null,
  Component: {} as React.ComponentType<CardComponentProps>,
};

type CardComponentKeys =
  | "Description"
  | "Float"
  | "FrontFace"
  | "BackFace"
  | "CommonFace";

type CardComponentMap<T> = {
  [key in CardComponentKeys]: CardComponentData<T>;
};

export type CardStates<T> = {
  Index: number;
  Type: CardType;
  AdditionalHandlers: (
    props: CardComponentProps
  ) => Record<string, (e: Event) => any>;
} & CardComponentMap<T>;

export type AllCardData = PjtCardData | TutoCardData;

export interface TutoCardData {
  Type: (cardData: TutoCardData) => CardStates<TutoCardData>;
  Index: number;
  Description: { Src: string };
  FrontFace: Record<string, unknown>;
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
