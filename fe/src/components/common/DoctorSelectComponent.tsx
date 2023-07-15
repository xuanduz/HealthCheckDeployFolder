import { CodeType, DoctorType } from "../../data/types.data";
import { useEffect, useState } from "react";
import { GetRequest } from "../../utils/rest-api";

export interface SelectComponentProps {
  value?: string;
  doctorId?: string | number;
  onChange: Function;
  labelFirstElement?: string;
  customClassName?: any;
  required?: boolean;
  clinicId?: string | number;
}

export default function DoctorSelectComponent(props: SelectComponentProps) {
  const { onChange, labelFirstElement, customClassName, required, doctorId, clinicId } = props;
  const [listData, setListData] = useState([
    { id: "", fullName: labelFirstElement || "Chọn bác sĩ..." },
  ]);

  const getListDoctorsByClinic = async () => {
    const res = await GetRequest(
      `${process.env.REACT_APP_API_ADMIN}/doctor/get-by-clinic/${clinicId}`
    );
    let newListData = [
      { id: "", fullName: labelFirstElement || "Chọn bác sĩ..." },
      ...res.data?.data,
    ];
    setListData(newListData);
  };

  useEffect(() => {
    getListDoctorsByClinic();
  }, [clinicId]);

  return (
    <select
      className={`bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none w ${customClassName}`}
      value={doctorId}
      onChange={(e: any) => onChange(e.target.value)}
      required={required}
      {...customClassName}
    >
      {listData?.map((data: DoctorType, idx: number) => (
        <option selected={idx == 0 ? true : false} key={data?.id} value={data?.id}>
          {data?.fullName}
        </option>
      ))}
    </select>
  );
}
