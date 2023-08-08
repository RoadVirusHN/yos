const PublicSVG = ({
  href,
  width,
  height,
  viewBox = `0 0 ${width} ${height}`,
}: {
  href: string;
  width: number | string;
  height: number | string;
  viewBox?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href={`${process.env.PUBLIC_URL}/${href}`} />
    </svg>
  );
};
export default PublicSVG;
