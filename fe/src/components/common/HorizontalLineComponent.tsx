export interface HorizontalLineProps {
  widthScale?: string;
  style?: any;
}

const HorizontalLine = (props: HorizontalLineProps) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className=" bg-gray-300 text-center"
        style={{
          height: "1px",
          width: props?.widthScale || "100%",
          ...props?.style,
        }}
      ></div>
    </div>
  );
};

export default HorizontalLine;
