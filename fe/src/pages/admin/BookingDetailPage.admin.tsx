import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteRequest, GetRequest, PostRequest } from "../../utils/rest-api";
import { useEffect, useState } from "react";
import { AppointmentType, DoctorType, PatientType } from "../../data/types.data";
import { Button, Card, Input, Radio, Textarea, Typography } from "@material-tailwind/react";
import ProvinceComponent from "../../components/common/ProvinceComponent";
import SmallCardComponent from "../../components/common/SmallCardComponent";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import ClinicSelectComponent from "../../components/clinic/ClinicSelectComponent";
import DoctorSelectComponent from "../../components/common/DoctorSelectComponent";
import { bookingOption, listStatus } from "../../data/selection.data";
import Calendar from "react-calendar";
import { listTimeData } from "../../components/timeSlot/TimeListComponent";
import { TimeSlotType } from "../doctor/SchedulePage.doctor";
import SelectComponent from "../../components/common/SelectComponent";
import { formatDate, groupDate } from "../../utils/utils";
import DialogComponent from "../../components/dialog/DialogComponent";
import { RouteNamePatient } from "../../routes/routes";
import ClinicByProvinceComponent from "../../components/common/ClinicByProvinceComponent";

export default function BookingDetailPageAdmin() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let { id } = useParams();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState<AppointmentType>({});
  const [patient, setPatient] = useState<PatientType>({});
  const [scheduleDoctor, setScheduleDoctor] = useState();

  const getAppointmentDetail = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API_ADMIN}/appointment/${id}`);
    const data = res.data?.data;
    if (data) {
      setAppointmentData(data);
      setPatient(data?.patientData);
      let schedules = groupDate(res.data?.data?.scheduleData);
      setScheduleDoctor(schedules);
    }
  };

  useEffect(() => {
    getAppointmentDetail();
  }, [id]);

  const onSubmit = async () => {
    // e.preventDefault();
    const updateValue = {
      ...appointmentData,
      patientData: { ...patient },
    };
    await PostRequest(`${process.env.REACT_APP_API_ADMIN}/appointment/edit`, updateValue, true);
  };

  const updateValue = (newValue: PatientType) => {
    setPatient({
      ...patient,
      ...newValue,
    });
  };

  const updateAppointment = (newValue: AppointmentType) => {
    setAppointmentData({
      ...appointmentData,
      ...newValue,
    });
  };

  const handleSelectDate = (value: any) => {
    setAppointmentData({
      ...appointmentData,
      date: formatDate(value),
    });
  };

  const handleDeleteAppointment = async (dataId: any) => {
    const res = await DeleteRequest(
      `${process.env.REACT_APP_API_ADMIN}/appointment/${dataId}`,
      true
    );
    if (res?.data?.success) {
      navigate(-1);
    }
  };

  return (
    <SmallContainerComponent>
      <Typography variant="h3" className="">
        Thông tin đơn đặt lịch
      </Typography>
      <Card className="mt-4 p-3">
        <form>
          <div>
            <Typography variant="h5">Thông tin bệnh nhân</Typography>
            <div className="flex flex-col gap-6 p-2">
              <div className="flex flex-col black-all-child">
                <div className="flex gap-1">
                  <p>Chọn giới tính</p>
                  <span className="text-red-600">*</span>
                </div>
                <div
                  className="flex"
                  onChange={(e: any) => {
                    updateValue({ gender: JSON.parse(e.target.id) });
                  }}
                >
                  <Radio
                    name="gender"
                    id="true"
                    label="Nam"
                    defaultChecked={patient?.gender == true ? true : false}
                    checked={patient?.gender == true ? true : false}
                  />
                  <Radio
                    name="gender"
                    id="false"
                    label="Nữ"
                    defaultChecked={patient?.gender == false ? true : false}
                    checked={patient?.gender == false ? true : false}
                  />
                </div>
              </div>
              <Input
                size="lg"
                label="Họ tên bệnh nhân"
                value={patient?.fullName}
                onChange={(e: any) => updateValue({ fullName: e.target.value })}
                required
              />
              <Input
                size="lg"
                label="Email"
                value={patient?.email}
                onChange={(e: any) => updateValue({ email: e.target.value })}
                required
              />
              <Input
                size="lg"
                label="Số điện thoại"
                value={patient?.phoneNumber}
                pattern="[0-9]+"
                maxLength={12}
                onChange={(e: any) => updateValue({ phoneNumber: e.target.value })}
                required
              />
              <Input
                size="lg"
                label="Ngày sinh"
                type="date"
                value={patient?.birthday?.split("-").reverse().join("-")}
                onChange={(e: any) =>
                  updateValue({
                    birthday: e.target.value?.split("-").reverse().join("-"),
                  })
                }
                required
              />
              <div className="black-all-child">
                <p>Tỉnh/Thành</p>
                <ProvinceComponent
                  provinceKey={patient?.provinceKey}
                  handleChange={(value: string) => updateValue({ provinceKey: value })}
                />
              </div>
              <Input
                size="lg"
                label="Địa chỉ cụ thể"
                value={patient?.addressDetail}
                onChange={(e: any) => updateValue({ addressDetail: e.target?.value })}
                required
              />
            </div>
          </div>
          <div className="mt-2">
            <Typography variant="h5">Thông tin đặt lịch</Typography>
          </div>
          <div className=" mb-5 p-3 flex flex-col gap-3">
            <div className="flex gap-3">
              <div className=" black-all-child w-full">
                <p>Trạng thái</p>
                <select
                  id="status"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
                  onChange={(e: any) =>
                    setAppointmentData({
                      ...appointmentData,
                      statusKey: e.target.value,
                    })
                  }
                  value={appointmentData?.statusKey}
                >
                  {listStatus?.map((stt: any, idx: number) => (
                    <option key={stt.name} value={stt.key}>
                      {stt.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" black-all-child w-full">
                <p>Phương thức khám</p>
                <select
                  id="status"
                  className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
                  onChange={(e: any) =>
                    setAppointmentData({
                      ...appointmentData,
                      bookingType: e.target.value,
                    })
                  }
                  value={appointmentData?.bookingType}
                >
                  {bookingOption?.map((stt: any, idx: number) => (
                    <option key={stt.name} value={stt.key}>
                      {stt.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-full flex flex-col gap-1">
                <p>Địa chỉ</p>
                <ProvinceComponent
                  provinceKey={
                    appointmentData?.doctorData?.clinicData?.provinceKey ||
                    appointmentData?.clinicData?.provinceKey
                  }
                  disabled={true}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <p>Bệnh viện</p>
                <ClinicByProvinceComponent
                  clinicId={
                    appointmentData?.doctorData?.clinicData?.id || appointmentData?.clinicId
                  }
                  provinceKey={
                    appointmentData?.doctorData?.clinicData?.provinceKey ||
                    appointmentData?.clinicData?.provinceKey
                  }
                  handleChange={(clinicId: any) => updateAppointment({ clinicId: clinicId })}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <p>Bác sĩ</p>
                <DoctorSelectComponent
                  doctorId={appointmentData?.doctorId}
                  clinicId={appointmentData?.clinicId || appointmentData?.doctorData?.clinicId}
                  onChange={(doctorId: any) => updateAppointment({ doctorId: doctorId })}
                  customClassName={"w-[200px]"}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p>Lịch khám của bác sĩ</p>
                <Link
                  to={`${RouteNamePatient.DOCTORS}/${appointmentData?.doctorId}`}
                  target="_blank"
                >
                  <p className="text-blue-500">Xem chi tiết</p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <p>Ngày</p>
                <Calendar
                  onChange={handleSelectDate}
                  value={appointmentData?.date?.split("-")?.reverse()?.join("-")}
                  locale="vi"
                />
              </div>
              <div className="w-60">
                <p>Khung giờ</p>
                <SelectComponent
                  data={listTimeData}
                  onChange={(timeSlot: string) => updateAppointment({ timeSlot: timeSlot })}
                  value={appointmentData?.timeSlot}
                />
              </div>
            </div>
            <div>
              {/* TODO: result file */}
              <Textarea
                label="Lý do khám bệnh"
                value={appointmentData?.reason}
                onChange={(e: any) =>
                  setAppointmentData({
                    ...appointmentData,
                    reason: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-center ">
              <DialogComponent
                displayButton={
                  <Button color="red" className="flex gap-2">
                    {"Xoá đơn đặt"}
                  </Button>
                }
                formatterContent={
                  <Typography variant="h5">
                    Bạn có muốn xoá đơn đặt, đơn đặt sau khi xoá sẽ xoá hoàn toàn khỏi hệ thống !
                  </Typography>
                }
                acceptText="Đồng ý"
                acceptAction={() => handleDeleteAppointment(appointmentData?.id)}
                size="sm"
                title="Lưu ý"
              />
            </div>
            <div className="text-center ">
              <DialogComponent
                displayButton={<Button className="w-full mb-2">{"Lưu thông tin"}</Button>}
                formatterContent={
                  <Typography variant="h5">Bạn có muốn cập nhật đơn đặt !</Typography>
                }
                acceptText="Đồng ý"
                acceptAction={() => onSubmit()}
                size="sm"
                title="Lưu ý"
              />
            </div>
          </div>
        </form>
      </Card>
    </SmallContainerComponent>
  );
}
