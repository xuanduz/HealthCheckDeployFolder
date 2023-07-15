import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";

export const clinicAtom = atomFamily({
  key: "clinicAtom",
  default: (params: any) => ({ ...params }),
});

export const clinicSelector = selector({
  key: "clinicPatientSelector",
  get: async ({ get }) => {
    let query = get(clinicAtom(defaultPageInfo));
    let pageData = await axios.post(`${process.env.REACT_APP_API}/clinic/filter`, query);
    return pageData;
  },
});
