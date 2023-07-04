import { ReactComponent as CoolCat } from "./assets/graffities/coolcat.svg";
import testGif from "./assets/previews/test.gif";
import testBig from "./assets/previews/test-big.gif";
import { ReactElement } from "react";
import Kejang from "./assets/graffities/kejang/Kejang";
// !important : dont get the graffiti directly from the component

export const BandEnum = {
  DEFAULT: "DEFAULT",
  POSTPONED: "POSTPONED",
  DONE: "DONE",
  DROPPED: "DROPPED",
  INPROGRESS: "INPROGRESS",
};
export type BandStatus = keyof typeof BandEnum;

export interface CardInfo {
  index: number;
  url: string;
  description: {
    title: string;
    sub: string;
    graffities?: {
      left?: ReactElement<any, any>;
      right?: ReactElement<any, any>;
      bottom?: ReactElement<any, any> | string;
    };
  };
  front: {
    preview: string;
    techs: [string];
  };
  back: CardInfoBackInfos;
}
export interface CardInfoBackInfos {
  teammates: number;
  infos: CardInfoBackInfoMaps;
  links: { [icon: string]: string };
  status: BandStatus;
}

export interface CardInfoBackInfoMaps {
  group?: string;
  term?: string;
  role?: string;
}

// Datas
export const projects: CardInfo[] = [
  {
    index: 0,
    url: "asdf",
    description: {
      title: "DNS: Developer Network Service",
      sub: "SNS Cloning Team Project",
      graffities: { bottom: '"MY FIRST WEB PROJECT!"' },
    },
    front: {
      preview: "./previews/test.gif",
      techs: ["VUEJS"],
    },
    back: {
      teammates: 6,
      status: BandEnum.DONE as BandStatus,
      infos: {
        role: "As a Leader, Frontend, Backend Engineer",
        term: "2020.01 ~ 2020.02",
        group: "SSAFY",
      },
      links: {
        github: ".",
        ppt: "",
      },
    },
  },
  {
    index: 1,
    url: "dfs",
    description: {
      title: "Cat Swimming 😸",
      sub: "SecondHand Transaction Search & ML Based Filtering Service",
      graffities: {
        left: <CoolCat />,
        bottom: "Wonderful Idea",
        right: <Kejang />,
      },
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",

      techs: ["REACTJS"],
    },
    back: {
      teammates: 6,
      status: BandEnum.POSTPONED as BandStatus,
      infos: {
        term: "2020.01 ~ 2020.02",
        role: "As a Leader, Frontend, Backend Engineer",
        group: "SSAFY",
      },
      links: {
        github: "",
        ppt: "",
      },
    },
  },
  {
    index: 2,
    url: "s",
    description: {
      title: "DKT Competition & DKDKT",
      sub: "Deep Knowledge Tracing Machine Learning & Web Service",
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
      techs: ["PYTORCH"],
    },
    back: {
      teammates: 6,
      status: BandEnum.DONE as BandStatus,
      infos: {
        role: "As a Leader, Frontend, Backend Engineer",
        term: "2020.01 ~ 2020.02",
        group: "SSAFY",
      },
      links: {
        github: "",
        ppt: "",
      },
    },
  },
  {
    index: 3,
    url: "d",
    description: {
      title: "👇This Page!",
      sub: "Beautiful & Interactive ABOUTME",
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
      techs: ["REACTJS"],
    },
    back: {
      teammates: 1,
      status: BandEnum.INPROGRESS as BandStatus,
      infos: {
        role: "As a Leader, Frontend, Backend Engineer",
        term: "2020.01 ~ 2020.02",
        group: "SSAFY",
      },
      links: {
        github: "",
        ppt: "",
      },
    },
  },
  {
    index: 4,
    url: "",
    description: {
      title: "SUBBRAIN🧠",
      sub: "Jekyll based Static Blog",
    },
    front: {
      preview: testGif,
      techs: ["JEKYLL"],
    },
    back: {
      teammates: 1,
      status: BandEnum.DROPPED as BandStatus,
      infos: {
        role: "As a Leader, Frontend, Backend Engineer",
        term: "2020.01 ~ 2020.02",
        group: "SSAFY",
      },
      links: {
        github: "",
        ppt: "",
      },
    },
  },
  {
    index: 5,
    url: "",
    description: {
      title: "🐳 Movie-Dick",
      sub: "Movie Information & Ticketing",
    },
    front: {
      preview: testBig,
      techs: ["JSP"],
    },
    back: {
      teammates: 1001,
      status: BandEnum.INPROGRESS as BandStatus,
      infos: {
        role: "As a Leader, Frontend, Backend Engineer",
        term: "2020.01 ~ 2020.02",
        group: "SSAFY",
      },
      links: {
        github: "",
        ppt: "",
      },
    },
  },
];
