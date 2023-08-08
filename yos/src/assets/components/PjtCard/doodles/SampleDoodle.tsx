import { ScalableSVGWrapper } from '@lib/SVG/ScalableSVG';
import ClassNames from '@components/CardTypes/PjtCard/PjtDesc/PjtDesc.module.scss';
import Kejang from '../doodles/kejang/Kejang';
import { ReactComponent as CoolCat } from '../doodles/coolcat.svg';
const SampleDoodle = () => {
  return (
    <div className={ClassNames.doodleContainer}>
      <div className={ClassNames.doodleLeft}>
        <ScalableSVGWrapper content={<Kejang />} />
      </div>
      <div className={ClassNames.doodleRight}>
        <ScalableSVGWrapper content={<CoolCat />} />
      </div>
    </div>
  );
};
export default SampleDoodle;
