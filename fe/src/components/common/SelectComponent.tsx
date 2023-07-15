import { CodeType } from "../../data/types.data";

export interface SelectComponentProps {
  value?: string;
  data?: CodeType;
  onChange: Function;
  labelFirstElement?: string;
  customClassName?: any;
  required?: boolean;
}

export default function SelectComponent(props: any) {
  const { value, data, onChange, labelFirstElement, customClassName, required } = props;
  const listData: CodeType[] = [
    { id: 0, key: "", type: "", value: labelFirstElement || "Chọn..." },
    ...data,
  ];

  return (
    <select
      className={`bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none w ${customClassName}`}
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      required={required}
      {...customClassName}
    >
      {listData?.map((data: CodeType, idx: number) => (
        <option selected={idx == 0 ? true : false} key={data?.id || data?.key} value={data?.key}>
          {data.value}
        </option>
      ))}
    </select>
  );
}
