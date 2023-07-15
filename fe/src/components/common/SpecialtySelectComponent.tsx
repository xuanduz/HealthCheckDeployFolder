import { useEffect, useState } from "react";
import { CodeType, SpecialtyType } from "../../data/types.data";
import { specialtiesSelector } from "../../data/recoil/commonData";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import Select from "react-select";

export interface SpecialtyMultiSelectComponentProps {
  handleChange?: Function;
  specialtyData?: SpecialtyType[];
  required?: boolean;
  customClassName?: string;
}

export interface SpecialOptionType extends CodeType {
  label?: string;
}

export interface ReactSelectType {
  label?: string;
  value?: string;
}

export default function SpecialtyMultiSelectComponent(props: SpecialtyMultiSelectComponentProps) {
  const { handleChange, specialtyData, required, customClassName } = props;

  const convertToSelectData = (data?: SpecialtyType[]) => {
    return data?.map((item: SpecialtyType) => ({
      value: item?.id,
      label: item?.name,
    }));
  };

  const specialties = useRecoilValueLoadable(specialtiesSelector);
  const [listSpecialties, setListSpecialties] = useState<SpecialtyType[]>([]);
  const [specialtyOptions, setSpecialtiesOption] = useState<SpecialOptionType[]>([]);
  const [defaultVal, setDefaultVal] = useState();
  const refresh = useRecoilRefresher_UNSTABLE(specialtiesSelector);

  useEffect(() => {
    if (specialties?.state == "hasValue") {
      const data = specialties?.contents?.data?.data;
      const dataFormated = data?.map((item: SpecialtyType) => ({
        value: item?.id,
        label: item?.name,
      }));
      setListSpecialties(data);
      setSpecialtiesOption(dataFormated);
    }
  }, [specialties.state]);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setDefaultVal(convertToSelectData(specialtyData) as any);
  }, [specialtyData]);

  const onChange = (values: any) => {
    const newList = listSpecialties.filter((spec: SpecialtyType) =>
      values.some((v: any) => v?.value == spec.id)
    );
    handleChange && handleChange(newList);
  };

  return (
    <div>
      <p className="b-0">Chọn chuyên khoa</p>
      <Select
        // defaultValue={defaultVal}
        value={defaultVal}
        isMulti
        name="specialty"
        options={specialtyOptions as any}
        onChange={onChange}
        required={required}
      />
      {/* <select
        className={`bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none ${customClassName}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {listSpecialtys?.map((specialty: CodeType, idx: number) => (
          <option selected={idx == 0 ? true : false} key={specialty.id} value={specialty.key}>
            {specialty.value}
          </option>
        ))}
      </select> */}
    </div>
  );
}
