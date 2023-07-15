import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "universal-cookie";
import { PostRequest } from "../../utils/rest-api";
import { toast } from "react-toastify";

type Inputs = {
  oldPassword?: string;
  newPassword?: string;
  reNewPassword?: string;
};

const ChangePassword = () => {
  const [data, setData] = useState<Inputs>({});
  const cookies = new Cookies();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const submitData = {
      id: cookies.get("id"),
      ...data,
    };
    if (data.newPassword == data.reNewPassword) {
      await PostRequest(`${process.env.REACT_APP_API_DOCTOR}/change-password`, submitData, true);
    } else {
      toast.warn("Mật khẩu mới không khớp !");
    }
  };

  return (
    <>
      <Typography variant="h3" className="">
        Đổi mật khẩu
      </Typography>
      <div className=" flex justify-center">
        <div className="w-[450px] mt-5">
          <Card>
            <CardBody>
              <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
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
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
