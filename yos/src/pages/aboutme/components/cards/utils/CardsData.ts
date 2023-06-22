interface CardInfo {
  index: number;
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
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  },
  {
    index: 1,
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  },
  {
    index: 2,
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  },
  {
    index: 3,
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
  },
  {
    index: 4,
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  },
  {
    index: 5,
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
  },
];