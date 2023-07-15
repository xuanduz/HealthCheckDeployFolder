import axios from "axios";
import { atom, selector } from "recoil";
import { defaultPageInfo } from "../../types.data";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const adminRefreshTokenState = atom<string>({
  key: "adminRefreshTokenState",
  default: cookies.get("refreshToken") || "",
});

export const adminRefreshTokenSelector = selector({
  key: "adminRefreshTokenSelector",
  get: ({ get }) => get(adminRefreshTokenState),
  set: ({ set }, newValue) => {
    cookies.set("refreshToken", newValue);
    set(adminRefreshTokenState, newValue + ""); //TODO: adminAccessTokenState
  },
});

const adminAccessTokenState = atom<string>({
  key: "adminAccessTokenState",
  default: cookies.get("accessToken") || "",
});

export const adminAccessTokenSelector = selector({
  key: "adminAccessTokenSelector",
  get: ({ get }) => get(adminAccessTokenState),
  set: ({ set }, newValue) => {
    cookies.set("accessToken", newValue);
    set(adminAccessTokenState, newValue + "");
  },
});
