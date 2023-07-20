import React, { useEffect, useState } from "react";
import ClassNames from "./InfoMapper.module.scss";

export interface InfoItem {
  name: string;
  content: string;
}

const InfoMapper = ({ infos }: { infos: InfoItem[] }) => {
  const [icons, setIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: { [key: string]: any } = {};

      await Promise.all(
        infos.map(async ({ name, content }) => {
          try {
            const module = await import(`src/assets/img/icons/${name}.svg`);
            const { default: ReactComponent } = module;
            loadedIcons[name] = ReactComponent;
          } catch (err) {
            loadedIcons[name] = name;
          }
        })
      );

      setIcons(loadedIcons);
    };

    loadIcons();
  }, [infos]);

  return (
    <div className={ClassNames.infoMapper}>
      {infos.map(({ name, content }, i) => {
        const IconSrc = icons[name];

        return (
          <div key={i} className={ClassNames.infoItem}>
            {IconSrc && (
              <img
                className={ClassNames.infoItemIcon}
                src={IconSrc}
                alt={name}
              />
            )}
            {IconSrc ? "" : "ERROR!"} <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoMapper;
