import { useEffect, useState } from "react";
import { ClinicType } from "../../data/types.data";
import { GetRequest, PostRequest } from "../../utils/rest-api";

export interface ClinicByProvinceComponentProps {
  provinceKey?: string;
  handleChange?: Function;
  clinicId?: string | number;
  required?: boolean;
  customClassName?: string;
}

export default function ClinicByProvinceComponent(props: ClinicByProvinceComponentProps) {
  const { handleChange, clinicId, provinceKey, required, customClassName, ...rest } = props;
  const [listClinics, setListClinics] = useState<any[]>([]);
  const [value, setValue] = useState();

  const getClinic = async () => {
    let clinicData = [];
    if (provinceKey) {
      const res = await GetRequest(
        `${process.env.REACT_APP_API}/clinic/getByProvince/${provinceKey}`
      );
      if (res?.data?.data?.length) {
        clinicData.push({ id: 0, name: "Chọn bệnh viện" }, ...res.data?.data);
      } else {
        clinicData.push({ name: "Hiện chưa có bệnh viện nào" });
      }
    } else {
      clinicData = [{ name: "Không có dữ liệu" }];
    }
    setListClinics(clinicData);
  };

  useEffect(() => {
    getClinic();
  }, [provinceKey]);

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
        {...rest}
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
