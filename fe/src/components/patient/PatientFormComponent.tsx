import { Button, Input, Option, Radio, Select, Textarea } from "@material-tailwind/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { bookingOption, listStatus } from "../../data/selection.data";
import { PatientType } from "../../data/types.data";
import { GetRequest } from "../../utils/rest-api";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import SelectComponent from "../common/SelectComponent";
import ProvinceComponent from "../common/ProvinceComponent";

export interface PatientFormComponentProps {
  submitButtonContent?: string;
  handleSubmitForm: SubmitHandler<FieldValues>;
  haveStatus?: boolean;
  haveResultFile?: boolean;
  disableSubmit?: boolean;
  disableBookingType?: boolean;
}

export default function PatientFormComponent(props: PatientFormComponentProps) {
  const {
    submitButtonContent,
    handleSubmitForm,
    haveStatus,
    haveResultFile,
    disableSubmit,
    disableBookingType,
  } = props;
  const cookies = new Cookies();
  const [patient, setPatient] = useState<PatientType>();
  const [reason, setReason] = useState("");
  const [bookingType, setBookingType] = useState("");

  const getPatient = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/patient/${cookies.get("id")}`);
    setPatient(res.data?.data);
  };

  useEffect(() => {
    getPatient();
  }, []);

  const updateData = (newValue: any) => {
    setPatient({
      ...patient,
      ...newValue,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    handleSubmitForm &&
      handleSubmitForm({
        patient: patient,
        reason: reason,
        bookingType: bookingType,
      });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col mt-6 gap-6">
      <div className="flex flex-col black-all-child">
        <div className="flex justify-between items-center">
          {!disableBookingType ? (
            <div>
              <SelectComponent
                data={bookingOption}
                onChange={(value: any) => setBookingType(value)}
                // customClassName="w-72"
                labelFirstElement="Hình thức khám bệnh"
                required={true}
              />
            </div>
          ) : null}
          <div className=" basis-1/2">
            <div className="flex gap-1 mt-2">
              <p>Chọn giới tính</p>
              <span className="text-red-600">*</span>
            </div>
            <div
              className="flex gap-10"
              onChange={(e: any) => {
                updateData({ gender: JSON.parse(e.target.id) });
              }}
            >
              <Radio
                name="gender"
                id="true"
                label="Nam"
                defaultChecked={patient?.gender}
                required
              />
              <Radio name="gender" id="false" label="Nữ" defaultChecked={!patient?.gender} />
            </div>
          </div>
        </div>
      </div>
      <Input
        size="lg"
        label="Họ tên"
        required
        value={patient?.fullName}
        onChange={(e: any) => updateData({ fullName: e.target.value })}
      />
      <Input
        size="lg"
        label="Email"
        type="email"
        required
        value={patient?.email}
        onChange={(e: any) => updateData({ email: e.target.value })}
      />
      <Input
        size="lg"
        label="Số điện thoại"
        required
        pattern="[0-9]+"
        maxLength={12}
        value={patient?.phoneNumber}
        onChange={(e: any) => updateData({ phoneNumber: e.target.value })}
      />
      <Input
        size="lg"
        label="Ngày sinh"
        type="date"
        required
        value={patient?.birthday?.split("-").reverse().join("-")}
        onChange={(e: any) =>
          updateData({ birthday: e.target.value.split("-").reverse().join("-") })
        }
      />
      <div>
        <div className="flex gap-1 mb-1 black-all-child">
          <p>Tỉnh/Thành</p>
          <span className="text-red-600">*</span>
        </div>
        <ProvinceComponent
          required={true}
          provinceKey={patient?.provinceKey}
          handleChange={(value: string) => updateData({ provinceKey: value })}
        />
      </div>
      <Input
        size="lg"
        label="Địa chỉ cụ thể"
        required
        value={patient?.addressDetail}
        onChange={(e: any) => updateData({ addressDetail: e.target.value })}
      />
      <Textarea
        label="Lý do khám bệnh"
        value={reason}
        onChange={(e: any) => setReason(e.target.value)}
      />
      {!disableSubmit ? (
        <Button type="submit">{submitButtonContent ? submitButtonContent : "Đặt lịch"}</Button>
      ) : null}
    </form>
  );
}
