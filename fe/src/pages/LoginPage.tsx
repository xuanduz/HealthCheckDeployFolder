import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import bannerDoctors from "../assets/images/doctors.jpg";
import logo from "../assets/images/logo.png";
import HorizontalLine from "../components/common/HorizontalLineComponent";
import axios from "axios";
import { RouteNameAdmin, RouteNameDoctor, RouteNamePatient } from "../routes/routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import {
  adminAccessTokenSelector,
  adminRefreshTokenSelector,
} from "../data/recoil/admin/auth.admin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export interface LoginPageProps {
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

const LoginPage = (props: LoginPageProps) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [refreshToken, setRefreshToken] = useRecoilState(adminRefreshTokenSelector);
  const [accessToken, setAccessToken] = useRecoilState(adminAccessTokenSelector);
  const { role } = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let location = useLocation();

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const isPatientRoute = () => {
    return !location.pathname.includes("/system");
  };

  const getTitleWelcome = () => {
    if (location.pathname.includes("/system-admin")) {
      return "Xin chào Quản trị";
    }
    if (location.pathname.includes("/system-doctor")) {
      return "Xin chào Bác sĩ";
    }

    return "Xin chào";
  };

  const loginSuccess = (data: any) => {
    setRefreshToken(data.refreshToken);
    setAccessToken(data.accessToken);
    toast.success(data.message);
    if (data?.role) {
      cookies.set("role", data?.role);
    } else {
      cookies.set("role", role);
    }
    cookies.set("email", email);
    const decoded: any = jwt(data.accessToken || data.refreshToken);
    cookies.set("id", decoded?.id);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (role == "ADMIN") {
      const { data } = await axios.post(`${process.env.REACT_APP_API + RouteNameAdmin.LOGIN}`, {
        email: email,
        password: password,
      });
      if (data.success) {
        loginSuccess(data);
        navigate(RouteNameAdmin.HOME);
      } else {
        toast.warn(data.message);
      }
    }
    if (role == "DOCTOR") {
      const { data } = await axios.post(`${process.env.REACT_APP_API + RouteNameDoctor.LOGIN}`, {
        email: email,
        password: password,
      });
      if (data.success) {
        loginSuccess(data);
        navigate(RouteNameDoctor.HOME);
      } else {
        toast.warn(data.message);
      }
    }
    if (role == "PATIENT") {
      const { data } = await axios.post(`${process.env.REACT_APP_API + RouteNamePatient.LOGIN}`, {
        email: email,
        password: password,
      });
      if (data.success) {
        loginSuccess(data);
        navigate("/");
      } else {
        toast.warn(data.message);
      }
    }
  };

  return (
    <div className="login-content h-screen flex justify-center">
      <div className="login-container w-10/12 flex items-center">
        <div className="login-banner w-1/2 flex flex-col items-center">
          <h3 className="font-extrabold text-center text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400">
            {getTitleWelcome()}
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
              Đăng nhập
            </Typography>
            <form className="mt-8 mb-2 w-84 max-w-screen-lg sm:w-84" onSubmit={handleLogin}>
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  type="password"
                  size="lg"
                  label="Mật khẩu"
                  value={password}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {isPatientRoute() ? (
                <div className="flex justify-between">
                  <Link to={"/register"}>
                    <p className="text-blue-600">Đăng ký ngay</p>
                  </Link>
                  <Link to={"/forgot-password"}>
                    <p className="text-blue-600">Quên mật khẩu</p>
                  </Link>
                </div>
              ) : null}
              <Button className="mt-4" fullWidth type="submit">
                Đăng nhập
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
