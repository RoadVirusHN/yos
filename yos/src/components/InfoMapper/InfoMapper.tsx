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
            <img
              className={ClassNames.infoItemIcon}
              src={`${process.env.PUBLIC_URL}/icons/${name}.svg`}
              alt={name}
            />
            <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoMapper;
