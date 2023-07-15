import FooterComponent from "../components/common/FooterComponent";
import HeaderComponent from "../components/common/HeaderComponent";

const PatientLayout = (props: any) => {
  return (
    <>
      <HeaderComponent />
      {props.children}
      <FooterComponent />
    </>
  );
};

export default PatientLayout;
