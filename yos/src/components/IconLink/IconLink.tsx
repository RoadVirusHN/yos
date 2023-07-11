import { useEffect, useState } from "react";
import ClassNames from "./IconLink.module.scss";
const IconLink = ({
  links,
}: {
  links: { [icon: string]: { url?: string; tagName?: string } };
}) => {
  const [icons, setIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: { [key: string]: any } = {};

      await Promise.all(
        Object.entries(links).map(async ([iconName, { url, tagName }]) => {
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
      {Object.entries(links).map(([iconName, { url, tagName }], i) => {
        const IconSrc = icons[iconName];
        return (
          <a
            href={url}
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
              {IconSrc !== "ERROR!" ? (
                <div className={ClassNames.icon}>
                  <img src={IconSrc} alt={tagName} />
                  {tagName !== "" ? (
                    <div className={ClassNames.iconName}>{tagName}</div>
                  ) : (
                    ""
                  )}
                </div>
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
