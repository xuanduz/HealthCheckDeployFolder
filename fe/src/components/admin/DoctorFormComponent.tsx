import { useState } from "react";
import { DoctorType, SpecialtyType } from "../../data/types.data";
import { Button, Input, Radio, Textarea, Typography } from "@material-tailwind/react";
import ProvinceComponent from "../common/ProvinceComponent";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import PositionComponent from "../common/PositionComponent";
import ClinicSelectComponent from "../clinic/ClinicSelectComponent";
import SpecialtyMultiSelectComponent from "../common/SpecialtySelectComponent";
import DoctorPostComponent from "../doctor/DoctorPostComponent";
import DialogComponent from "../dialog/DialogComponent";

export interface DoctorFormComponentComponentProps {
  handleSubmitForm: Function;
  data?: any;
  isNew?: boolean;
  handleDelete?: Function;
}

export default function DoctorFormComponent(props: DoctorFormComponentComponentProps) {
  const { handleSubmitForm, data, isNew, handleDelete } = props;
  const [doctor, setDoctor] = useState<DoctorType>(data);
  const [description, setDescription] = useState<string>(data?.descriptionHTML || "");

  const onSubmit = (e: any) => {
    e.preventDefault();
    const updateValue = {
      ...doctor,
      descriptionHTML: description,
    };
    handleSubmitForm(updateValue);
  };

  const updateData = (newValue: any) => {
    setDoctor({
      ...doctor,
      ...newValue,
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col mt-6 gap-6">
      <div className="flex flex-col black-all-child">
        <div className="flex gap-1">
          <p>Chọn giới tính</p>
          <span className="text-red-600">*</span>
        </div>
        <div
          className="flex"
          onChange={(e: any) => {
            updateData({ gender: JSON.parse(e.target.id) });
          }}
        >
          <Radio name="gender" id="true" label="Nam" defaultChecked={doctor?.gender} required />
          <Radio name="gender" id="false" label="Nữ" defaultChecked={!doctor?.gender} />
        </div>
      </div>
      <div className="flex gap-5">
        <Input
          size="lg"
          label="Email"
          value={doctor?.email}
          onChange={(e: any) => updateData({ email: e.target.value })}
          required
        />
        {isNew ? (
          <Input
            size="lg"
            label="Password"
            type="password"
            value={doctor?.password}
            onChange={(e: any) => updateData({ password: e.target.value })}
            required
          />
        ) : null}
      </div>
      <Input
        size="lg"
        label="Họ tên bác sĩ"
        value={doctor?.fullName}
        onChange={(e: any) => updateData({ fullName: e.target.value })}
        required
      />
      <div className="flex gap-5">
        <Input
          size="lg"
          label="Số điện thoại"
          value={doctor?.phoneNumber}
          pattern="[0-9]+"
          maxLength={12}
          onChange={(e: any) => updateData({ phoneNumber: e.target.value })}
          required
        />
        <Input
          size="lg"
          label="Giá (VNĐ)"
          value={doctor?.price}
          type="number"
          onChange={(e: any) => updateData({ price: e.target.value })}
          required
        />
      </div>
      <div className="flex gap-5 h-[160px]">
        <Input type="text" label="Link Ảnh"></Input>
        <div className="min-w-[150px] max-w-[180px] border-2">
          <img src={doctor?.image || EmptyDoctor} alt="" />
        </div>
      </div>
      <div className="flex gap-5 black-all-child">
        <div className="w-full">
          <p>Chức danh</p>
          <PositionComponent
            positionKey={doctor?.positionKey}
            handleChange={(value: string) => updateData({ positionKey: value })}
          />
        </div>
        <div className="w-full">
          <p>Tỉnh/Thành</p>
          <ProvinceComponent
            required={true}
            provinceKey={doctor?.provinceKey}
            handleChange={(value: string) => updateData({ provinceKey: value })}
          />
        </div>
      </div>
      <div className="black-all-child flex flex-col gap-5">
        <SpecialtyMultiSelectComponent
          required={true}
          specialtyData={doctor?.specialtyData}
          handleChange={(specialies: SpecialtyType[]) => updateData({ specialtyData: specialies })}
        />
        <ClinicSelectComponent
          required={true}
          clinicId={doctor?.clinicId}
          handleChange={(value: string) => updateData({ clinicId: value })}
        />
      </div>
      <Textarea
        label="Mô tả"
        value={doctor?.describe}
        onChange={(e: any) => updateData({ describe: e.target.value })}
      />
      <DoctorPostComponent descriptionHTML={description} setDescriptionHTML={setDescription} />
      <div className="flex justify-between">
        <div>
          {doctor ? (
            <div>
              <DialogComponent
                displayButton={
                  <Button color="red" className="flex gap-2">
                    Xoá
                  </Button>
                }
                formatterContent={
                  <Typography variant="h5">Bạn có muốn xoá bác sĩ {doctor?.fullName}?</Typography>
                }
                acceptText="Đồng ý"
                acceptAction={() => handleDelete && handleDelete(doctor?.id)}
                size="sm"
                title="Lưu ý"
              />
            </div>
          ) : null}
        </div>
        <div className="text-center ">
          <Button type="submit" className="w-full mb-2">
            {"Xác nhận"}
          </Button>
        </div>
      </div>
    </form>
  );
}
