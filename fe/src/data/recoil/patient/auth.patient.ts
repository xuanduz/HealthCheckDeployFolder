import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const patientAtom = atom({
  key: "patientAtom",
  default: {},
});

export const patientSelector = selector({
  key: "patientSelector",
  get: async ({ get }) => {
    let patient = get(patientAtom);
    return patient;
  },
});
