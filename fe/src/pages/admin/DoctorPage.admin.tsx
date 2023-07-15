import {
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Input,
  Option,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsEye, BsFilePost } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import DialogComponent from "../../components/dialog/DialogComponent";
import { DoctorType, SpecialtyType, defaultPageInfo } from "../../data/types.data";
import SpecialtyComponent from "../../components/common/SpecialtyComponent";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import { doctorAtom, doctorSelector } from "../../data/recoil/admin/doctor.admin";
import ClinicComponent from "../../components/clinic/ClinicSelectComponent";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import DoctorFormComponent from "../../components/admin/DoctorFormComponent";
import { DeleteRequest, PostRequest } from "../../utils/rest-api";
import { Link } from "react-router-dom";
import { RouteNameAdmin } from "../../routes/routes";

export interface FilterDoctorType extends PaginationData {
  clinicId?: string;
  specialtyId?: string;
  doctorName?: string;
}

const DoctorPageAdmin = () => {
  const TABLE_HEAD = ["Ảnh", "Tên", "Email", "Số điện thoại", "Chuyên khoa", "Phòng khám", ""];
  const setFilterDoctor = useSetRecoilState(doctorAtom(defaultPageInfo));
  const listDoctorLoadable = useRecoilValueLoadable(doctorSelector);
  const [listDoctors, setListDoctors] = useState<DoctorType[]>([]);

  const [formData, setFormData] = useState<FilterDoctorType>();
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [filter, setFilter] = useState<FilterDoctorType>(defaultPageInfo);
  const refresh = useRecoilRefresher_UNSTABLE(doctorSelector);

  useEffect(() => {
    if (listDoctorLoadable?.state == "hasValue") {
      setListDoctors(listDoctorLoadable?.contents?.data?.data);
      setPaginationData(listDoctorLoadable?.contents?.data?.pagination);
    }
  }, [listDoctorLoadable?.state]);

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
      setFilterDoctor(filter);
    }
  }, [filter]);

  // const handleUpdateFormDoctor = async (data: any) => {
  //   console.log("handleUpdateFormDoctor", data);
  //   const res = await PostRequest(`${process.env.REACT_APP_API_ADMIN}/doctor/edit`, data, true);
  //   if (res?.data?.success) {
  //     refresh();
  //   }
  // };

  // const handleDeleteDoctor = async (id: any) => {
  //   await DeleteRequest(`${process.env.REACT_APP_API_ADMIN}/doctor/${id}`, true);
  //   refresh();
  // };

  // const handleAddDoctor = async (data: any) => {
  //   console.log("handleAddDoctor", data);
  //   const res = await PostRequest(`${process.env.REACT_APP_API_ADMIN}/doctor/add-new`, data, true);
  //   if (res?.data?.success) {
  //     refresh();
  //   }
  // };

  return (
    <div>
      <Typography variant="h3" className="">
        Quản lý bác sĩ
      </Typography>
      <Card className="mt-4 p-3">
        <div className="p-2 flex justify-between ">
          <form className="flex gap-4" onSubmit={handleFilter}>
            <div className="max-w-[320px]">
              <Input
                type="search"
                label="Tìm kiếm theo tên"
                onChange={(e: any) => setFormData({ ...formData, doctorName: e.target.value })}
              ></Input>
            </div>
            <ClinicComponent
              handleChange={(id: any) =>
                setFormData({
                  ...formData,
                  clinicId: id,
                })
              }
              customClassName={"w-[320px]"}
            />
            <SpecialtyComponent
              handleChange={(id: any) =>
                setFormData({
                  ...formData,
                  specialtyId: id,
                })
              }
              customClassName={"w-[320px]"}
            />
            <div>
              <Button type="submit">Lọc</Button>
            </div>
          </form>
          <Link to={`${RouteNameAdmin.DOCTORS}/new`}>
            <Button className="flex gap-2">
              <AiOutlinePlus color="white" className="mt-[2px]" />
              Thêm mới bác sĩ
            </Button>
          </Link>
        </div>
      </Card>
      <Card className="mt-6">
        <CardBody>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 w-[30px]`}>
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
              {listDoctors?.map((data: DoctorType, index: number) => {
                const isLast = index === listDoctors?.length - 1;
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
                      <img src={data?.image || EmptyDoctor} alt="image" className="max-w-[90px]" />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.fullName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.phoneNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        {data?.specialtyData?.map((specialty: SpecialtyType) => (
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {specialty?.name}
                          </Typography>
                        ))}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.clinicData?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="float-right">
                        <Tooltip content="Xem chi tiết">
                          <IconButton variant="text" color="blue-gray">
                            <Link to={`${RouteNameAdmin.DOCTORS}/${data?.id}`}>
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

export default DoctorPageAdmin;
