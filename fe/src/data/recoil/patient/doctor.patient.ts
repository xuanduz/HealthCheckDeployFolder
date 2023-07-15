import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";

export const doctorPatientAtom = atomFamily({
  key: "doctorPatientAtom",
  default: (params: any) => ({ ...params }),
});

export const doctorPatientSelector = selector({
  key: "doctorPatientSelector",
  get: async ({ get }) => {
    let query = get(doctorPatientAtom(defaultPageInfo));
    let pageData = await axios.post(`${process.env.REACT_APP_API}/doctor/filter`, query);
    return pageData;
  },
});
