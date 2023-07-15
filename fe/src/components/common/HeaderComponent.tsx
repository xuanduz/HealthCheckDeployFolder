import logo from "../../assets/images/logo.png";
import { HeaderContentData, HeaderContentType } from "../../data/header-content.data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteNamePatient } from "../../routes/routes";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import Cookies from "universal-cookie";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { handleLogout } from "../../utils/utils";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  adminAccessTokenSelector,
  adminRefreshTokenSelector,
} from "../../data/recoil/admin/auth.admin";

export interface HeaderProps {
  isLogin?: boolean;
}

const HeaderComponent = (props: HeaderProps) => {
  const [refreshToken, setRefreshToken] = useRecoilState(adminRefreshTokenSelector);
  const [accessToken, setAccessToken] = useRecoilState(adminAccessTokenSelector);
  let location = useLocation();
  const navigate = useNavigate();

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const handleLogoutPatient = async () => {
    await handleLogout();
    setAccessToken("");
    setRefreshToken("");
    navigate(RouteNamePatient.LOGIN);
  };

  return (
    <div className="header w-full h-20 shadow-md">
      <div className="header-container flex w-10/12 content-center h-full justify-between items-center">
        <div className="header-logo flex">
          <Link to={RouteNamePatient.HOME}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header-selection">
          <ul className="flex gap-16">
            {HeaderContentData.map((item: HeaderContentType, index: number) => (
              <Link to={item.slug}>
                <li
                  key={index}
                  className={`font-semibold cursor-pointer ${
                    activeRoute(item.slug) ? " active-section-header" : ""
                  }`}
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {accessToken ? (
          <div className="flex items-center gap-1 cursor-pointer">
            <Menu>
              <MenuHandler>
                <Button>
                  <CgProfile size={18} />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <Link to={RouteNamePatient.INFORMATION}>Thông tin cá nhân</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={RouteNamePatient.HISTORY}>Lịch sử khám bệnh</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={RouteNamePatient.CHANGE_PASSWORD}>Đổi mật khẩu</Link>
                </MenuItem>
                <MenuItem className="flex gap-2" onClick={handleLogoutPatient}>
                  <FiLogOut />
                  {"Đăng xuất"}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <Link to={RouteNamePatient.LOGIN}>
            <div className="flex items-center gap-1 cursor-pointer">
              <FiLogIn />
              <div className={`font-semibold cursor-pointer `}>{"Đăng nhập"}</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
