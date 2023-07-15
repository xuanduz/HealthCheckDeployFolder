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
import DialogComponent from "../../components/dialog/DialogComponent";
import { SpecialtyType, defaultPageInfo } from "../../data/types.data";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { specialtyAtom } from "../../data/recoil/admin/specialty.admin";
import { useState, useEffect } from "react";
import { specialtySelector } from "../../data/recoil/admin/specialty.admin";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import Empty from "../../assets/images/empty.jpg";
import { DeleteRequest, PostRequest, PostRequestWithFile } from "../../utils/rest-api";
import SpecialtyFormComponent from "../../components/common/SpecialtyFormComponent";
import { FiEdit3 } from "react-icons/fi";

export interface FilterSpecialtyType extends PaginationData {
  specialtyName?: string;
}

const SpecialtyPageAdmin = () => {
  const TABLE_HEAD = ["Tên", "Ảnh", "Mô tả", ""];
  const setFilterSpecialty = useSetRecoilState(specialtyAtom(defaultPageInfo));
  const listSpecialtyLoadable = useRecoilValueLoadable(specialtySelector);
  const [listSpecialtys, setListSpecialtys] = useState<SpecialtyType[]>([]);

  const [formData, setFormData] = useState<FilterSpecialtyType>();
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [filter, setFilter] = useState<FilterSpecialtyType>(defaultPageInfo);
  const refresh = useRecoilRefresher_UNSTABLE(specialtySelector);

  useEffect(() => {
    if (listSpecialtyLoadable?.state == "hasValue") {
      setListSpecialtys(listSpecialtyLoadable?.contents?.data?.data);
      setPaginationData(listSpecialtyLoadable?.contents?.data?.pagination);
    }
  }, [listSpecialtyLoadable?.state]);

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
      setFilterSpecialty(filter);
    }
  }, [filter]);

  const handleSubmitForm = async (specialtyData: SpecialtyType) => {
    const formData = new FormData();
    Object.entries(specialtyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await PostRequestWithFile(`${process.env.REACT_APP_API_ADMIN}/specialty/edit`, formData, true);
    refresh();
  };

  const handleDeleteItem = async (specialtyId: number | string) => {
    await DeleteRequest(`${process.env.REACT_APP_API_ADMIN}/specialty/${specialtyId}`, true);
    refresh();
  };

  const handleAddSpecialty = async (specialtyData: SpecialtyType) => {
    const formData = new FormData();
    Object.entries(specialtyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await PostRequestWithFile(
      `${process.env.REACT_APP_API_ADMIN}/specialty/add-new`,
      formData,
      true
    );
    refresh();
  };

  return (
    <div>
      <Typography variant="h3" className="">
        Quản lý chuyên khoa
      </Typography>
      <Card className="mt-4 p-3">
        <div className="p-2 flex justify-between">
          <form className="flex gap-4" onSubmit={handleFilter}>
            <Input
              type="search"
              label="Tìm kiếm theo tên"
              onChange={(e: any) => setFormData({ ...formData, specialtyName: e.target.value })}
            ></Input>
            <div>
              <Button type="submit">Lọc</Button>
            </div>
          </form>
          <DialogComponent
            displayButton={
              <Button className="flex gap-2">
                <AiOutlinePlus color="white" className="mt-[2px]" />
                Thêm mới chuyên khoa
              </Button>
            }
            formatterContent={<SpecialtyFormComponent handleSubmitForm={handleAddSpecialty} />}
            size="md"
            title="Thêm mới chuyên khoa"
          />
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
              {listSpecialtys?.map((data: SpecialtyType, index: number) => {
                const isLast = index === listSpecialtys?.length - 1;
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
                        {data?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <img src={data?.image || Empty} alt="image" className="max-w-[90px]" />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.describe}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="float-right">
                        <Tooltip content="Chỉnh sửa">
                          <IconButton variant="text" color="blue-gray">
                            <DialogComponent
                              displayButton={<FiEdit3 className="h-4 w-4" />}
                              title="Chỉnh sửa chuyên khoa"
                              size="md"
                              formatterContent={
                                <SpecialtyFormComponent
                                  data={data}
                                  handleSubmitForm={handleSubmitForm}
                                  handleDelete={handleDeleteItem}
                                />
                              }
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

export default SpecialtyPageAdmin;
