import { ReactComponent as CoolCat } from "./assets/graffities/coolcat.svg";
import testGif from "./assets/previews/test.gif";
import testBig from "./assets/previews/test-big.gif";
// !important : dont get the graffiti directly from the component

export const BandEnum = {
  DEFAULT: "DEFAULT",
  POSTPONED: "POSTPONED",
  DONE: "DONE",
  DROPPED: "DROPPED",
  INPROGRESS: "INPROGRESS",
};
export type BandStatus = keyof typeof BandEnum;

interface CardInfo {
  index: number;
  project: { title: string; sub: string };
  front: {
    preview: string;
    title: string;
    link1: string;
    link2: string;
  };
  back: {
    team: number;
    date: string;
    role: string;
    status: BandStatus;
    description: string;
    teammates: number,
    term: string,
  };
}

// Datas
export const projects = [
  {
    index: 0,
    project: {
      title: "DNS: Developer Network Service",
      sub: "SNS Cloning Team Project",
      graffiti: <CoolCat />,
    },
    front: {
      preview: "./previews/test.gif",
    },
    back: {
      teammates: 6,
      status: BandEnum.DONE as BandStatus,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      team: "SSAFY",
      github: "",
      service: "",
    },
  },
  {
    index: 1,
    project: {
      title: "Cat Swimming: Secondhand Sale Searching",
      sub: "Transaction Search & ML Based Filtering Service",
      graffiti: <div></div>,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    },
    back: {
      teammates: 6,
      status: BandEnum.POSTPONED as BandStatus,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 2,
    project: {
      title: "DKT Competition & DKDKT",
      sub: "Deep Knowledge Tracing Machine Learning & Web Service",
      graffiti: <div></div>,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    },
    back: {
      teammates: 6,
      status: BandEnum.DONE as BandStatus,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 3,
    project: {
      title: "This Page!",
      sub: "Beautiful & Interactive ABOUTME",
      graffiti: <div></div>,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
    },
    back: {
      teammates: 1,
      status: BandEnum.INPROGRESS as BandStatus,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 4,
    project: {
      title: "SUBBRAIN",
      sub: "Jekyll based Static Blog",
      graffiti: <div></div>,
    },
    front: {
      preview:
        testGif,
    },
    back: {
      teammates: 1,
      status: BandEnum.DROPPED as BandStatus,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 5,
    project: {
      title: "Movie-Dick",
      sub: "Movie Information & Ticketing",
      graffiti: <CoolCat />,
    },
    front: {
      preview: testBig,
    },
    back: {
      teammates: 1001,
      status: BandEnum.INPROGRESS as BandStatus,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
];
