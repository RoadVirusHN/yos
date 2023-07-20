import { BandStatus, CardType } from "@customTypes/Card";
import { CardComponentProps } from "src/components/CardTypes-refactor/Card";
import { TagType } from "src/components/InfinityLoopSlider/InfinityLoopSlider";
import { InfoItem } from "src/components/InfoMapper/InfoMapper";
import { CardTypeEnum } from "./enums/enums";
import PjtBack from "src/components/CardTypes-refactor/PjtCard/PjtBack/PjtBack";
import PjtCommon from "src/components/CardTypes-refactor/PjtCard/PjtCommon/PjtCommon";
import PjtDesc from "src/components/CardTypes-refactor/PjtCard/PjtDesc/PjtDesc";
import PjtFloat from "src/components/CardTypes-refactor/PjtCard/PjtFloat/PjtFloat";
import PjtFront from "src/components/CardTypes-refactor/PjtCard/PjtFront/PjtFront";

type ExcludeIndex = Pick<
  IndexedCardData,
  Exclude<keyof IndexedCardData, "index">
>;

export type CardComponentData<T extends keyof ExcludeIndex> = {
  data: ExcludeIndex[T];
  Component: React.ComponentType<CardComponentProps>;
};

export type CardStates = {
  index: number;
  type: CardType;
  Description: CardComponentData<"Description">;
  Float: CardComponentData<"Float">;
  FrontFace: CardComponentData<"FrontFace">;
  BackFace: CardComponentData<"BackFace">;
  CommonFace: CardComponentData<"CommonFace">;
  AdditionalHandlers: (props: CardComponentProps) => {
    [key: string]: (e: Event) => any;
  };
};
export type AllCardDatas = PjtCardData
export type IndexedCardData = AllCardDatas & { index: number };
export type PjtCardData = {
  type: (indexedCardData: IndexedCardData) => CardStates;
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
export const PjtCardProcessor = (
  indexedCardData: IndexedCardData
): CardStates => {
  return {
    index: indexedCardData.index,
    type: CardTypeEnum.PROJTECT,
    Description: PjtDesc(indexedCardData),
    Float: PjtFloat(indexedCardData),
    FrontFace: PjtFront(indexedCardData),
    BackFace: PjtBack(indexedCardData),
    CommonFace: PjtCommon(indexedCardData),
    AdditionalHandlers: (props: CardComponentProps) => ({}),
  };
};
