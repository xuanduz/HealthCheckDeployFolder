import { Button, Card, Input, Typography } from "@material-tailwind/react";
import TimeListComponent, { listTimeData } from "../../components/timeSlot/TimeListComponent";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { PostRequest } from "../../utils/rest-api";
import { useRecoilValueLoadable } from "recoil";
import { scheduleSelector } from "../../data/recoil/commonData";
import { CodeType } from "../../data/types.data";
import DialogComponent from "../../components/dialog/DialogComponent";

export interface TimeSlotType extends CodeType {
  check?: boolean;
}

const SchedulePageDoctor = () => {
  const cookies = new Cookies();
  const today = new Date().toLocaleDateString("pt-br").split("/").join("-"); //dd-mm-yyyy
  const [date, setDate] = useState(today);
  const [timeSlotData, setTimeSlotData] = useState<TimeSlotType[]>(listTimeData);
  // const schedules = useRecoilValueLoadable(scheduleSelector);

  const getScheduleByDate = async (date?: string) => {
    const query = {
      date: date || today,
      doctorId: cookies.get("id"),
    };
    const res = await PostRequest(`${process.env.REACT_APP_API_DOCTOR}/schedule/by-date`, query);
    const timeSlotDataUpdated = timeSlotData?.map((time: TimeSlotType) => {
      const checkVal = res.data?.data?.some((data: any) => data.timeSlot == time.key);
      return {
        key: time.key,
        value: time.value,
        check: checkVal,
      };
    });
    setTimeSlotData(timeSlotDataUpdated);
  };

  useEffect(() => {
    getScheduleByDate(date);
  }, [date]);

  const handleSelectTime = (idx: number) => {
    let newTimeSlot = timeSlotData.map((time: TimeSlotType, index: number) =>
      index != idx
        ? time
        : {
            ...time,
            check: !timeSlotData[index].check,
          }
    );
    setTimeSlotData(newTimeSlot);
  };

  const onSubmit = async () => {
    // e.preventDefault();
    const timeSlots = timeSlotData
      ?.filter((time: TimeSlotType) => time.check)
      ?.map((item: TimeSlotType) => item?.key);
    const data = {
      timeSlots,
      date: date,
      doctorId: cookies.get("id"),
    };
    await PostRequest(`${process.env.REACT_APP_API_DOCTOR}/schedule/create`, data, true);
  };

  return (
    <div>
      <form>
        <div className="w-1/4 mb-2">
          <Card>
            <Input
              size="md"
              label="Chọn ngày"
              type="date"
              onChange={(e: any) => setDate(e.target.value.split("-").reverse().join("-"))}
              defaultValue={new Date().toLocaleDateString("pt-br").split("/").reverse().join("-")}
            />
          </Card>
        </div>
        <p className="text-red-500 mb-4">
          Chú ý: Bác sĩ nên xét lịch trước dưới 7 ngày để đảm bảo độ chính xác !
        </p>
        <div className="w-4/5">
          <TimeListComponent
            timeSlotData={timeSlotData}
            handleSelectTime={handleSelectTime}
          ></TimeListComponent>
        </div>
        <div className="flex gap-10 mt-7">
          <div className="flex gap-5">
            <div className="w-6 h-6 bg-yellow-800"></div>
            <p>Đã chọn</p>
          </div>
          <div className="flex gap-5 ">
            <div className="w-6 h-6 bg-gray-300"></div>
            <p>Chưa chọn</p>
          </div>
        </div>
        <div className="flex justify-start">
          <DialogComponent
            displayButton={<Button className="flex gap-2 mt-7">Lưu lịch</Button>}
            formatterContent={
              <Typography variant="h5">Bạn có muốn lưu lịch vừa cập nhật ?</Typography>
            }
            acceptText="Đồng ý"
            acceptAction={() => onSubmit()}
            size="sm"
            title="Lưu ý"
          />
        </div>
      </form>
    </div>
  );
};

export default SchedulePageDoctor;
