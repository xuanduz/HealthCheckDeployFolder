import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import ProvinceComponent from "../common/ProvinceComponent";
import { ClinicType } from "../../data/types.data";
import { useState } from "react";
import ClinicPostComponent from "./ClinicPostComponent";
import EmptyClinic from "../../assets/images/empty-clinic.png";
import DialogComponent from "../dialog/DialogComponent";

export interface ClinicFormComponentProps {
  data?: ClinicType;
  handleSubmitForm?: Function;
  handleDelete?: Function;
}

export default function ClinicFormComponent(props: ClinicFormComponentProps) {
  const { data, handleSubmitForm, handleDelete } = props;
  const [clinicData, setClinicData] = useState<ClinicType>(data || ({} as any));
  const [description, setDescription] = useState<string>(clinicData?.descriptionHTML || "");

  const onSubmit = (e: any) => {
    e.preventDefault();
    const updateValue = {
      ...clinicData,
      descriptionHTML: description,
    };
    handleSubmitForm && handleSubmitForm(updateValue);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex gap-4">
        <div className="basis-1/3">
          <Input
            type="email"
            label="Email"
            value={clinicData?.email}
            autoFocus={false}
            onChange={(e: any) =>
              setClinicData({
                ...clinicData,
                email: e.target.value,
              })
            }
            required
          ></Input>
        </div>
        <Input
          type="text"
          label="Tên"
          value={clinicData?.name}
          autoFocus={false}
          onChange={(e: any) =>
            setClinicData({
              ...clinicData,
              name: e.target.value,
            })
          }
          required
        ></Input>
      </div>
      <div className="flex gap-4 h-[160px]">
        <Input type="text" label="Link Ảnh"></Input>
        <div className="min-w-[150px] max-w-[180px] border-2">
          <img src={clinicData?.image || EmptyClinic} alt="" />
        </div>
      </div>
      <div className="black-all-child flex gap-4">
        <ProvinceComponent
          provinceKey={data?.provinceKey}
          required={true}
          customClassName={"basis-1/3"}
          handleChange={(value: string) =>
            setClinicData({
              ...clinicData,
              provinceKey: value,
            })
          }
        />
        <Input
          type="text"
          label="Địa chỉ cụ thể"
          value={clinicData?.address}
          onChange={(e: any) =>
            setClinicData({
              ...clinicData,
              address: e.target.value,
            })
          }
          required
        ></Input>
      </div>
      <Textarea
        label="Mô tả"
        value={clinicData?.describe}
        onChange={(e: any) =>
          setClinicData({
            ...clinicData,
            describe: e.target.value,
          })
        }
      ></Textarea>
      <ClinicPostComponent descriptionHTML={description} setDescriptionHTML={setDescription} />
      <div className="flex justify-between">
        <div>
          {data ? (
            <div>
              <DialogComponent
                displayButton={
                  <Button color="red" className="flex gap-2">
                    Xoá
                  </Button>
                }
                formatterContent={<Typography variant="h5">Bạn có muốn xoá ?</Typography>}
                acceptText="Đồng ý"
                acceptAction={() => handleDelete && handleDelete(data?.id)}
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
