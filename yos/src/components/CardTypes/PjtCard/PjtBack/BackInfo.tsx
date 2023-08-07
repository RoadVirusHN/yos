import InfoMapper, { type InfoItem } from 'src/components/InfoMapper/InfoMapper';
import Teammates from './Teammates';
import ClassNames from './BackInfo.module.scss';
import IconLink from '../../../IconLink/IconLink';
const BackInfo = ({
  backInfo,
  width,
  height
}: {
  backInfo: {
    Teammates: number
    Infos: InfoItem[]
    Links: InfoItem[]
  }
  width: number
  height: number
}) => {
  return (
    <div
      className={ClassNames.backInfoContainer}
      style={{ width: height, height: width }}
    >
      <Teammates teamSize={backInfo.Teammates} />
      <InfoMapper infos={backInfo.Infos} />
      <IconLink links={backInfo.Links} />
    </div>
  );
};

export default BackInfo;
