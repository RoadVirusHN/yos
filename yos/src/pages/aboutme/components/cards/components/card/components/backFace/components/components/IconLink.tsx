import { useEffect, useState } from "react";
import ClassNames from "../BackInfo.module.scss";
const IconLink = ({ links }: { links: { [icon: string]: string } }) => {
  const [icons, setIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: { [key: string]: any } = {};

      await Promise.all(
        Object.entries(links).map(async ([iconName, url]) => {
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
    <div className={ClassNames.IconLinkContainer}>
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          cursor: "pointer",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          console.log("works in div");
        }}
      ></div>
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
              e.nativeEvent.stopPropagation();
              console.log("click");
            }}
            onMouseMove={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopPropagation();
              console.log("move");
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
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          cursor: "pointer",
          shapeOutside: "polygon(0 0, 100% 100%, 30% 100%, 0 70%)",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          console.log("works in div");
        }}
      ></div>
    </div>
  );
};

export default IconLink;
