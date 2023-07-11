import { ReactComponent as CoolCat } from "src/assets/img/cards/graffities/coolcat.svg";
import { ReactComponent as TutoBorder } from "src/assets/img/cards/graffities/border.svg";
import testVideo from "src/assets/img/cards/previews/test-big-comp.mp4";
import testVideoBig from "src/assets/img/cards/previews/test-big.webm";
import Kejang from "src/assets/img/cards/graffities/kejang/Kejang";
import {
  PjtCardInfo,
  TutorialCardInfo,
  EndCardInfo,
  BandStatus,
} from "@customTypes/Card";
import { CardTypeEnum, BandEnum } from "./enums/enums";
import TutoBack from "src/assets/img/cards/graffities/tutoBack/TutoBack";
import TutoFront from "src/assets/img/cards/graffities/tutoFront/TutoFront";
import TutoTitle from "src/assets/img/cards/graffities/tutoTitle/TutoTitle";

// !important : dont get the graffiti directly from the component

// Datas
export const PortfolioCards: (PjtCardInfo | TutorialCardInfo | EndCardInfo)[] =
  [
    // {
    //   index: 0,
    //   type: CardTypeEnum.END,
    //   description: {
    //     title: "end",
    //     sub: "dsfasd",
    //   },
    // },
    {
      index: 0,
      type: CardTypeEnum.PROJTECT,
      url: "asdf",
      description: {
        title: "DNS: Developer Network Service",
        sub: "SNS Cloning Team Project",
        graffities: { right: <svg>"MY FIRST WEB PROJECT!"</svg> },
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
      type: CardTypeEnum.PROJTECT,
      description: {
        title: "Cat Swimming 😸",
        sub: "SecondHand Transaction Search & ML Based Filtering Service",
        graffities: {
          left: <CoolCat />,
          right: <Kejang />,
        },
      },
      front: {
        preview: "",

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
      type: CardTypeEnum.PROJTECT,
      description: {
        title: "DKT Competition & DKDKT",
        sub: "Deep Knowledge Tracing Machine Learning & Web Service",
        graffities: { left: <TutoBack /> },
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
      type: CardTypeEnum.PROJTECT,
      description: {
        title: "👇This Page!",
        sub: "Beautiful & Interactive ABOUTME",
      },
      front: {
        preview: testVideoBig,
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
      type: CardTypeEnum.PROJTECT,
      description: {
        title: "SUBBRAIN🧠",
        sub: "Jekyll based Static Blog",
      },
      front: {
        preview: testVideo,
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
      type: CardTypeEnum.PROJTECT,
      description: {
        title: "🐳 Movie-Dick",
        sub: "Movie Information & Ticketing",
      },
      front: {
        preview: testVideoBig,
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
    {
      index: 6,
      type: CardTypeEnum.TUTORIAL,
      description: {
        title: <TutoTitle />,
        sub: <></>,
      },
      front: <TutoFront />,
      back: <TutoBack />,
    },
  ];
