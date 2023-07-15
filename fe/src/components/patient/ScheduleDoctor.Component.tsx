import { useState, useEffect } from "react";
import HorizontalLine from "../common/HorizontalLineComponent";
import { listTimeData } from "../timeSlot/TimeListComponent";
import { Link, useNavigate } from "react-router-dom";
import { RouteNamePatient } from "../../routes/routes";
import { Button } from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { bookingPatientAtom } from "../../data/recoil/patient/booking.patient";
import { DoctorType } from "../../data/types.data";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { isEmpty } from "../../utils/utils";

export interface ScheduleDoctorProps {
  schedule?: any;
  doctor?: DoctorType;
}

export interface BookingType {
  date?: string;
  timeSlot?: string;
  timeValue?: string;
  doctor?: DoctorType;
}

interface ScheduleActiveType {
  value?: string;
  num?: number;
}

export default function ScheduleDoctor(props: ScheduleDoctorProps) {
  const { schedule, doctor } = props;
  let navigate = useNavigate();
  const cookies = new Cookies();
  const [listDate, setListDate] = useState<any>();
  const [scheduleData, setScheduleData] = useState<any>([]);
  const [dateActive, setDateActive] = useState<ScheduleActiveType>({ num: 0 });
  const [timeActive, setTimeActive] = useState<ScheduleActiveType>({ num: 0 });
  const [booking, setBooking] = useRecoilState<BookingType>(bookingPatientAtom);

  useEffect(() => {
    if (schedule) {
      let data = Object.keys(schedule)
        ?.sort(function (a, b) {
          var aa = a.split("-").reverse().join(),
            bb = b.split("-").reverse().join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        })
        ?.map((date: string, idx: number) => ({
          date: date,
          check: idx == 0 ? true : false,
        }));
      let listTime = data?.map((data: any, idx: number) => {
        let times = schedule[data?.date]?.map((item: any, index: number) => ({
          ...item,
          check: index == 0 ? true : false,
        }));
        return times;
      });
      setListDate(data);
      setScheduleData(listTime);
      setDateActive({
        value: data[0]?.date,
        num: 0,
      });
      setTimeActive({
        value: listTime[0] ? listTime[0][0]?.timeSlot : null,
        num: 0,
      });
    }
  }, [schedule]);

  const handleSelectDate = (date: string, index: number) => {
    const data = listDate?.map((date: any, idx: number) => {
      return {
        ...date,
        check: idx == index ? true : false,
      };
    });
    setListDate(data);
    setDateActive({ value: date, num: index });
  };

  const handleSelectTime = (timeSlot: string, indexCheck: number) => {
    let listTime = scheduleData?.map((data: any, idx: number) => {
      if (idx == dateActive?.num) {
        let times = scheduleData[idx]?.map((item: any, index: number) => ({
          ...item,
          check: index == indexCheck ? true : false,
        }));
        return times;
      }
      return data;
    });
    setTimeActive({ value: timeSlot, num: indexCheck });
    setScheduleData(listTime);
  };

  const getLabelTime = (timeslot: string) => {
    return listTimeData.find((t: any) => t.key == timeslot)?.value;
  };

  const handleBooking = () => {
    if (!cookies.get("role") && !cookies.get("email")) {
      toast.info("Bạn cần đăng nhập trước khi đặt lịch !");
      navigate(`/login`);
    } else {
      let bookingInfo = {
        date: dateActive.value,
        timeSlot: timeActive.value,
        timeValue: getLabelTime(timeActive?.value as string),
        doctor: doctor,
      };
      setBooking(bookingInfo);
      navigate(`${RouteNamePatient.BOOKING_DOCTOR}/${doctor?.id}`);
    }
  };

  return (
    <>
      <div className="mb-5">
        {listDate?.length ? (
          <>
            <div className="flex flex-wrap gap-4">
              {listDate?.map((data: any, index: number) => (
                <label
                  role="button"
                  key={data?.date}
                  className={`min-w-[125px] p-3 text-center border-2 rounded-md bg-gray-300 ${
                    data?.check ? "border-black bg-yellow-800" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={data.date}
                    className="hidden"
                    checked={data.check}
                    onChange={(e: any) => handleSelectDate(data?.date, index)}
                  />
                  {data?.date}
                </label>
              ))}
            </div>
            <div className="mb-5">
              <p className="mt-5 mb-2 font-bold">Khung thời gian có sẵn</p>
              <HorizontalLine />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {scheduleData[dateActive?.num || 0]?.map((data: any, index: number) => (
                  <label
                    role="button"
                    key={data?.timeSlot}
                    className={`min-w-[125px] p-3 text-center border-2 rounded-md bg-gray-300 ${
                      data?.check ? "border-black bg-yellow-800" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={data?.timeSlot}
                      className="hidden"
                      checked={data?.check}
                      onChange={(e: any) => handleSelectTime(data?.timeSlot, index)}
                    />
                    {getLabelTime(data?.timeSlot)}
                  </label>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={handleBooking}>
              Đặt lịch ngay
            </Button>
          </>
        ) : (
          <>
            <p>
              Lịch làm việc của bác sĩ sẽ được cập nhật sớm nhất! Chúng tôi sẽ sớm liên hệ để đặt
              lịch trước cho bạn.
            </p>
          </>
        )}
      </div>
    </>
  );
}
