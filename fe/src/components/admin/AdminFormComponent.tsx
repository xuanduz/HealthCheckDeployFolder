import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { AdminType } from "../../data/types.data";
import { Button, Input, Option, Radio, Select } from "@material-tailwind/react";
import SelectComponent from "../common/SelectComponent";

export interface AdminFormComponentProps {
  data?: AdminType;
  submitButtonContent?: string;
  handleSubmitForm: SubmitHandler<FieldValues>;
}

export default function AdminFormComponent(props: AdminFormComponentProps) {
  const { data, submitButtonContent, handleSubmitForm } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>();

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-5">
        <Input type="text" label="Họ và Tên" {...register("fullName")} required></Input>
        <Input type="email" label="Email" {...register("email")} required></Input>
        <Input type="password" label="Mật khẩu" {...register("password")} required></Input>
        <Input
          type="password"
          label="Nhập lại mật khẩu"
          {...register("rePassword")}
          required
        ></Input>
        <Input
          type="text"
          label="Số điện thoại"
          {...register("phoneNumber")}
          pattern="[0-9]+"
          maxLength={12}
          minLength={9}
          required
        ></Input>
        <select
          className={`bg-white border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none`}
          {...register("role")}
          required
        >
          <option value={"ADMIN"}>ADMIN</option>
          <option value={"SUPER_ADMIN"}>SUPER ADMIN</option>
        </select>
        <div className="flex black-all-child">
          <Radio id="male" label="Nam" value={"true"} {...register("gender")} required />
          <Radio id="female" label="Nữ" value={"false"} {...register("gender")} />
        </div>
        <Button type="submit">{submitButtonContent ? submitButtonContent : "Gửi"}</Button>
      </form>
    </div>
  );
}
