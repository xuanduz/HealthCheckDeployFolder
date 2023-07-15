import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Empty from "../../assets/images/empty.jpg";
import { SpecialtyType } from "../../data/types.data";
import DialogComponent from "./../dialog/DialogComponent";

export interface ClinicFormComponentProps {
  data?: SpecialtyType;
  handleDelete?: Function;
  handleSubmitForm?: Function;
}

export default function SpecialtyFormComponent(props: ClinicFormComponentProps) {
  const { data, handleSubmitForm, handleDelete } = props;
  const [specilatyData, setSpecilatyData] = useState<SpecialtyType>(data || ({} as any));
  const [preview, setPreview] = useState<any>();

  useEffect(() => {
    setPreview(data?.image);
  }, [data]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmitForm && handleSubmitForm(specilatyData);
  };

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
    setSpecilatyData({
      ...specilatyData,
      filename: e.target.files[0],
    });
  };

  //! TODO: Cài thêm thư viện hiển thị ảnh:
  //neptunian.github.io/react-photo-gallery/examples/lightbox.html
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        type="text"
        label="Tên"
        value={specilatyData?.name}
        autoFocus={false}
        onChange={(e: any) =>
          setSpecilatyData({
            ...specilatyData,
            name: e.target.value,
          })
        }
        required
      ></Input>
      <div className="flex justify-between h-[160px] black-all-child">
        <div className="flex flex-col gap-3">
          <p>Ảnh</p>
          <input
            type="file"
            onChange={onSelectFile}
            accept="image/png, image/gif, image/jpeg, image/jpg"
          ></input>
        </div>
        <div className="min-w-[200px] max-w-[180px] border-2">
          <img src={preview || Empty} alt="" />
        </div>
      </div>
      <Textarea
        label="Mô tả"
        value={specilatyData?.describe}
        onChange={(e: any) =>
          setSpecilatyData({
            ...specilatyData,
            describe: e.target.value,
          })
        }
      ></Textarea>
      {/* <SpecialtyPostComponent descriptionHTML={description} setDescriptionHTML={setDescription} /> */}
      <div className="flex justify-between">
        <div>
          {data ? (
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
          ) : null}
        </div>
        <Button type="submit">Lưu</Button>
      </div>
    </form>
  );
}
