import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";

export const speciatyPatientAtom = atomFamily({
  key: "speciatyPatientAtom",
  default: (params: any) => ({ ...params }),
});

export const speciatyPatientSelector = selector({
  key: "speciatyPatientSelector",
  get: async ({ get }) => {
    let query = get(speciatyPatientAtom(defaultPageInfo));
    console.log(">> query", query, defaultPageInfo);
    let pageData = await axios.post(`${process.env.REACT_APP_API}/specialty/filter`, query);
    return pageData;
  },
});
