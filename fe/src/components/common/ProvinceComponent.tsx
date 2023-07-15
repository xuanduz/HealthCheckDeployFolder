import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CodeType } from "../../data/types.data";
import { provincesSelector } from "../../data/recoil/commonData";
import { useRecoilValueLoadable } from "recoil";

export interface ProvinceComponentProps {
  handleChange?: Function;
  provinceKey?: string;
  required?: boolean;
  customClassName?: string;
  disabled?: boolean;
}

export default function ProvinceComponent(props: ProvinceComponentProps) {
  const { handleChange, provinceKey, required, customClassName, ...rest } = props;
  const provinces = useRecoilValueLoadable(provincesSelector);
  const [listProvinces, setListProvinces] = useState<CodeType[]>([]);
  const [value, setValue] = useState();

  useEffect(() => {
    if (provinces?.state == "hasValue") {
      const data = [
        { id: 0, key: "", type: "", value: "Chọn tỉnh/thành" },
        ...provinces?.contents?.data?.data,
      ];
      setListProvinces(data);
    }
  }, [provinces.state]);

  useEffect(() => {
    setValue(provinceKey as any);
  }, [provinceKey]);

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
        {...rest}
      >
        {listProvinces?.map((province: CodeType, idx: number) => (
          <option selected={idx == 0 ? true : false} key={province.id} value={province.key}>
            {province.value}
          </option>
        ))}
      </select>
    </>
  );
}
