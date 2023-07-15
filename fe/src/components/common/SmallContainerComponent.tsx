const SmallContainerComponent = (props: any) => {
  return (
    <div className="w-8/12" style={{ margin: "0 auto" }}>
      {props?.children}
    </div>
  );
};

export default SmallContainerComponent;
