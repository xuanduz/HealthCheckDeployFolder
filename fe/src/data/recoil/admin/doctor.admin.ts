import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";
import { PostRequest } from "../../../utils/rest-api";

export const doctorAtom = atomFamily({
  key: "doctorAtom",
  default: (params: any) => ({ ...params }),
});

export const doctorSelector = selector({
  key: "doctorSelector",
  get: async ({ get }) => {
    let query = get(doctorAtom(defaultPageInfo));
    let pageData = await PostRequest(`${process.env.REACT_APP_API_ADMIN}/doctor/filter`, query);
    return pageData;
  },
});
