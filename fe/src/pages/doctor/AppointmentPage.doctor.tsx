import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { CodeType, PatientType, defaultPageInfo } from "../../data/types.data";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { AppointmentType } from "../../data/types.data";
import {
  bookingOption,
  filterOption,
  getColorStatus,
  getLabelStatus,
} from "../../data/selection.data";
import SelectComponent from "../../components/common/SelectComponent";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import { useState, useEffect } from "react";
import { bookingDoctorAtom, bookingDoctorSelector } from "../../data/recoil/doctor/booking.doctor";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { FilterAppointmentType } from "../admin/BookingPage.admin";
import DialogComponent from "../../components/dialog/DialogComponent";
import { FiEdit3 } from "react-icons/fi";
import AdminFormPatientComponent from "../../components/admin/AdminFormPatientComponent";
import { PostRequest, PostRequestWithFile } from "../../utils/rest-api";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentPageDoctor = () => {
  const today = new Date().toLocaleDateString("pt-br").split("/").reverse().join("-"); //dd-mm-yyyy
  const setFilterBooking = useSetRecoilState(bookingDoctorAtom(defaultPageInfo));
  const listBookingLoadable = useRecoilValueLoadable(bookingDoctorSelector);
  const [listBookings, setListBookings] = useState<AppointmentType[]>([]);

  const [formData, setFormData] = useState<FilterAppointmentType>();
  const [filter, setFilter] = useState<FilterAppointmentType>(defaultPageInfo);
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const refresh = useRecoilRefresher_UNSTABLE(bookingDoctorSelector);

  const TABLE_HEAD = [
    "STT",
    "Thời gian",
    "Họ Tên",
    "Giới tính",
    "Hình thức khám",
    "Trạng thái",
    "",
  ];

  const listStatusDoctor: CodeType[] = [
    {
      value: "Đã xác nhận",
      key: "S2",
    },
    {
      value: "Đã khám xong",
      key: "S3",
    },
  ];

  useEffect(() => {
    if (listBookingLoadable?.state == "hasValue") {
      setListBookings(listBookingLoadable?.contents?.data?.data);
      setPaginationData(listBookingLoadable?.contents?.data?.pagination);
    }
  }, [listBookingLoadable?.state]);

  const handleFilter = async (e: any) => {
    e.preventDefault();
    const dataFilter = {
      ...filter,
      ...formData,
      pageNum: 1,
    };
    setFilter(dataFilter);
  };

  const handlePaging = (paginationData: PaginationData) => {
    setFilter({
      ...filter,
      ...paginationData,
    });
  };

  useEffect(() => {
    if (filter) {
      setFilterBooking(filter);
    }
  }, [filter]);

  const handleUpdateFormPatient = async (data: AppointmentType) => {
    const formData = new FormData();
    formData.append("id", data.id as any);
    formData.append("filename", data.filename);
    formData.append("statusKey", data.statusKey as any);
    await PostRequestWithFile(
      `${process.env.REACT_APP_API_DOCTOR}/appointment/edit`,
      formData,
      true
    );
    refresh();
  };

  return (
    <div>
      <Typography variant="h3" className="">
        Quản lý đơn đặt lịch
      </Typography>
      <Card className="mt-4 p-3">
        <div className="p-2 flex justify-between">
          <form className="flex gap-4" onSubmit={handleFilter}>
            <Input
              size="md"
              label="Chọn ngày"
              type="date"
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  date: e.target.value.split("-").reverse().join("-"),
                })
              }
              // min={today}
              // defaultValue={today}
            />
            <SelectComponent
              data={filterOption}
              onChange={(value: any) => {
                setFormData({
                  ...formData,
                  orderBy: value,
                });
              }}
              labelFirstElement="Lọc theo thời gian"
            />
            <Input
              size="md"
              label="Họ tên bệnh nhân"
              type="text"
              onChange={(e: any) => setFormData({ ...formData, patientName: e.target.value })}
            />
            <SelectComponent
              data={listStatusDoctor}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  statusKey: value,
                })
              }
              labelFirstElement="Chọn trạng thái"
            />
            <SelectComponent
              data={bookingOption}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  bookingType: value,
                })
              }
              customClassName="w-72"
              labelFirstElement="Hình thức khám bệnh"
            />
            <div>
              <Button type="submit">Lọc</Button>
            </div>
          </form>
        </div>
      </Card>
      <Card className="h-full w-full mt-5">
        <CardBody className=" px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head: string, index: number) => (
                  <th
                    key={head}
                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${
                      index == 0 ? "w-[30px]" : ""
                    }`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listBookings?.map((data: AppointmentType, index: number) => {
                const isLast = index === listBookings?.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={data?.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {index + 1}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.timeData?.value + " / " + data.date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.patientData?.fullName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.patientData?.gender == false ? "Nữ" : "Nam"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.bookingData?.value}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.statusData?.value}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Chip
                        value={getLabelStatus(data?.statusKey)}
                        color={getColorStatus(data?.statusKey)}
                      />
                    </td>
                    <td className={classes}>
                      <div className="float-right">
                        <Tooltip content="Xem thêm">
                          <IconButton variant="text" color="blue-gray">
                            <DialogComponent
                              displayButton={<FiEdit3 className="h-4 w-4" />}
                              formatterContent={
                                <AdminFormPatientComponent
                                  handleSubmitForm={handleUpdateFormPatient}
                                  appointmentData={data}
                                  isDoctor={true}
                                />
                              }
                              title="Chỉnh sửa thông tin bệnh nhân"
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter>
          <div className="flex justify-center">
            <Pagination paginationData={paginationData} handlePaging={handlePaging} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppointmentPageDoctor;
