import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CodeType } from "../../data/types.data";
import { positionsSelector } from "../../data/recoil/commonData";
import { useRecoilValueLoadable } from "recoil";

export interface PositionComponentProps {
  handleChange?: Function;
  positionKey?: string;
  required?: boolean;
  customClassName?: string;
}

export default function PositionComponent(props: any) {
  const { handleChange, positionKey, required, customClassName } = props;
  const positions = useRecoilValueLoadable(positionsSelector);
  const [listPositions, setListPositions] = useState<CodeType[]>([]);
  const [value, setValue] = useState();

  useEffect(() => {
    if (positions?.state == "hasValue") {
      const data = [
        { id: 0, key: "", type: "", value: "Chọn chức danh" },
        ...positions?.contents?.data?.data,
      ];
      setListPositions(data);
    }
  }, [positions.state]);

  useEffect(() => {
    setValue(positionKey as any);
  }, [positionKey]);

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
        {listPositions?.map((position: CodeType, idx: number) => (
          <option selected={idx == 0 ? true : false} key={position.id} value={position.key}>
            {position.value}
          </option>
        ))}
      </select>
    </>
  );
}
