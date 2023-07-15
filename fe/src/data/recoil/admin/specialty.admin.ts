import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";
import { PostRequest } from "../../../utils/rest-api";

export const specialtyAtom = atomFamily({
  key: "specialtyAtom",
  default: (params: any) => ({ ...params }),
});

export const specialtySelector = selector({
  key: "specialtySelector",
  get: async ({ get }) => {
    let query = get(specialtyAtom(defaultPageInfo));
    let pageData = await PostRequest(`${process.env.REACT_APP_API_ADMIN}/specialty/filter`, query);
    return pageData;
  },
});
