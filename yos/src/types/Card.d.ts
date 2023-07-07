import { ReactElement } from "react";

export type BandStatus = keyof typeof BandEnum;

export type AllCardInfoType =
  | PjtCardInfo
  | CustomCardInfo
  | EndCardInfo
  | TutorialCardInfo;

export type CardType = keyof typeof CardTypeEnum;

interface PjtCardDesc {
  title: string;
  sub: string;
  graffities?: {
    left?: ReactElement;
    right?: ReactElement;
  };
}

export interface PjtCardInfo {
  index: number;
  type: CardTypeEnum.PROJTECT;
  url: string;
  description: PjtCardDesc;
  front: {
    preview: string;
    techs: [string];
  };
  back: PjtCardBackInfos;
}
export interface PjtCardBackInfos {
  teammates: number;
  infos: PjtCardBackInfosItems;
  links: { [icon: string]: string };
  status: BandStatus;
}

export interface PjtCardBackInfosItems {
  group?: string;
  term?: string;
  role?: string;
}

export interface CustomCardInfo {
  type: CardType;
  index: number;
  description?: PjtCardDesc;
  front: ReactElement;
  back: ReactElement;
}
export interface TutorialCardInfo {
  type: CardTypeEnum.TUTORIAL;
  index: number;
  description: {
    title: string;
    sub: ReactElement;
    graffities?: {
      left?: ReactElement;
      right?: ReactElement;
    };
  };
  front: ReactElement;
  back: ReactElement;
}

export interface EndCardInfo {
  type: CardTypeEnum.END;
  index: number;
  description: PjtCardDesc;
}
