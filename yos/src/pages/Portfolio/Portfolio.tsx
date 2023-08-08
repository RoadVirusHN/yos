import Deck from '@components/Deck/Deck';
import { PortfolioCards } from '@data/PortfolioData';
import PDFPortfolioButton from './PDFPortfolioButton';

const Portfolio = () => {
  return (
    <div
      style={{
        height: 'fit-content'
      }}
    >
      <Deck cardDatas={PortfolioCards} />
      <PDFPortfolioButton />
    </div>
  );
};

export default Portfolio;
