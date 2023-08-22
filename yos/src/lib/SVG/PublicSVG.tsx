import { useState, useEffect } from "react";

const PublicSVG = ({ href }: { href: string }) => {
  const [src, setSrc] = useState("");

  // import("@assets/commons/icons/GITHUB.svg").then((res) => console.log(res));
  useEffect(() => {
    const fetchSvgContent = async () => {
      try {
        const res = await import(`@assets/${href}`);

        setSrc(res.default);
      } catch (error) {
        console.error("Error fetching SVG:", error);
      }
    };

    fetchSvgContent();
  }, [href]);

  return <img src={src} alt={src} draggable={false} />;
};
export default PublicSVG;
