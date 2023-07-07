import { CardTypeEnum } from "src/data/enums/enums";
import EndCard from "../CardTypes/EndCard/EndCard";
import PjtCard from "../CardTypes/PjtCard/PjtCard";
import TutoCard from "../CardTypes/TutorialCard/TutoCard";

const cardComponentMap = {
  [CardTypeEnum.PROJTECT]: PjtCard,
  [CardTypeEnum.TUTORIAL]: TutoCard,
  [CardTypeEnum.END]: EndCard,
};

export default cardComponentMap;
