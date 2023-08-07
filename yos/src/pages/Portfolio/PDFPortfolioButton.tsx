import IconLink from 'src/components/IconLink/IconLink';
import ClassNames from './PDFPortfolioButton.module.scss';

const PDFPortfolioButton = () => {
  return (
    <div className={`${ClassNames.onePagePortfolio}`}>
      <div className={`${ClassNames.tooltip}`}>
        <IconLink links={[{ content: '', name: 'KOREAN' }]} />
      </div>
      <span className={ClassNames.tooltiptext}>ONE PAGE PORTFOLIO!</span>
    </div>
  );
};

export default PDFPortfolioButton;
