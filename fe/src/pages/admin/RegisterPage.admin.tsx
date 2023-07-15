import { Card, CardBody, Typography } from "@material-tailwind/react";
import AdminFormComponent from "../../components/admin/AdminFormComponent";
import { AdminType } from "../../data/types.data";
import { toast } from "react-toastify";
import { PostRequest } from "../../utils/rest-api";

const RegisterPageAdmin = () => {
  const handleSubmitForm = async (data: AdminType) => {
    if (data.password == data.rePassword) {
      await PostRequest(
        `${process.env.REACT_APP_API_ADMIN}/register`,
        {
          ...data,
          gender: JSON.parse(data?.gender as string),
        },
        true
      );
    } else {
      toast.warn("Nhập lại mật khẩu không đúng");
    }
  };

  return (
    <>
      <Typography variant="h3" className="">
        Đăng ký thêm tài khoản Admin
      </Typography>
      <div className="flex justify-center">
        <div className="w-[350px] mt-5 ">
          <Card>
            <CardBody>
              <AdminFormComponent
                handleSubmitForm={handleSubmitForm}
                submitButtonContent="Đăng ký"
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPageAdmin;
