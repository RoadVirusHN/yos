import ClassNames from './TutoFront.module.scss';

const TutoFront = () => {
  return (
    <>
      <span className={ClassNames.indicator}>
        <span>
          DO NOT <br /> CLICK IT
        </span>
        <span className={ClassNames.arrow}> →</span>
      </span>
      <div className={ClassNames.container}>
        <div className={ClassNames.portfolio}>
          <div style={{ fontSize: '40%', lineHeight: '20%' }}>THE</div>LUXURIST
        </div>
        <div className={ClassNames.name}>JUNSEOK-YUN PORTFOLIO</div>
      </div>
    </>
  );
};

export default TutoFront;
