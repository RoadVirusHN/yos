import { BandEnum } from "./Enums";
import {
  type AllCardData,
  PjtCardProcessor,
  TutoCardProcessor,
} from "./CardProcessors";
import video from "@assets/components/PjtCard/previews/test-big.webm";
import SampleDoodle from "@assets/components/PjtCard/doodles/SampleDoodle";

export const emptyCard = {
  Type: {},
  Description: {},
  Float: {},
  FrontFace: {},
  BackFace: {},
  CommonFace: {},
};

export const PortfolioCards: AllCardData[] = [
  {
    Type: PjtCardProcessor,
    Description: {
      Title: "DNS: Developer Network Service",
      Subtitle: "SNS Cloning Team Project",
      Doodle: SampleDoodle,
    },
    Float: { URL: "asdf" },
    FrontFace: {
      VideoURL: video,
      TechStacks: [{ tagName: "VUEJS" }],
    },
    BackFace: {
      Teammates: 6,
      Infos: [
        { name: "role", content: "As a Leader, Frontend, Backend Engineer" },
        { name: "term", content: "2020.01 ~ 2020.02" },
        { name: "group", content: "SSAFY" },
      ],
      Links: [
        { name: "GITHUB", content: "." },
        { name: "PPT", content: "." },
      ],
    },
    CommonFace: { Status: BandEnum.DONE },
  },
  {
    Type: PjtCardProcessor,
    Description: {
      Title: "Cat Swimming 😸",
      Subtitle: "SecondHand Transaction Search & ML Based Filtering Service",
      Doodle: SampleDoodle,
    },
    Float: { URL: "asdf" },
    FrontFace: {
      VideoURL: video,
      TechStacks: [{ tagName: "PYTORCH" }],
    },
    BackFace: {
      Teammates: 6,
      Infos: [
        { name: "role", content: "As a Leader, Frontend, Backend Engineer" },
        { name: "term", content: "2020.01 ~ 2020.02" },
        { name: "group", content: "SSAFY" },
      ],
      Links: [
        { name: "GITHUB", content: "." },
        { name: "PPT", content: "." },
      ],
    },
    CommonFace: { Status: BandEnum.POSTPONED },
  },
  {
    Type: TutoCardProcessor,
    Description: {
      Src: "img/cards/doodles/tutoBack/TutoBack",
    },
    FrontFace: {},
    BackFace: {
      Src: "img/cards/doodles/tutoBack/TutoBack",
    },
    CommonFace: { Status: BandEnum.TUTORIAL },
  },
].map((info, i) => ({ Index: i, ...emptyCard, ...info }));
