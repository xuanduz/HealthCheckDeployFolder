import { useState } from "react";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { DataChangePassword } from "../admin/ChangePasswordPage.admin";
import { PutRequest } from "../../utils/rest-api";
import { Button, Input, Typography } from "@material-tailwind/react";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

export default function ChangePasswordPage() {
  const [data, setData] = useState<DataChangePassword>({});
  const cookies = new Cookies();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const submitData = {
      email: cookies.get("email"),
      ...data,
    };
    if (data.newPassword == data.reNewPassword) {
      await PutRequest(`${process.env.REACT_APP_API}/patient/change-password`, submitData, true);
    } else {
      toast.warn("Mật khẩu mới không khớp !");
    }
  };

  return (
    <>
      <SmallContainerComponent>
        <SmallContainerComponent>
          <div className="flex justify-center">
            <form onSubmit={onSubmit} className="flex flex-col mt-12 gap-6 w-[400px]">
              <Typography variant="h3">Đổi mật khẩu</Typography>
              <Input
                type="password"
                label="Mật khẩu cũ"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    oldPassword: e.target.value,
                  })
                }
              ></Input>
              <Input
                type="password"
                label="Mật khẩu mới"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    newPassword: e.target.value,
                  })
                }
              ></Input>
              <Input
                type="password"
                label="Nhập lại mật khẩu mới"
                required
                onChange={(e: any) =>
                  setData({
                    ...data,
                    reNewPassword: e.target.value,
                  })
                }
              ></Input>
              <Button type="submit">{"Xác nhận"}</Button>
            </form>
          </div>
        </SmallContainerComponent>
      </SmallContainerComponent>
    </>
  );
}
