import { CodeType } from "./types.data";

export const getLabelStatus = (status: string | undefined) => {
  switch (status) {
    case "S1":
      return "Lịch hẹn mới";
    case "S2":
      return "Đã xác nhận";
    case "S3":
      return "Đã khám xong";
    case "S4":
      return "Đã huỷ";
    default:
      return "Chưa xác định";
  }
};

export const getColorStatus = (status: string | undefined) => {
  switch (status) {
    case "S1":
      return "amber";
    case "S2":
      return "blue";
    case "S3":
      return "green";
    case "S4":
      return "red";
    default:
      return "purple";
  }
};

export const listStatus: CodeType[] = [
  {
    value: "Lịch hẹn mới",
    key: "S1",
  },
  {
    value: "Đã xác nhận",
    key: "S2",
  },
  {
    value: "Đã khám xong",
    key: "S3",
  },
  {
    value: "Đã huỷ",
    key: "S4",
  },
];

export const filterOption: CodeType[] = [
  {
    id: 1,
    key: "DESC",
    type: "STATUS",
    value: "Mới nhất",
  },
  {
    id: 2,
    key: "ASC",
    type: "STATUS",
    value: "Cũ nhất",
  },
];

export const bookingOption: CodeType[] = [
  {
    id: 1,
    key: "B2",
    type: "BOOKING",
    value: "Khám tại nhà",
  },
  {
    id: 2,
    key: "B1",
    type: "BOOKING",
    value: "Khám tại phòng khám",
  },
];
