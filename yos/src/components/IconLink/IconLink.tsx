import { useEffect, useState } from "react";
import ClassNames from "./IconLink.module.scss";
import { InfoItem } from "../InfoMapper/InfoMapper";
const IconLink = ({ links }: { links: InfoItem[] }) => {
  const [icons, setIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: { [key: string]: any } = {};

      await Promise.all(
        links.map(async ({ name, content }) => {
          try {
            const module = await import(`src/assets/img/icons/${name}.svg`);
            const { default: ReactComponent } = module;
            loadedIcons[name] = ReactComponent;
          } catch (err) {
            loadedIcons[name] = "ERROR!";
          }
        })
      );

      setIcons(loadedIcons);
    };

    loadIcons();
  }, [links]);

  return (
    <div className={ClassNames.IconLinkContainer}>
      {links.map(({ name, content }, i) => {
        const IconSrc = icons[name];
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
              {IconSrc !== "ERROR!" ? (
                <div className={ClassNames.icon}>
                  <img src={IconSrc} alt={name} />
                  {name !== "" ? (
                    <div className={ClassNames.iconName}>{name}</div>
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
