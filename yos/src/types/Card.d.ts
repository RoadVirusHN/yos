import { type ReactElement } from 'react';
import { CardSideEnum } from '@data/Enums';

export type BandStatus = keyof typeof BandEnum;

export type CardSide = keyof typeof CardSideEnum;

export type AllCardInfoType =
  | PjtCardInfo
  | CustomCardInfo
  | EndCardInfo
  | TutorialCardInfo;

export type CardType = keyof typeof CardTypeEnum;

interface PjtCardDesc {
  title: string | ReactElement
  sub: string
  graffities?: {
    left?: ReactElement
    right?: ReactElement
  }
}

export interface PjtCardInfo {
  index: number
  type: CardTypeEnum.PROJTECT
  url: string
  description: PjtCardDesc
  front: {
    preview: string
    techs: string[]
  }
  back: PjtCardBackInfos
}
export interface PjtCardBackInfos {
  teammates: number
  infos: PjtCardBackInfosItems
  links: Record<string, { url?: string, tagName?: string }>
  status: BandStatus
}

export interface PjtCardBackInfosItems {
  group?: string
  term?: string
  role?: string
}

export interface CustomCardInfo {
  type: CardType
  index: number
  description?: PjtCardDesc
  front: ReactElement
  back: ReactElement
}
export interface TutorialCardInfo {
  type: CardTypeEnum.TUTORIAL
  index: number
  description: {
    title: ReactElement
    sub: ReactElement
    graffities?: {
      left?: ReactElement
      right?: ReactElement
    }
  }
  front: ReactElement
  back: ReactElement
}

export interface EndCardInfo {
  type: CardTypeEnum.END
  index: number
  description: PjtCardDesc
}
