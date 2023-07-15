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
import { GrFormFilter } from "react-icons/gr";
import { MdOutlineAttachFile } from "react-icons/md";
import DialogComponent from "../../components/dialog/DialogComponent";
import ClinicFormComponent from "../../components/clinic/ClinicFormComponent";
import ClinicPostComponent from "../../components/clinic/ClinicPostComponent";
import { ClinicType, defaultPageInfo } from "../../data/types.data";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { clinicAtom } from "../../data/recoil/admin/clinic.admin";
import { useState, useEffect } from "react";
import { clinicSelector } from "../../data/recoil/admin/clinic.admin";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import ProvinceComponent from "../../components/common/ProvinceComponent";
import EmptyClinic from "../../assets/images/empty-clinic.png";
import { DeleteRequest, PostRequest } from "../../utils/rest-api";
import { Link } from "react-router-dom";
import { RouteNameAdmin } from "../../routes/routes";

export interface FilterClinicType extends PaginationData {
  clinicName?: string;
  provinceKey?: string;
}

const ClinicPageAdmin = () => {
  const TABLE_HEAD = ["Tên", "Tỉnh/Thành", "Địa chỉ chi tiết", "Ảnh", ""];
  const setFilterClinic = useSetRecoilState(clinicAtom(defaultPageInfo));
  const listClinicLoadable = useRecoilValueLoadable(clinicSelector);
  const [listClinics, setListClinics] = useState<ClinicType[]>([]);

  const [formData, setFormData] = useState<FilterClinicType>();
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [filter, setFilter] = useState<FilterClinicType>(defaultPageInfo);
  const refresh = useRecoilRefresher_UNSTABLE(clinicSelector);

  useEffect(() => {
    if (listClinicLoadable?.state == "hasValue") {
      setListClinics(listClinicLoadable?.contents?.data?.data);
      setPaginationData(listClinicLoadable?.contents?.data?.pagination);
    }
  }, [listClinicLoadable?.state]);

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
      setFilterClinic(filter);
    }
  }, [filter]);

  const handleSubmitForm = async (clinicData: ClinicType) => {
    await PostRequest(`${process.env.REACT_APP_API_ADMIN}/clinic/edit`, clinicData, true);
    refresh();
  };
  const handleDeleteClinic = async (clinicId: string) => {
    await DeleteRequest(`${process.env.REACT_APP_API_ADMIN}/clinic/${clinicId}`, true);
    refresh();
  };

  const handleAddClinic = async (clinicData: ClinicType) => {
    await PostRequest(`${process.env.REACT_APP_API_ADMIN}/clinic/add-new`, clinicData, true);
    refresh();
  };

  return (
    <div>
      <Typography variant="h3" className="">
        Quản lý cơ sở y tế
      </Typography>
      <Card className="mt-4 p-3">
        <div className="p-2 flex justify-between">
          <form className="flex gap-4" onSubmit={handleFilter}>
            <Input
              type="search"
              label="Tìm kiếm theo tên"
              onChange={(e: any) => setFormData({ ...formData, clinicName: e.target.value })}
            ></Input>
            <ProvinceComponent
              handleChange={(value: string) =>
                setFormData({
                  ...formData,
                  provinceKey: value,
                })
              }
            />
            <div>
              <Button type="submit">Lọc</Button>
            </div>
          </form>
          <Link to={`${RouteNameAdmin.CLINICS}/new`}>
            <Button className="flex gap-2">
              <AiOutlinePlus color="white" className="mt-[2px]" />
              Thêm mới cơ sở y tế
            </Button>
          </Link>
          {/* <DialogComponent
            displayButton={
              <Button className="flex gap-2">
                <AiOutlinePlus color="white" className="mt-[2px]" />
                Thêm mới cơ sở y tế
              </Button>
            }
            formatterContent={<ClinicFormComponent handleSubmitForm={handleAddClinic} />}
            size="lg"
            title="Thêm mới cơ sở y tế"
          /> */}
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
              {listClinics?.map((data: ClinicType, index: number) => {
                const isLast = index === listClinics?.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={data?.id + " " + index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {index + 1}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.provinceData?.value}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <img src={data?.image || EmptyClinic} alt="image" className="max-w-[100px]" />
                    </td>
                    <td className={classes}>
                      <div className="float-right">
                        <Tooltip content="Xem chi tiết">
                          <IconButton variant="text" color="blue-gray">
                            <Link to={`${RouteNameAdmin.CLINICS}/${data?.id}`}>
                              <BsEye className="h-4 w-4" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip content="Chỉnh sửa">
                          <IconButton variant="text" color="blue-gray">
                            <DialogComponent
                              displayButton={<FiEdit3 className="h-4 w-4" />}
                              title="Chỉnh sửa cơ sở y tế"
                              size="lg"
                              formatterContent={
                                <ClinicFormComponent
                                  data={data}
                                  handleSubmitForm={handleSubmitForm}
                                  handleDelete={handleDeleteClinic}
                                />
                              }
                            />
                          </IconButton>
                        </Tooltip> */}
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

export default ClinicPageAdmin;
