import { useEffect, useState } from "react";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { Button, Input, Radio, Textarea, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import PatientFormComponent from "../../components/patient/PatientFormComponent";
import ProvinceComponent from "../../components/common/ProvinceComponent";
import ClinicByProvinceComponent from "../../components/common/ClinicByProvinceComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../../utils/utils";
import { listTimeData } from "../../components/timeSlot/TimeListComponent";
import { TimeSlotType } from "../doctor/SchedulePage.doctor";
import { GetRequest, PostRequest } from "../../utils/rest-api";
import { PatientType } from "../../data/types.data";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

interface clinicDataType {
  provinceKey?: string;
  clinicId?: string | number;
}

interface appDataType {
  date?: string;
  timeSlot?: string;
  reason?: string;
  patientData?: PatientType;
  provinceKey?: string;
  clinicId?: string | number;
}

export default function DirectBooking() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const cookies = new Cookies();
  const navigate = useNavigate();
  // const [clinicData, setClinicData] = useState<clinicDataType>({});
  const [date, setDate] = useState(tomorrow);
  const [listTime, setListTime] = useState(listTimeData);
  const [patient, setPatient] = useState<PatientType>();
  const [reason, setReason] = useState("");
  const [appData, setAppData] = useState<appDataType>({});

  const getPatient = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/patient/${cookies.get("id")}`);
    setPatient(res.data?.data);
  };

  useEffect(() => {
    getPatient();
  }, []);

  const updateData = (newValue: any) => {
    setPatient({
      ...patient,
      ...newValue,
    });
  };

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSelectProvince = (provinceKey: string) => {
    setAppData({
      ...appData,
      provinceKey: provinceKey,
    });
    // setClinicData({
    //   ...clinicData,
    //   provinceKey: provinceKey,
    // });
  };

  const handleSelectClinic = (clinicId: string) => {
    setAppData({
      ...appData,
      clinicId: clinicId,
    });
  };

  const handleSelectDate = (value: any) => {
    setDate(value);
    setAppData({
      ...appData,
      date: formatDate(value),
    });
  };

  const handleSelectTime = (value: any, idx: number) => {
    let newListTime = listTime?.map((time: TimeSlotType, index: number) =>
      index == idx ? { ...time, check: !time?.check } : { ...time, check: false }
    );
    setAppData({
      ...appData,
      timeSlot: newListTime[idx]?.check ? newListTime[idx]?.key : "",
    });
    setListTime(newListTime);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data: appDataType = {
      ...appData,
      reason: reason,
      patientData: patient,
    };
    if (data?.timeSlot) {
      await PostRequest(`${process.env.REACT_APP_API}/booking-direct`, data, true);
    } else {
      toast.warn("Vui lòng chọn khung thời gian !");
    }
  };

  return (
    <div>
      <div className=" bg-blue-50 flex justify-center">
        <div className="w-8/12 booking-title relative pt-10 pb-10 flex items-center">
          <div className="z-10 p-2 basis-1/6" role="button" onClick={() => navigate(-1)}>
            <Typography variant="h5" className="flex gap-2 items-center">
              <BiArrowBack /> Trở lại
            </Typography>
          </div>
          <Typography variant="h2" className="text-center basis-4/6">
            Đặt lịch nhanh
          </Typography>
        </div>
      </div>
      <SmallContainerComponent>
        <SmallContainerComponent>
          <div className="flex flex-col mt-4 border-2 rounded-md p-4">
            <Typography variant="h5">Đặt lịch khám tại viện</Typography>
            <p>Hoàn tất các thông tin sau, chúng tôi sẽ liên hệ để xác nhận lịch cho bạn</p>
          </div>
          <form onSubmit={onSubmit} className="">
            <div className="mt-3 flex flex-col gap-6">
              <Typography variant="h6">Thông tin bệnh nhân</Typography>
              <div className="flex flex-col black-all-child">
                <div>
                  <div className="flex gap-1 mt-2">
                    <p>Chọn giới tính</p>
                    <span className="text-red-600">*</span>
                  </div>
                  <div
                    className="flex gap-10"
                    onChange={(e: any) => {
                      updateData({ gender: JSON.parse(e.target.id) });
                    }}
                  >
                    <Radio
                      name="gender"
                      id="true"
                      label="Nam"
                      defaultChecked={patient?.gender}
                      required
                    />
                    <Radio name="gender" id="false" label="Nữ" defaultChecked={!patient?.gender} />
                  </div>
                </div>
              </div>
              <Input
                size="lg"
                label="Họ tên"
                required
                value={patient?.fullName}
                onChange={(e: any) => updateData({ fullName: e.target.value })}
              />
              <Input
                size="lg"
                label="Email"
                type="email"
                required
                value={patient?.email}
                onChange={(e: any) => updateData({ email: e.target.value })}
              />
              <Input
                size="lg"
                label="Số điện thoại"
                required
                pattern="[0-9]+"
                maxLength={12}
                value={patient?.phoneNumber}
                onChange={(e: any) => updateData({ phoneNumber: e.target.value })}
              />
              <Input
                size="lg"
                label="Ngày sinh"
                type="date"
                required
                value={patient?.birthday?.split("-").reverse().join("-")}
                onChange={(e: any) =>
                  updateData({ birthday: e.target.value.split("-").reverse().join("-") })
                }
              />
              <div>
                <div className="flex gap-1 mb-1 black-all-child">
                  <p>Tỉnh/Thành</p>
                  <span className="text-red-600">*</span>
                </div>
                <ProvinceComponent
                  required={true}
                  provinceKey={patient?.provinceKey}
                  handleChange={(value: string) => updateData({ provinceKey: value })}
                />
              </div>
              <Input
                size="lg"
                label="Địa chỉ cụ thể"
                required
                value={patient?.addressDetail}
                onChange={(e: any) => updateData({ addressDetail: e.target.value })}
              />
              <Textarea
                label="Lý do khám bệnh"
                value={reason}
                onChange={(e: any) => setReason(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <div className="my-5">
                <Typography variant="h6">Thông tin phòng khám</Typography>
                <div className="pt-2 flex gap-5 black-all-child w-full">
                  <div className="flex flex-col w-full">
                    <p>Chọn tỉnh thành</p>
                    <ProvinceComponent
                      handleChange={handleSelectProvince}
                      required={true}
                    ></ProvinceComponent>
                  </div>
                  <div className="flex flex-col w-full">
                    <p>Chọn bệnh viện</p>
                    <ClinicByProvinceComponent
                      handleChange={handleSelectClinic}
                      provinceKey={appData?.provinceKey}
                      required={true}
                    />
                  </div>
                </div>
                <div className="pt-5 flex justify-between">
                  <div className="flex flex-col gap-1">
                    <p>Chọn ngày</p>
                    <Calendar
                      onChange={handleSelectDate}
                      value={date}
                      locale="vi"
                      minDate={tomorrow}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Chọn khung giờ</p>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      {listTime?.map((data: TimeSlotType, index: number) => (
                        <label
                          role="button"
                          key={data?.key}
                          className={`min-w-[85px] p-3 text-center border-2 rounded-md bg-gray-300 ${
                            data?.check ? "border-black bg-yellow-800" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="timeSlot"
                            value={data?.key}
                            className="hidden"
                            checked={data?.check}
                            onChange={(e: any) => handleSelectTime(data?.key, index)}
                          />
                          {data?.value}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit">Đặt lịch</Button>
              <div className="text-center">
                <p>
                  Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám.
                </p>
                <p>Hình thức thanh toán sau khi khám bệnh.</p>
              </div>
            </div>
          </form>
        </SmallContainerComponent>
      </SmallContainerComponent>
    </div>
  );
}
