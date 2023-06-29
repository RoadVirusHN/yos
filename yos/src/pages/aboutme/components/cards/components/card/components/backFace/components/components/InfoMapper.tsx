import React, { useEffect, useState } from "react";
import ClassNames from "../BackInfo.module.scss";

const InfoMapper = ({ infos }: { infos: { [key: string]: any } }) => {
  const [icons, setIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: { [key: string]: any } = {};

      await Promise.all(
        Object.entries(infos).map(async ([iconName, content]) => {
          try {
            const module = await import(`./assets/icons/${iconName}.svg`);
            const { default: ReactComponent } = module;
            loadedIcons[iconName] = ReactComponent;
          } catch (err) {
            loadedIcons[iconName] = "ERROR!";
          }
        })
      );

      setIcons(loadedIcons);
    };

    loadIcons();
  }, []);

  return (
    <div className={ClassNames.infoMapper}>
      {Object.entries(infos)
      .map(([iconName, content], i) => {
        const IconSrc = icons[iconName];

        return (
          <div key={i} className={ClassNames.infoItem}>
            {IconSrc && <img src={IconSrc} alt={iconName} />}
            {IconSrc ? "" : "ERROR!"} <span>{content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoMapper;
