import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DoctorType, SpecialtyType } from "../../data/types.data";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { Button, Card, Input, Radio, Textarea, Typography } from "@material-tailwind/react";
import PositionComponent from "../../components/common/PositionComponent";
import ProvinceComponent from "../../components/common/ProvinceComponent";
import SpecialtyMultiSelectComponent from "../../components/common/SpecialtySelectComponent";
import ClinicSelectComponent from "../../components/clinic/ClinicSelectComponent";
import DoctorPostComponent from "../../components/doctor/DoctorPostComponent";
import DialogComponent from "../../components/dialog/DialogComponent";
import { DeleteRequest, GetRequest, PostRequest, PostRequestWithFile } from "../../utils/rest-api";
import EmptyDoctor from "../../assets/images/empty-doctor.png";

export default function DoctorDetailPageAdmin() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DoctorType>({});
  const [description, setDescription] = useState<string>("");
  const [preview, setPreview] = useState<any>();

  const getDoctorDetail = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API_ADMIN}/doctor/${id}`);
    const data = res.data?.data;
    if (data) {
      setDoctor(data);
      setDescription(data?.descriptionHTML);
      setPreview(data?.image);
    }
  };

  const checkIdParams = () => {
    if (+(id as any)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    if (checkIdParams()) {
      getDoctorDetail();
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data: DoctorType = {
      ...doctor,
      descriptionHTML: description,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // if (typeof data[key as keyof DoctorType] == "string") {
      //   formData.append(key, value);
      // } else {
      //   formData.append(key, JSON.stringify(value));
      // }
      if (key == "specialtyData") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    console.log("data", data, formData.get("id"));
    if (checkIdParams()) {
      await PostRequestWithFile(`${process.env.REACT_APP_API_ADMIN}/doctor/edit`, formData, true);
    } else {
      await PostRequestWithFile(
        `${process.env.REACT_APP_API_ADMIN}/doctor/add-new`,
        formData,
        true
      );
    }
  };

  const handleDelete = async () => {
    await DeleteRequest(`${process.env.REACT_APP_API_ADMIN}/doctor/${id}`, true);
    navigate(-1);
  };

  const updateData = (newValue: any) => {
    setDoctor({
      ...doctor,
      ...newValue,
    });
  };

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
    setDoctor({
      ...doctor,
      filename: e.target.files[0],
    });
  };

  return (
    <SmallContainerComponent>
      <Typography variant="h3" className="">
        Thông tin bác sĩ
      </Typography>
      <Card className="mt-4 p-3">
        <form className="flex flex-col mt-6 gap-6" onSubmit={handleSubmit}>
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
              <Radio
                name="gender"
                id="false"
                label="Nữ"
                defaultChecked={checkIdParams() ? !doctor?.gender : false}
              />
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
            {!checkIdParams() ? (
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
          <div className="flex justify-between h-[160px] mb-5">
            <div className="flex flex-col gap-3">
              <p>Ảnh</p>
              <input
                type="file"
                onChange={onSelectFile}
                accept="image/png, image/gif, image/jpeg, image/jpg"
              ></input>
            </div>
            <div className="min-w-[200px] max-w-[180px] border-2">
              <img src={preview || EmptyDoctor} alt="" />
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
              handleChange={(specialies: SpecialtyType[]) =>
                updateData({ specialtyData: specialies })
              }
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
          <DoctorPostComponent
            descriptionHTML={doctor?.descriptionHTML}
            setDescriptionHTML={setDescription}
          />
          <div className="flex justify-between">
            <div>
              {checkIdParams() ? (
                <div>
                  <DialogComponent
                    displayButton={
                      <Button color="red" className="flex gap-2">
                        Xoá
                      </Button>
                    }
                    formatterContent={
                      <Typography variant="h5">
                        Bạn có muốn xoá bác sĩ {doctor?.fullName}?
                      </Typography>
                    }
                    acceptText="Đồng ý"
                    acceptAction={() => handleDelete()}
                    size="sm"
                    title="Lưu ý"
                  />
                </div>
              ) : null}
            </div>
            <div className="text-center ">
              <Button className="flex gap-2" type="submit">
                Xác nhận
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </SmallContainerComponent>
  );
}
