import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";
import { PostRequest } from "../../../utils/rest-api";

export const clinicAtom = atomFamily({
  key: "clinicAtom",
  default: (params: any) => ({ ...params }),
});

export const clinicSelector = selector({
  key: "clinicSelector",
  get: async ({ get }) => {
    let query = get(clinicAtom(defaultPageInfo));
    let pageData = await PostRequest(`${process.env.REACT_APP_API_ADMIN}/clinic/filter`, query);
    return pageData;
  },
});
