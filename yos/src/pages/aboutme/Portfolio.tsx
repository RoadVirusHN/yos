import Deck from "src/components/Deck/Deck";
import { PortfolioCards } from "src/data/PortfolioData";

const Portfolio = () => {
  return (
    <div
      style={{
        height: "fit-content",
      }}
    >
      <Deck cardInfos={PortfolioCards} />
    </div>
  );
};

export default Portfolio;
