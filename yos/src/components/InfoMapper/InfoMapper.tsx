import PublicSVG from '@lib/SVG/PublicSVG';
import ClassNames from './InfoMapper.module.scss';

export interface InfoItem {
  name: string
  content: string
}

const InfoMapper = ({ infos }: { infos: InfoItem[] }) => {
  return (
    <div className={ClassNames.infoMapper}>
      {infos.map(({ name, content }, i) => {
        return (
          <div key={i} className={ClassNames.infoItem}>
            <PublicSVG href={`commons/icons/${name}.svg`} />
            <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoMapper;
