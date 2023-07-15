import { Button, Card, Tooltip, Typography } from "@material-tailwind/react";
import banner from "../../assets/images/banner-2.png";
import { CiLocationOn } from "react-icons/ci";
import ContainerComponent from "../../components/common/ContainerComponent";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetRequest } from "../../utils/rest-api";
import { ClinicType, DoctorType, SpecialtyType } from "../../data/types.data";
import parse from "html-react-parser";
import CardComponent from "../../components/common/CardComponent";
import { VNDMoney } from "../../utils/utils";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import { RouteNamePatient } from "../../routes/routes";

const ClinicDetailPage = () => {
  let { id } = useParams();
  const [clinicData, setClinicData] = useState<ClinicType>();

  useEffect(() => {
    getClinicDetail();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const getClinicDetail = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/clinic/${id}`);
    setClinicData(res.data?.data);
  };

  return (
    <>
      <div className="clinics-banner relative">
        <img src={banner} alt="" className="w-full" />
        <Typography
          variant="h1"
          className="text-blue-500 absolute bottom-2/4 left-0 right-0 text-center"
        >
          Chi tiết cơ sở y tế
        </Typography>
      </div>
      <SmallContainerComponent>
        <div className="clinic-detail mt-4 mb-4">
          <div className="flex flex-col items-center introduce">
            {/* {clinicData?.image ? (
              <Card className="mb-5 w-4/6 overflow-hidden">
                <img
                  alt="clinic"
                  className="h-[32rem] w-full object-cover object-center"
                  src={clinicData?.image}
                />
              </Card>
            ) : null} */}
            <Typography variant="h2">{clinicData?.name}</Typography>
            <p className="italic flex gap-1">
              <CiLocationOn className="mt-1"></CiLocationOn>
              {clinicData?.address}
            </p>
            <p className="italic">{clinicData?.describe}</p>
          </div>
          <div>
            <div className="my-10">
              <Typography variant="h4">Các chuyên khoa của {clinicData?.name}</Typography>
              <div className="mt-2 grid grid-cols-4 gap-4">
                {clinicData?.specialtyData?.map((specialty: SpecialtyType, index: number) => (
                  <Tooltip
                    content={`Nhấn để xem thông tin các bác sĩ thuộc chuyên khoa ${specialty?.name}`}
                  >
                    <Link
                      to={`${RouteNamePatient?.DOCTORS}?clinicId=${clinicData?.id}&specialtyId=${specialty?.id}`}
                      target="_blank"
                    >
                      <Button
                        size="lg"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-3 w-full"
                      >
                        {specialty?.name}
                      </Button>
                    </Link>
                  </Tooltip>
                ))}
              </div>
            </div>
            {clinicData?.doctorData?.length ? (
              <>
                <div className="flex justify-between">
                  <Typography variant="h4">Một số bác sĩ của {clinicData?.name}</Typography>
                  <Link
                    to={`${RouteNamePatient?.DOCTORS}?clinicId=${clinicData?.id}`}
                    target="_blank"
                  >
                    <Button>Xem thêm</Button>
                  </Link>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-6">
                  {clinicData?.doctorData?.map((doctor: DoctorType, index: number) => (
                    <CardComponent
                      key={index}
                      title={doctor?.positionData?.value + " " + doctor.fullName}
                      url={`${RouteNamePatient?.DOCTORS}/${doctor.id}`}
                      price={doctor?.price ? VNDMoney.format(+doctor?.price) : ""}
                      // describe={doctor?.describe}
                      specialties={doctor?.specialtyData
                        ?.map((spec: SpecialtyType) => spec?.name)
                        ?.join(", ")}
                      image={doctor?.image || EmptyDoctor}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div className="description mt-4">{parse(clinicData?.descriptionHTML || "")}</div>
        </div>
      </SmallContainerComponent>
    </>
  );
};

export default ClinicDetailPage;
