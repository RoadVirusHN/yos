import Deck from "@components/Deck/Deck";
import IconLink from "@components/IconLink/IconLink";
import { DirectionEnum } from "@data/Enums";
import { PortfolioCards } from "@data/PortfolioData";
import TooltipWrapper from "@lib/TooltipWrapper/TooltipWrapper";

const Portfolio = () => {
  return (
    <div
      style={{
        height: "fit-content",
      }}
    >
      <Deck cardDatas={PortfolioCards} />
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: "10px"
        }}
      >
        <TooltipWrapper
          content={<IconLink links={[{ content: "", name: "KOREAN" }]} />}
          tooltip={<>ONE PAGE PORTFOLIO!</>}
          initialOpacity={0.5}
          initialDirection={DirectionEnum.LEFT}
        />
      </div>
    </div>
  );
};

export default Portfolio;
