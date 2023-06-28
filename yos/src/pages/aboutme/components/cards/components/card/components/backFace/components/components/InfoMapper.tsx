const InfoMapper = ({ infos }: { infos: { [key: string]: any } }) => {
  return (
    <div className="infoMapper">
      {Object.entries(infos).map((ele, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
};

export default InfoMapper;
