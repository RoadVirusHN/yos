import ClassNames from './IconLink.module.scss';
import { type InfoItem } from '../InfoMapper/InfoMapper';
const IconLink = ({ links }: { links: InfoItem[] }) => {

  return (
    <div className={ClassNames.IconLinkContainer}>
      {links.map(({ name, content }, i) => {
        return (
          <a
            href={content}
            className={ClassNames.IconLink}
            rel="noreferrer"
            target="_blank"
            key={i}
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onMouseMove={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={ClassNames.Icons}>
              <div className={ClassNames.icon}>
                <img src={`${process.env.PUBLIC_URL}/icons/${name}.svg`} alt={name} />
                <div className={ClassNames.iconName}>{name}</div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default IconLink;
