import ClassNames from "./TutoTitle.module.scss";

const TutoTitle = () => {
  return (
    <div className={ClassNames.chrome}>
      DRAG & DROP{" "}
      <span
        style={{
          color: "rgba(134, 40, 129, 0.6)",
          fontSize: "140%",
          fontWeight: "bolder",
        }}
      >
        CARD
      </span>{" "}
      TO NEXT.
    </div>
  );
};

export default TutoTitle;
