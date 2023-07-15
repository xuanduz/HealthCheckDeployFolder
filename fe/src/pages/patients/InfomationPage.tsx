import { Button, Input, Radio, Typography } from "@material-tailwind/react";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { useEffect, useState } from "react";
import { PatientType } from "../../data/types.data";
import ProvinceComponent from "../../components/common/ProvinceComponent";
import Cookies from "universal-cookie";
import { GetRequest, PutRequest } from "../../utils/rest-api";

const InfomationPage = () => {
  const cookies = new Cookies();
  const [patient, setPatient] = useState<PatientType>();

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
    await PutRequest(`${process.env.REACT_APP_API}/patient/edit`, patient, true);
  };

  return (
    <SmallContainerComponent>
      <SmallContainerComponent>
        <form onSubmit={onSubmit} className="flex flex-col mt-6 gap-6">
          <Typography variant="h3">Chỉnh sửa thông tin</Typography>
          <p className="italic">
            Cập nhật thông tin để lần sau đăng ký đặt lịch nhanh chóng hơn nhé !
          </p>
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
          <Button type="submit">Lưu thông tin</Button>
        </form>
      </SmallContainerComponent>
    </SmallContainerComponent>
  );
};

export default InfomationPage;
