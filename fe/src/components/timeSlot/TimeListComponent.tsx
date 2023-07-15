import { TimeSlotType } from "../../pages/doctor/SchedulePage.doctor";

const TimeListComponent = (props: any) => {
  const { timeSlotData, handleSelectTime } = props;

  return (
    <div className="flex flex-wrap gap-4">
      {timeSlotData.map((data: TimeSlotType, index: number) => (
        <label
          role="button"
          key={data?.id}
          className={`min-w-[125px] p-3 text-center border-2 rounded-md bg-gray-300 ${
            data?.check ? "border-black bg-yellow-800" : ""
          }`}
        >
          <input
            type="checkbox"
            value={data.value}
            className="hidden"
            checked={data.check}
            onChange={(e: any) => handleSelectTime(index)}
          />
          {data?.value}
        </label>
      ))}
    </div>
  );
};

export default TimeListComponent;

export const listTimeData: TimeSlotType[] = [
  { key: "T1", value: "7:30 - 8:00", check: false },
  { key: "T2", value: "8:00 - 8:30", check: false },
  { key: "T3", value: "8:30 - 9:00", check: false },
  { key: "T4", value: "9:00 - 9:30", check: false },
  { key: "T5", value: "9:30 - 10:00", check: false },
  { key: "T6", value: "10:00 - 10:30", check: false },
  { key: "T7", value: "10:30 - 11:00", check: false },
  { key: "T8", value: "11:00 - 11:30", check: false },
  { key: "T9", value: "11:30 - 12:00", check: false },
  { key: "T10", value: "13:30 - 14:00", check: false },
  { key: "T11", value: "14:00 - 14:30", check: false },
  { key: "T12", value: "14:30 - 15:00", check: false },
  { key: "T13", value: "15:00 - 15:30", check: false },
  { key: "T14", value: "15:30 - 16:00", check: false },
  { key: "T15", value: "16:00 - 16:30", check: false },
  { key: "T16", value: "16:30 - 17:00", check: false },
  { key: "T17", value: "17:00 - 17:30", check: false },
  { key: "T18", value: "17:30 - 18:00", check: false },
];
