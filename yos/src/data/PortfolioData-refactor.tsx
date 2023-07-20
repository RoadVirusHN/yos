import { BandEnum } from "./enums/enums";
import { PjtCardData, PjtCardProcessor } from "./CardProcessors";

// !important : dont get the graffiti directly from the component

// Datas
export const PortfolioCards: PjtCardData[] = [
  {
    type: PjtCardProcessor,
    Description: {
      Title: "DNS: Developer Network Service",
      Subtitle: "SNS Cloning Team Project",
      Doodle: "src/img/cards/pjtDoodles/SampleDoodle.tsx",
    },
    Float: { URL: "asdf" },
    FrontFace: {
      VideoURL: "src/img/cards/previews/test-big.webm",
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
    type: PjtCardProcessor,
    Description: {
      Title: "Cat Swimming 😸",
      Subtitle: "SecondHand Transaction Search & ML Based Filtering Service",
      Doodle: "src/img/cards/pjtDoodles/SampleDoodle.tsx",
    },
    Float: { URL: "asdf" },
    FrontFace: {
      VideoURL: "src/img/cards/previews/test-big.webm",
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
];
