import { useEffect, useState } from "react";
import ClassNames from "./IconLink.module.scss";
const IconLink = ({ links }: { links: { [icon: string]: string } }) => {
  const [icons, setIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: { [key: string]: any } = {};

      await Promise.all(
        Object.entries(links).map(async ([iconName, url]) => {
          try {
            const module = await import(`src/assets/img/icons/${iconName}.svg`);
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
  }, [links]);

  return (
    <div className={ClassNames.IconLinkContainer}>
      {Object.entries(links).map(([iconName, url], i) => {
        const IconSrc = icons[iconName];
        return (
          <a
            href={url}
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
            <div>
              {IconSrc !== "ERROR!" ? (
                <img src={IconSrc} alt={iconName} />
              ) : (
                "ERORR!"
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default IconLink;
