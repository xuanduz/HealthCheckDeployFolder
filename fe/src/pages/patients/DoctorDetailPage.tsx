import { Button, Card, Typography } from "@material-tailwind/react";
import banner from "../../assets/images/banner-2.png";
import ContainerComponent from "../../components/common/ContainerComponent";
import HorizontalLine from "../../components/common/HorizontalLineComponent";
import { Avatar } from "@mui/material";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { GrSchedule } from "react-icons/gr";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import SmallCardComponent from "../../components/common/SmallCardComponent";
import { Link, useParams } from "react-router-dom";
import { RouteNamePatient } from "../../routes/routes";
import { useEffect, useState } from "react";
import { GetRequest } from "../../utils/rest-api";
import { DoctorType, ScheduleType, SpecialtyType } from "../../data/types.data";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import parse from "html-react-parser";
import { VNDMoney, groupDate } from "../../utils/utils";
import ScheduleDoctor from "../../components/patient/ScheduleDoctor.Component";

const DoctorDetailPage = () => {
  let { id } = useParams();
  const [doctorData, setDoctorData] = useState<DoctorType>();
  const [relateDoctorData, setRelateDoctorData] = useState<DoctorType[]>();
  const [listScheduleData, setListScheduleData] = useState<any>();

  useEffect(() => {
    getDoctorDetail();
    getRelateDoctors();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const getDoctorDetail = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/doctor/${id}`);
    setDoctorData(res.data?.data);
    let schedules = groupDate(res.data?.data?.scheduleData);
    setListScheduleData(schedules);
  };

  console.log("listScheduleData", listScheduleData);

  const getRelateDoctors = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/doctor/relate/${id}`);
    setRelateDoctorData(res.data?.data);
  };

  return (
    <>
      <div className="relative">
        <img src={banner} alt="" className="w-full" />
        <Typography
          variant="h1"
          className="text-blue-500 absolute bottom-2/4 left-0 right-0 text-center"
        >
          Thông tin bác sĩ
        </Typography>
      </div>
      <SmallContainerComponent>
        <div className="introduce flex justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Avatar
                alt="doctor"
                src={doctorData?.image || EmptyDoctor}
                sx={{ width: 200, height: 200 }}
                className="absolute top-[-5rem]"
              />
            </div>
            <div>
              <Typography variant="h2">
                {(doctorData?.positionData?.value || "") + " " + doctorData?.fullName}
              </Typography>
              <p>{doctorData?.describe}</p>
            </div>
          </div>
          <div>
            <div className="flex gap-1 pt-2 pr-6 pb-2 pl-6 border-2 rounded-lg">
              <span>Giá khám:</span>
              <p>{doctorData?.price ? VNDMoney.format(+doctorData?.price) : ""}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="simple_info basis-1/2">
            <div className="description mt-4">{parse(doctorData?.descriptionHTML || "")}</div>
          </div>
          <div className="flex flex-col gap-4 basis-1/2">
            <Card className="schedule p-4">
              <form>
                <div>
                  <Typography variant="h4" className="flex gap-2">
                    <GrSchedule className="mt-1" /> Lịch khám
                  </Typography>
                  <HorizontalLine />
                  <div className="p-3">
                    <ScheduleDoctor schedule={listScheduleData} doctor={doctorData} />
                  </div>
                </div>
              </form>
            </Card>
            <Card color="yellow" className="p-4">
              <Typography variant="h4" className="flex gap-2 mb-2 text-black">
                <BsFillExclamationCircleFill className="mt-1" /> Chú ý
              </Typography>
              <p className="text-black">
                Lịch là lịch dự kiến có thể sẽ thay đổi. Chúng tôi khuyên bạn nên đặt lịch bác sĩ
                trong vòng dưới 7 ngày để tránh thời gian chờ đợi.
              </p>
            </Card>
            <div>
              {relateDoctorData?.length ? (
                <>
                  <Typography variant="h5" className="mb-2">
                    Chuyên gia tương tự
                  </Typography>
                </>
              ) : null}
              <div className="flex gap-3">
                {relateDoctorData?.map((doctor: DoctorType) => (
                  <SmallCardComponent
                    title={doctor?.fullName}
                    url={`/doctors/${doctor?.id}`}
                    // describe={doctor?.describe}
                    specialties={doctor?.specialtyData
                      ?.map((spec: SpecialtyType) => spec?.name)
                      ?.join(", ")}
                    image={doctor?.image || EmptyDoctor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SmallContainerComponent>
    </>
  );
};

export default DoctorDetailPage;
