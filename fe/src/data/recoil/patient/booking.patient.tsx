import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const bookingPatientAtom = atom({
  key: "bookingPatientAtom",
  default: {},
});

export const bookingPatientSelector = selector({
  key: "bookingPatientSelector",
  get: async ({ get }) => {
    let infoBooking = get(bookingPatientAtom);
    return infoBooking;
  },
});
