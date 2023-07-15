import Container from "./ContainerComponent";
import BgFooter from "../../assets/images/bg-footer.png";
import { Typography } from "@material-tailwind/react";
import logo from "../../assets/images/logo.png";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <div
      className="footer w-full h-[44rem] pt-52 relative"
      style={{ backgroundImage: `url(${BgFooter})` }}
    >
      <div className="w-10/12 m-auto ">
        <div className="mb-5">
          <img src={logo} alt="logo" className="h-20" />
        </div>
        <div className="flex justify-between gap-10 text-white">
          <ul className="flex flex-col gap-5 basis-3/6">
            <li>
              <Typography variant="h5">
                Công ty Cổ phần Công nghệ và Dịch vụ Y tế số Health Check
              </Typography>
            </li>
            <li className="flex gap-1">
              <span className="font-semibold">Địa chỉ:</span> <p>Số 3 Câu Giấy</p>
            </li>
            <li className="flex gap-1">
              <span className="font-semibold">Hottline:</span> <p>1900 123123</p>
            </li>
            <li className="flex gap-1">
              <span className="font-semibold">Email:</span> <p>info@healthcheck.vn</p>
            </li>
            <li></li>
          </ul>
          <ul className="flex flex-col gap-5 basis-2/6">
            <li>Liên hệ hợp tác</li>
            <li>Câu hỏi thường gặp</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách Bảo mật</li>
          </ul>
          <ul className="flex flex-col gap-5 basis-1/6">
            <li>Kết nối với chúng tôi</li>
            <li className="flex gap-4">
              <FaFacebookSquare size={30} />
              <FaYoutube size={32} />
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 ml-auto mr-auto">
          <p className="text-white text-center pb-2">© 2023 Health Check</p>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
