import { HiX } from "react-icons/hi";
import logo from "../../assets/images/logo.png";
import SidebarLinks from "./SidebarLink";
import { RouteNameAdmin, RouteNameDoctor, routesSidebar } from "../../routes/routes";
import { handleLogout } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const SidebarComponent = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const cookie = new Cookies();

  const logout = async () => {
    await handleLogout();
    //TODO: remove token in recoil state
    (cookie.get("role") == "ADMIN" || cookie.get("role") == "SUPER_ADMIN") &&
      navigate(RouteNameAdmin.LOGIN);
    cookie.get("role") == "DOCTOR" && navigate(RouteNameDoctor.LOGIN);
  };

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span className="absolute right-4 top-4 block cursor-pointer xl:hidden" onClick={onClose}>
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[20px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img src={logo} alt="logo" className="h-20" />
        </div>
      </div>
      <div className="mb-7 mt-[90px] h-px bg-gray-300 dark:bg-white/30" />
      <div className="mb-auto pt-1 pb-40 min-h-screen relative">
        <div>
          <SidebarLinks routes={routesSidebar} />
        </div>
        <div className="absolute bottom-[160px]">
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8" onClick={() => logout()}>
              <p className={`leading-1 ml-4 flex font-medium text-gray-600`}>Đăng xuất</p>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
