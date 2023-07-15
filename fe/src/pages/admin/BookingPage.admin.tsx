import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  IconButton,
  Input,
  Option,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DialogComponent from "../../components/dialog/DialogComponent";
import { FiEdit3 } from "react-icons/fi";
import {
  bookingOption,
  filterOption,
  getColorStatus,
  getLabelStatus,
  listStatus,
} from "../../data/selection.data";
import { AppointmentType, CodeType, PatientType, defaultPageInfo } from "../../data/types.data";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { provincesSelector } from "../../data/recoil/commonData";
import { useEffect, useState } from "react";
import { bookingAtom, bookingSelector } from "../../data/recoil/admin/booking.admin";
import Pagination, {
  PaginationData,
  PaginationProps,
} from "../../components/common/PaginationComponent";
import ProvinceComponent from "../../components/common/ProvinceComponent";
import AdminFormPatientComponent from "../../components/admin/AdminFormPatientComponent";
import { DeleteRequest, PostRequest } from "../../utils/rest-api";
import SelectComponent from "../../components/common/SelectComponent";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RouteNameAdmin } from "../../routes/routes";

export interface FilterAppointmentType extends PaginationData {
  date?: string;
  orderBy?: string;
  patientName?: string;
  provinceKey?: string;
  statusKey?: string;
  bookingType?: string;
}

const BookingPageAdmin = () => {
  const setFilterBooking = useSetRecoilState(bookingAtom(defaultPageInfo));
  const listBookingLoadable = useRecoilValueLoadable(bookingSelector);
  const [listBookings, setListBookings] = useState<AppointmentType[]>([]);

  const [formData, setFormData] = useState<FilterAppointmentType>();
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [filter, setFilter] = useState<FilterAppointmentType>(defaultPageInfo);
  const refresh = useRecoilRefresher_UNSTABLE(bookingSelector);

  useEffect(() => {
    if (listBookingLoadable?.state == "hasValue") {
      setListBookings(listBookingLoadable?.contents?.data?.data);
      setPaginationData(listBookingLoadable?.contents?.data?.pagination);
    }
  }, [listBookingLoadable?.state]);

  const TABLE_HEAD = [
    "Thời gian",
    "Họ Tên",
    "Email",
    "Số điện thoại",
    "Tỉnh/Thành",
    "Trạng thái",
    "Địa điểm khám",
    "",
  ];

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

  return (
    <div>
      <Typography variant="h3" className="">
        Quản lý đơn đặt lịch của bệnh nhân
      </Typography>
      <Card className="mt-4 p-3">
        <div className="p-2 flex justify-between">
          <form className="flex gap-4" onSubmit={handleFilter}>
            <Input
              type="date"
              label="Chọn ngày"
              className="bg-white"
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  date: e.target.value.split("-").reverse().join("-"),
                })
              }
            ></Input>
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
              type="search"
              label="Tìm kiếm theo tên"
              onChange={(e: any) => setFormData({ ...formData, patientName: e.target.value })}
            ></Input>
            <ProvinceComponent
              handleChange={(value: string) =>
                setFormData({
                  ...formData,
                  provinceKey: value,
                })
              }
            />
            <SelectComponent
              data={listStatus}
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
      <Card className="mt-6">
        <CardBody>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th
                  className={`border-y bg-gray border-blue-gray-100 bg-blue-gray-50/50 p-4 w-[30px]`}
                >
                  <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                    STT
                  </Typography>
                </th>
                {TABLE_HEAD.map((head: string, index: number) => (
                  <th key={head} className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4`}>
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
                        {data?.patientData?.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.patientData?.phoneNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.patientData?.provincePatientData?.value}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        value={getLabelStatus(data?.statusKey)}
                        color={getColorStatus(data?.statusKey)}
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.bookingData?.value}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="float-right">
                        {/* <Tooltip content="Chỉnh sửa">
                          <IconButton variant="text" color="blue-gray">
                            <DialogComponent
                              displayButton={<FiEdit3 className="h-4 w-4" />}
                              formatterContent={
                                <AdminFormPatientComponent
                                  handleSubmitForm={handleUpdateFormPatient}
                                  appointmentData={data}
                                  handleDelete={handleDeleteAppointment}
                                />
                              }
                              title="Chỉnh sửa thông tin đặt lịch"
                            />
                          </IconButton>
                        </Tooltip> */}
                        <Tooltip content="Xem chi tiết">
                          <IconButton variant="text" color="blue-gray">
                            <Link to={`${RouteNameAdmin.DEFAULT}/booking/${data?.id}`}>
                              <BsEye className="h-4 w-4" />
                            </Link>
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

export default BookingPageAdmin;
