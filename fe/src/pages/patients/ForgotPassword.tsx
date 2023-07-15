import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import bannerDoctors from "../../assets/images/doctors.jpg";
import logo from "../../assets/images/logo.png";
import HorizontalLine from "../../components/common/HorizontalLineComponent";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { PostRequest } from "../../utils/rest-api";

const ForgotPasswordPage = () => {
  const [emailData, setEmailData] = useState<any>({ show: true });
  const [codeData, setCodeData] = useState<any>({ show: false });
  const [newPassData, setNewPassData] = useState<any>({ show: false });

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSubmitEmail = async () => {
    if (emailData?.show) {
      const res = await PostRequest(
        `${process.env.REACT_APP_API}/forgot-password`,
        { email: emailData?.email },
        true
      );
      if (res.data?.success) {
        setEmailData({
          ...emailData,
          show: false,
        });
        setCodeData({
          ...codeData,
          show: true,
        });
      }
    }
    if (codeData?.show) {
      const res = await PostRequest(
        `${process.env.REACT_APP_API}/verify-code`,
        { email: emailData?.email, codePassword: codeData?.code },
        true
      );
      if (res.data?.success) {
        setEmailData({
          ...emailData,
          show: false,
        });
        setCodeData({
          ...codeData,
          show: false,
        });
        setNewPassData({
          ...newPassData,
          show: true,
        });
      }
    }
    if (newPassData?.show) {
      if (newPassData?.newPass != newPassData?.reNewPass) {
        toast.warn("Nhập khẩu nhập lại không khớp");
      } else {
        await PostRequest(
          `${process.env.REACT_APP_API}/new-password`,
          {
            email: emailData?.email,
            codePassword: codeData?.code,
            newPassword: newPassData?.newPass,
          },
          true
        );
      }
    }
  };

  return (
    <div className="login-content h-screen flex justify-center">
      <div className="login-container w-10/12 flex items-center">
        <div className="login-banner w-1/2 flex flex-col items-center">
          <h3 className="font-extrabold text-center text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400">
            {"Xin chào !"}
          </h3>
          <img src={bannerDoctors} className="login-banner-img" alt="" />
        </div>
        <div className="login-form w-1/2 flex justify-center">
          <Card shadow={true} className={"w-96 h-auto p-4"}>
            <div className="flex justify-center mb-4">
              <img src={logo} className="login-banner-img w-24" alt="" />
            </div>
            <HorizontalLine widthScale="80%" />
            <Typography className="text-center mt-2" variant="h2" color="blue-gray">
              Quên mật khẩu
            </Typography>
            <form className="mt-8 mb-2 w-84 max-w-screen-lg sm:w-84">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Email"
                  type="email"
                  value={emailData?.email}
                  required
                  disabled={!emailData?.show}
                  onChange={(e: any) => {
                    setEmailData({
                      ...emailData,
                      email: e.target.value,
                    });
                  }}
                />
                {codeData?.show ? (
                  <Input
                    size="lg"
                    label="Nhập mã"
                    type="text"
                    value={codeData?.code}
                    required
                    onChange={(e: any) => {
                      setCodeData({
                        ...codeData,
                        code: e.target.value,
                      });
                    }}
                  />
                ) : null}

                {newPassData?.show ? (
                  <>
                    <Input
                      size="lg"
                      label="Mật khẩu mới"
                      type="password"
                      value={newPassData?.newPass}
                      required
                      onChange={(e: any) => {
                        setNewPassData({
                          ...newPassData,
                          newPass: e.target.value,
                        });
                      }}
                    />
                    <Input
                      size="lg"
                      label="Nhập lại khẩu mới"
                      type="password"
                      value={newPassData?.reNewPass}
                      required
                      onChange={(e: any) => {
                        setNewPassData({
                          ...newPassData,
                          reNewPass: e.target.value,
                        });
                      }}
                    />
                  </>
                ) : null}
              </div>
              <div className="flex justify-between">
                <Link to={"/register"}>
                  <p className="text-blue-600">Đăng ký ngay</p>
                </Link>
                <Link to={"/login"}>
                  <p className="text-blue-600">Đăng nhập</p>
                </Link>
              </div>
              <Button className="mt-4" fullWidth onClick={() => handleSubmitEmail()}>
                Gửi
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
