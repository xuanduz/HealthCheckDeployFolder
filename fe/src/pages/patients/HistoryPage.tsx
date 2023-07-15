import Cookies from "universal-cookie";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { DeleteRequest, GetRequest } from "../../utils/rest-api";
import { useState, useEffect } from "react";
import { AppointmentType } from "../../data/types.data";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { Avatar } from "@mui/material";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import EmptyClinic from "../../assets/images/empty-clinic.png";
import { Link } from "react-router-dom";
import { RouteNamePatient } from "../../routes/routes";
import { getColorStatus, getLabelStatus } from "../../data/selection.data";
import DialogComponent from "../../components/dialog/DialogComponent";
import { AiFillFileText } from "react-icons/ai";

export default function HistoryPage() {
  const cookies = new Cookies();
  const [history, setHistory] = useState<AppointmentType[]>();
  const [reset, setReset] = useState(0);

  const getHistory = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/history/${cookies.get("id")}`);
    setHistory(res?.data?.data);
  };

  useEffect(() => {
    getHistory();
  }, [reset]);

  const handleDeleteBooking = async (bookingInfo: AppointmentType) => {
    await DeleteRequest(`${process.env.REACT_APP_API}/booking/delete/${bookingInfo?.id}`, true);
    setReset(reset + 1);
  };

  return (
    <SmallContainerComponent>
      <SmallContainerComponent>
        <div className="mt-3">
          <Typography variant="h4">Lịch sử đơn đặt</Typography>
          <p>Mọi thắc mắc vui lòng liên hệ: 1900 123123 để được giải đáp</p>
        </div>
        <div className="flex justify-between mt-4 p-4">
          <div className="flex gap-5 flex-col w-full">
            {history?.length ? (
              history?.map((his: AppointmentType) => (
                <div className="flex gap-5 items-center">
                  <div className=" border-2 rounded-md w-full p-4 flex gap-2">
                    <div className="basis-1/2">
                      <p>{"Thời gian: " + his?.timeData?.value + " Ngày " + his?.date}</p>
                      {his?.doctorData ? (
                        <div className="flex gap-3">
                          <Avatar
                            alt="doctor"
                            src={his?.doctorData?.image || EmptyDoctor}
                            sx={{ width: 100, height: 100 }}
                          />
                          <div className="flex flex-col justify-center">
                            <p className="font-bold">{"Bác sĩ: " + his?.doctorData?.fullName}</p>
                            <Link
                              to={`${RouteNamePatient.DOCTORS}/${his.doctorId}`}
                              target="_blank"
                            >
                              <p className="text-blue-600">Xem chi tiết bác sĩ</p>
                            </Link>
                            <p className="font-bold">
                              {"Bệnh viện: " + his?.doctorData?.clinicData?.name}
                            </p>
                            <Link
                              to={`${RouteNamePatient.CLINICS}/${his?.clinicId}`}
                              target="_blank"
                            >
                              <p className="text-blue-600">Xem chi tiết bệnh viện</p>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <Avatar
                            alt="doctor"
                            src={his?.clinicData?.image || EmptyClinic}
                            sx={{ width: 100, height: 100 }}
                          />
                          <div className="flex flex-col justify-center">
                            <p>{"Bệnh viện: " + his?.clinicData?.name}</p>
                            <Link
                              to={`${RouteNamePatient.CLINICS}/${his?.clinicId}`}
                              target="_blank"
                            >
                              <p className="text-blue-600">Xem chi tiết bệnh viện</p>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="basis-1/2">
                      <div className="flex gap-2 items-center">
                        <p>Trạng thái: </p>
                        <Chip
                          value={getLabelStatus(his?.statusKey)}
                          color={getColorStatus(his?.statusKey)}
                        />
                      </div>
                      <div className=" flex flex-col gap-1 mt-1">
                        <p>Hình thức khám: {his?.bookingData?.value}</p>
                        <div className="flex gap-2">
                          <p>Kết quả: </p>
                          {his?.resultFile ? (
                            <div className="w-12">
                              <a href={his?.resultFile} target="_blank" className="block">
                                <AiFillFileText size={20} />
                              </a>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DialogComponent
                      displayButton={
                        <Button color="red" className="w-[150px]">
                          {his?.statusKey == "S1" || his?.statusKey == "S2"
                            ? "Huỷ lịch hẹn"
                            : "Xoá lịch sử khám bệnh"}
                        </Button>
                      }
                      formatterContent={
                        <Typography variant="h5">
                          {his?.statusKey == "S1" || his?.statusKey == "S2"
                            ? "Bạn có muốn huỷ lịch hẹn ?"
                            : "Bạn có muốn xoá lịch sử khám bệnh ?"}
                        </Typography>
                      }
                      acceptText="Đồng ý"
                      acceptAction={() => handleDeleteBooking(his)}
                      size="sm"
                      title="Lưu ý"
                    />
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="h3">Bạn chưa từng đặt lịch tại Health Check!</Typography>
            )}
            {/* <div className="relative">
                <Avatar
                  alt="doctor"
                  src={doctor?.image || EmptyDoctor}
                  sx={{ width: 100, height: 100 }}
                />
              </div>
              <div>
                <Typography variant="h2">
                  {(doctor?.positionData?.value || "") + " " + doctor?.fullName}
                </Typography>
                <p>{(doctor?.positionData?.value || "") + " " + doctor?.fullName}</p>
                <p>{"Thời gian " + booking?.timeValue + " Ngày " + booking?.date}</p>
                <p>{doctor?.clinicData?.name}</p>
                <p>{doctor?.clinicData?.address}</p>
              </div>
              <div>
                <div>
                  <span>Giá khám:</span>
                  <p>{doctor?.price ? VNDMoney.format(+doctor?.price) : ""}</p>
                </div>
              </div> */}
          </div>
        </div>
      </SmallContainerComponent>
    </SmallContainerComponent>
  );
}
