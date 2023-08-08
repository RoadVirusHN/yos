import ClassNames from "./IconLink.module.scss";
import { type InfoItem } from "../InfoMapper/InfoMapper";
import { lazy } from "react";
const PublicSVG = lazy(() => import("@lib/SVG/PublicSVG"));

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
            style={{ cursor: "pointer" }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onMouseMove={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={ClassNames.Icons}>
              <div className={ClassNames.icon}>
                <PublicSVG href={`commons/icons/${name}.svg`} />
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
