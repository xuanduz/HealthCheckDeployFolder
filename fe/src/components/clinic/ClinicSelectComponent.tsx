import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ClinicType, CodeType } from "../../data/types.data";
import { clinicsSelector } from "../../data/recoil/commonData";
import { useRecoilValueLoadable } from "recoil";

export interface ClinicSelectComponentProps {
  handleChange?: Function;
  clinicId?: string | number;
  provinceKey?: string | number;
  required?: boolean;
  customClassName?: string;
}

export default function ClinicSelectComponent(props: ClinicSelectComponentProps) {
  const { handleChange, clinicId, required, customClassName, provinceKey } = props;
  const clinics = useRecoilValueLoadable(clinicsSelector);
  const [listClinics, setListClinics] = useState<ClinicType[]>([]);
  const [value, setValue] = useState();

  useEffect(() => {
    if (clinics?.state == "hasValue") {
      const data = [{ id: "", name: "Chọn cơ sở y tế" }, ...clinics?.contents?.data?.data];
      setListClinics(data);
    }
  }, [clinics.state]);

  useEffect(() => {
    setValue(clinicId as any);
  }, [clinicId]);

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
        {listClinics?.map((clinic: ClinicType, idx: number) => (
          <option selected={idx == 0 ? true : false} key={clinic?.id} value={clinic?.id}>
            {clinic?.name}
          </option>
        ))}
      </select>
    </>
  );
}
