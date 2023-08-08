import ClassNames from "./BackInfo.module.scss";
import { ScalableSVGWrapper } from "@lib/SVG/ScalableSVG";
import PublicSVG from "@lib/SVG/PublicSVG";

const Teammates = ({ teamSize }: { teamSize: number }) => {
  return (
    <div className={ClassNames.team}>
      {teamSize === 1 ? (
        <span className={ClassNames.meTheKing}>
          <ScalableSVGWrapper
            content={<PublicSVG href={"commons/icons/soloPicto.svg"} />}
          />
        </span>
      ) : (
        <span className={ClassNames.me}>
          <ScalableSVGWrapper
            content={<PublicSVG href={"commons/icons/mePicto.svg"} />}
          />
        </span>
      )}
      {teamSize > 6 ? (
        <>
          +
          <span className={ClassNames.teammate}>
            <ScalableSVGWrapper
              content={
                <PublicSVG href={"commons/icons/teammatePicto.svg"} />
              }
            />
          </span>
          &times;<span>{teamSize - 1}</span>
        </>
      ) : (
        Array.from(Array(teamSize - 1).keys()).map((i) => (
          <svg
            key={i}
            className={ClassNames.teammate}
            width={35}
            height={55}
            viewBox={"0 0 45 72"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <image href={`${process.env.PUBLIC_URL}/icons/teammatePicto.svg`} />
          </svg>
        ))
      )}
    </div>
  );
};

export default Teammates;
