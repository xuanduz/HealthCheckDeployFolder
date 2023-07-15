import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { defaultPageInfo } from "../../types.data";
import { GetRequest, PostRequest } from "../../../utils/rest-api";

export const bookingAtom = atomFamily({
  key: "bookingAtom",
  default: (params: any) => ({ ...params }),
});

export const bookingSelector = selector({
  key: "bookingSelector",
  get: async ({ get }) => {
    let query = get(bookingAtom(defaultPageInfo));
    let pageData = await PostRequest(
      `${process.env.REACT_APP_API_ADMIN}/appointment/filter`,
      query
    );
    return pageData;
  },
});
