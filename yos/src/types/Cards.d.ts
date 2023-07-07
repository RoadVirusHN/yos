export const BandEnum = {
  DEFAULT: "DEFAULT",
  POSTPONED: "POSTPONED",
  DONE: "DONE",
  DROPPED: "DROPPED",
  INPROGRESS: "INPROGRESS",
};
export type BandStatus = keyof typeof BandEnum;

export type AllCardInfoType =
  | PjtCardInfo
  | CustomCardInfo
  | EndCardInfo
  | TutorialCardInfo;

export const CardTypeEnum = {
  PROJTECT: "PJT",
  TUTORIAL: "TUTO",
  END: "END",
};

export type CardType = keyof typeof CardTypeEnum;

interface PjtCardDesc {
  title: string;
  sub: string;
  graffities?: {
    left?: ReactElement<any, any>;
    right?: ReactElement<any, any>;
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
  front: ReactElement<any, any>;
  back: ReactElement<any, any>;
}
export interface TutorialCardInfo {
  type: CardTypeEnum.TUTORIAL;
  index: number;
  description: PjtCardDesc;
  front: ReactElement<any, any>;
  back: ReactElement<any, any>;
}

export interface EndCardInfo {
  type: CardTypeEnum.END;
  index: number;
  description: PjtCardDesc;
}
