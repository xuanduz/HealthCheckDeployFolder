import { Button, Input, Option, Select, Tooltip, Typography } from "@material-tailwind/react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FaHandPointRight } from "react-icons/fa";
import { useState } from "react";
import { CodeType } from "../../data/types.data";
import ClinicSelectComponent from "../clinic/ClinicSelectComponent";
import HorizontalLine from "./HorizontalLineComponent";
import SpecialtyComponent from "./SpecialtyComponent";
import { FilterDoctorPatientType } from "../../pages/patients/DoctorsPage";
import { GrPowerReset } from "react-icons/gr";

export interface PriceRangeType {
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}

export interface InputFilter {
  name?: string;
  provinceKey?: string;
  clinicId?: number | string;
  specialtyId?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
}

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export interface FilterFormProps {
  haveName?: boolean;
  haveProvince?: boolean;
  havePrice?: boolean;
  haveClinic?: boolean;
  haveSpecialty?: boolean;
  listProvinces?: CodeType[];
  queryFilterBefore?: FilterDoctorPatientType;
  handleSubmitFilterForm: Function;
}

const FilterForm = (props: FilterFormProps) => {
  const {
    haveName,
    haveProvince,
    havePrice,
    haveClinic,
    haveSpecialty,
    listProvinces,
    queryFilterBefore,
    handleSubmitFilterForm,
  } = props;

  const [formData, setFormData] = useState<InputFilter>();

  const marks: Mark[] = [
    {
      value: 0,
      label: "< 200k",
    },
    {
      value: 33,
      label: "200k - 300k",
    },
    {
      value: 66,
      label: "300k - 400k",
    },
    {
      value: 100,
      label: "> 400k",
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitFilterForm(formData);
      }}
    >
      {haveName && (
        <Input
          size="lg"
          label="Tìm kiếm theo tên"
          onChange={(e: any) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />
      )}
      {haveClinic && (
        <div className="my-5">
          <ClinicSelectComponent
            clinicId={queryFilterBefore?.clinicId}
            handleChange={(value: any) =>
              setFormData({
                ...formData,
                clinicId: value,
              })
            }
          />
        </div>
      )}
      {haveSpecialty && (
        <div className="my-5">
          <SpecialtyComponent
            specialtyId={queryFilterBefore?.specialtyId}
            handleChange={(id: any) =>
              setFormData({
                ...formData,
                specialtyId: id,
              })
            }
            customClassName={"w-[320px]"}
          />
        </div>
      )}
      {haveProvince && (
        <div className="mt-5">
          <Select
            label="Chọn tỉnh/thành phố"
            menuProps={{ className: "h-42" }}
            onChange={(value: any) =>
              setFormData({
                ...formData,
                provinceKey: value,
              })
            }
          >
            {listProvinces?.map((province: CodeType, ind: number) => (
              <Option key={province.id} value={province.key}>
                {province.value}
              </Option>
            ))}
          </Select>
        </div>
      )}
      {havePrice && (
        <div className="select-price mt-5">
          <Typography variant="h6">Nhập mức giá (VNĐ)</Typography>
          <div className="flex justify-between gap-5 my-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Nhỏ nhất</label>
              <input
                type="number"
                onChange={(e: any) => setFormData({ ...formData, minPrice: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                placeholder="(Ví dụ: 200000)"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Lớn nhất</label>
              <input
                type="number"
                onChange={(e: any) => setFormData({ ...formData, maxPrice: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                placeholder="(Ví dụ: 300000)"
              ></input>
            </div>
          </div>
        </div>
      )}
      <div className="flex mt-6 gap-3">
        <Button className="flex justify-center items-center gap-2" fullWidth type="submit">
          <FaHandPointRight size={17} />
          Áp dụng
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
