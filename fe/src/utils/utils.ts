import axios from "axios";
import Cookies from "universal-cookie";
import { CodeType, ScheduleType } from "../data/types.data";
import { toast } from "react-toastify";

const cookies = new Cookies();

export const VNDMoney = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const getLabelProvice = (proKey: string, listPro: Array<CodeType>) => {
  return listPro.find((pro: CodeType) => pro.key == proKey);
};

export const handleResetAccountCookies = () => {
  cookies.set("id", "");
  cookies.set("role", "");
  cookies.set("email", "");
  cookies.set("accessToken", "");
  cookies.set("refreshToken", "");
};

export const getLoginRoute = () => {
  let loginUrl = "";
  switch (cookies.get("role")) {
    case "ADMIN":
      loginUrl = process.env.REACT_APP_ADMIN_URL + "/login";
      break;
    case "DOCTOR":
      loginUrl = process.env.REACT_APP_DOCTOR_URL + "/login";
      break;
    case "PATIENT":
      loginUrl = "/login";
      break;
    default:
      break;
  }
  return loginUrl;
};

export const handleLogout = async () => {
  let apiStr: string | undefined = "";
  let response: boolean = false;
  switch (cookies.get("role")) {
    case "SUPER_ADMIN":
      apiStr = process.env.REACT_APP_API_ADMIN;
      break;
    case "ADMIN":
      apiStr = process.env.REACT_APP_API_ADMIN;
      break;
    case "DOCTOR":
      apiStr = process.env.REACT_APP_API_DOCTOR;
      break;
    case "PATIENT":
      apiStr = process.env.REACT_APP_API;
      break;
    default:
      break;
  }
  if (apiStr) {
    axios
      .delete(`${apiStr}/logout`, {
        headers: {
          Authorization: `Bearer ${cookies.get("accessToken")}`,
        },
        data: {
          email: cookies.get("email"),
        },
      })
      .then((res: any) => {
        handleResetAccountCookies();
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }
  return response;
};

export const groupDate = (schedules: ScheduleType[]) => {
  let groups = [];
  if (schedules?.length) {
    groups = schedules?.reduce(
      (groups: any, item: ScheduleType) => ({
        ...groups,
        [item?.date as string]: [...(groups[item?.date as string] || []), item],
      }),
      {}
    );
  }
  return groups;
};

export function isEmpty(obj: any) {
  return Object?.keys(obj).length === 0;
}

export function formatDate(date: any) {
  let yyyy = date?.getFullYear();
  let mm = date?.getMonth() + 1; // Months start at 0!
  let dd = date?.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  let formattedDate = dd + "-" + mm + "-" + yyyy;
  return formattedDate;
}
