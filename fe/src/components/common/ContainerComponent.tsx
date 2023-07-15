const ContainerComponent = (props: any) => {
  return (
    <div className="w-10/12" style={{ margin: "0 auto" }}>
      {props?.children}
    </div>
  );
};

export default ContainerComponent;
