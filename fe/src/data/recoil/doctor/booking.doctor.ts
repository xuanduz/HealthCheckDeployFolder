import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";
import { PostRequest } from "../../../utils/rest-api";
import Cookies, { Cookie } from "universal-cookie";

export const bookingDoctorAtom = atomFamily({
  key: "bookingDoctorAtom",
  default: (params: any) => ({ ...params }),
});

export const bookingDoctorSelector = selector({
  key: "bookingDoctorSelector",
  get: async ({ get }) => {
    const cookies = new Cookies();
    let query = get(bookingDoctorAtom(defaultPageInfo));
    query = {
      ...query,
      doctorId: cookies.get("id"),
    };
    let pageData = await PostRequest(
      `${process.env.REACT_APP_API_DOCTOR}/appointment/filter`,
      query
    );
    return pageData;
  },
});
