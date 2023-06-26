import { ReactComponent as CoolCat } from "./graffities/coolcat.svg";
// !important : dont get the graffiti directly from the component
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
    description: string;
    result: string;
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
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    },
    back: {
      teammates: 6,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
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
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 2,
    project: {
      title: "DKT: ML Competition & Web Service",
      sub: "Deep Knowledge Tracing ML Team Competition & Web service",
      graffiti: <div></div>,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    },
    back: {
      teammates: 6,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 3,
    project: {
      title: "YOS: This cool Stuff!",
      sub: "Beautiful AboutMe Page",
      graffiti: <div></div>,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
    },
    back: {
      teammates: 6,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
  {
    index: 4,
    project: {
      title: "Subbrain: Jekyll based My Blog",
      sub: "Subbrain: Jekyll based My Blog",
      graffiti: <div></div>,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
    },
    back: {
      teammates: 6,
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
      sub: "some cool cinema page",
      graffiti: <CoolCat />,
    },
    front: {
      preview:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    },
    back: {
      teammates: 6,
      role: "Leader, Frontend, Backend Engineer",
      term: "2020.01~2020.02",
      github: "",
      service: "",
    },
  },
];
