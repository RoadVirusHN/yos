import Deck from "src/components/Deck-refactor/Deck";
import { PortfolioCards } from "src/data/PortfolioData-refactor";
import PDFPortfolioButton from "./PDFPortfolioButton";

const Portfolio = () => {
  return (
    <div
      style={{
        height: "fit-content",
      }}
    >
      <Deck cardDatas={PortfolioCards} />
      <PDFPortfolioButton />
    </div>
  );
};

export default Portfolio;
