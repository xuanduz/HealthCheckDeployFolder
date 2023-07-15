import { Typography } from "@material-tailwind/react";
import DoctorCaring from "../../assets/images/doctor-caring.png";
import SvgExport1 from "../../assets/images/svgexport-1.png";
import SvgExport2 from "../../assets/images/svgexport-2.png";
import SvgExport3 from "../../assets/images/svgexport-3.png";
import SvgExport4 from "../../assets/images/svgexport-4.png";
import SvgExport5 from "../../assets/images/svgexport-5.png";

const AdviceComponent = () => {
  return (
    <>
      <Typography variant="h1" className="advice-text text-center">
        Tại sao lại lựa chọn Health Check
      </Typography>
      <div className="advice-body mt-10">
        <div className="advice-image w-full h-full relative">
          <img src={DoctorCaring} alt="" className="absolute top-0 bottom-0 m-auto" />
        </div>
        <ul className="ml-14 flex flex-col gap-10 justify-center">
          <li className="flex gap-10">
            <div className="h-full flex justify-center">
              <div className="w-24 rounded-full shadow-sm-full shadow-blue-700/40 m-auto p-4">
                <img src={SvgExport1} alt="icon" className="w-full" />
              </div>
            </div>
            <div>
              <Typography variant="h3" className="mb-4">
                Chất lượng tốt
              </Typography>
              <p>
                Dịch vụ xét nghiệm Health Check uy tín nhất với nhiều năm kinh nghiệm, đội ngũ bác
                sĩ chuyên gia hàng đầu, hệ thống xét nghiệm hiện đại nhất Đông Nam Á.
              </p>
            </div>
          </li>
          <li className="flex gap-10">
            <div className="h-full flex justify-center">
              <div className="w-24 rounded-full shadow-sm-full shadow-blue-700/40 m-auto p-4">
                <img src={SvgExport2} alt="icon" className="w-full" />
              </div>
            </div>
            <div>
              <Typography variant="h3" className="mb-4">
                Dịch vụ tốt
              </Typography>
              <p>Khách hàng là trên hết, thái độ ân cần, chu đáo, giải đáp thắc mắc 24/7.</p>
            </div>
          </li>
          <li className="flex gap-10">
            <div className="h-full flex justify-center">
              <div className="w-24 rounded-full shadow-sm-full shadow-blue-700/40 m-auto p-4">
                <img src={SvgExport3} alt="icon" className="w-full" />
              </div>
            </div>
            <div>
              <Typography variant="h3" className="mb-4">
                Chi phí hợp lý
              </Typography>
              <p>Giá đã được niêm yết và quản lý theo quy định.</p>
            </div>
          </li>
          <li className="flex gap-10">
            <div className="h-full flex justify-center">
              <div className="w-24 rounded-full shadow-sm-full shadow-blue-700/40 m-auto p-4">
                <img src={SvgExport4} alt="icon" className="w-full" />
              </div>
            </div>
            <div>
              <Typography variant="h3" className="mb-4">
                Bảo mật
              </Typography>
              <p>Thông tin bảo mật tuyệt đối và được cập nhật vào hồ sơ bệnh án của bệnh nhân.</p>
            </div>
          </li>
          <li className="flex gap-10">
            <div className="h-full flex justify-center">
              <div className="w-24 rounded-full shadow-sm-full shadow-blue-700/40 m-auto p-4">
                <img src={SvgExport5} alt="icon" className="w-full" />
              </div>
            </div>
            <div>
              <Typography variant="h3" className="mb-4">
                Tiện lợi
              </Typography>
              <p>Tìm kiếm lịch trống và đặt lịch online nhanh chóng.</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdviceComponent;
