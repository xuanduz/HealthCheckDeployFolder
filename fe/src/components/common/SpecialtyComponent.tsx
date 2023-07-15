import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { SpecialtyType, CodeType } from "../../data/types.data";
import { specialtiesSelector } from "../../data/recoil/commonData";
import { useRecoilValueLoadable } from "recoil";

export interface SpecialtyComponentProps {
  handleChange?: Function;
  specialtyId?: string;
  required?: boolean;
  customClassName?: string;
}

export default function SpecialtyComponent(props: any) {
  const { handleChange, specialtyId, required, customClassName } = props;
  const specialties = useRecoilValueLoadable(specialtiesSelector);
  const [listSpecialties, setListSpecialties] = useState<SpecialtyType[]>([]);
  const [value, setValue] = useState(specialtyId || "");

  useEffect(() => {
    if (specialties?.state == "hasValue") {
      const data = [{ id: "", name: "Chọn chuyên khoa" }, ...specialties?.contents?.data?.data];
      setListSpecialties(data);
    }
  }, [specialties.state]);

  const onChange = (e: any) => {
    handleChange && handleChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <select
        className={`bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${customClassName}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {listSpecialties?.map((specialty: SpecialtyType, idx: number) => (
          <option selected={idx == 0 ? true : false} key={specialty?.id} value={specialty?.id}>
            {specialty?.name}
          </option>
        ))}
      </select>
    </>
  );
}
