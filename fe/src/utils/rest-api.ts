import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const PostRequest = async (api: string, query: any, notifi?: boolean) => {
  let response: any;
  await axios
    .post(api, query, {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    })
    .then((res: any) => {
      response = res;
      if (notifi) {
        res.data?.success
          ? toast.success(response.data?.message)
          : toast.warn(response.data?.message);
      }
    })
    .catch((err: any) => {
      console.log("err", err);
      if (err.code == "ERR_NETWORK") {
        toast.warn("Lỗi kết nối !");
      }
      if (err.response?.status == 401) {
        toast.warn("Lỗi quyền truy cập !");
      }
      if (err.response?.status == 403) {
        toast.warn("Có lỗi xảy ra, vui lòng thử lại !");
      }
    });
  return response;
};

export const PutRequest = async (api: string, query: any, notifi?: boolean) => {
  let response: any;
  await axios
    .put(api, query, {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    })
    .then((res: any) => {
      response = res;
      if (notifi) {
        res.data?.success
          ? toast.success(response.data?.message)
          : toast.warn(response.data?.message);
      }
    })
    .catch((err: any) => {
      console.log("err", err);
      if (err.code == "ERR_NETWORK") {
        toast.warn("Lỗi kết nối !");
      }
      if (err.response?.status == 401) {
        toast.warn("Lỗi quyền truy cập !");
      }
    });
  return response;
};

export const PostRequestWithFile = async (api: string, query: any, notifi?: boolean) => {
  let response: any;
  await axios
    .post(api, query, {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
        "content-type": "multipart/form-data",
      },
    })
    .then((res: any) => {
      response = res;
      if (notifi) {
        res.data?.success
          ? toast.success(response.data?.message)
          : toast.warn(response.data?.message);
      }
    })
    .catch((err: any) => {
      console.log("err", err);
      if (err.code == "ERR_NETWORK") {
        toast.warn("Lỗi kết nối !");
      }
      if (err.response?.status == 401) {
        toast.warn("Lỗi quyền truy cập !");
      }
      if (err.response?.status == 403) {
        toast.warn("Có lỗi xảy ra, vui lòng thử lại !");
      }
    });
  return response;
};

export const PutRequestWithFile = async (api: string, query: any, notifi?: boolean) => {
  let response: any;
  await axios
    .put(api, query, {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    })
    .then((res: any) => {
      response = res;
      if (notifi) {
        res.data?.success
          ? toast.success(response.data?.message)
          : toast.warn(response.data?.message);
      }
    })
    .catch((err: any) => {
      console.log("err", err);
      if (err.code == "ERR_NETWORK") {
        toast.warn("Lỗi kết nối !");
      }
      if (err.response?.status == 401) {
        toast.warn("Lỗi quyền truy cập !");
      }
    });
  return response;
};

export const DeleteRequest = async (api: string, notifi?: boolean) => {
  let response: any;
  await axios
    .delete(api, {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    })
    .then((res: any) => {
      response = res;
      if (notifi) {
        res.data?.success
          ? toast.success(response.data?.message)
          : toast.warn(response.data?.message);
      }
    })
    .catch((err: any) => {
      console.log("err", err);
      if (err.code == "ERR_NETWORK") {
        toast.warn("Lỗi kết nối !");
      }
      if (err.response?.status == 401) {
        toast.warn("Lỗi quyền truy cập !");
      }
      if (err.response?.status == 403) {
        toast.warn("Có lỗi xảy ra, vui lòng thử lại !");
      }
    });
  return response;
};

export const GetRequest = async (api: string, notifi?: boolean) => {
  let response: any;
  await axios
    .get(api, {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    })
    .then((res: any) => {
      response = res;
      if (notifi) {
        res.data?.success
          ? toast.success(response.data?.message)
          : toast.warn(response.data?.message);
      }
    })
    .catch((err: any) => {
      if (err.code == "ERR_NETWORK") {
        toast.warn("Lỗi kết nối !");
      }
      if (err.response?.status == 401) {
        toast.warn("Lỗi quyền truy cập !");
      }
      if (err.response?.status == 403) {
        toast.warn("Có lỗi xảy ra, vui lòng thử lại !");
      }
    });
  return response;
};
