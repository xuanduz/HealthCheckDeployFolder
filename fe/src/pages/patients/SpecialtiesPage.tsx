import { Card, Typography } from "@material-tailwind/react";
import banner from "../../assets/images/banner-2.png";
import ContainerComponent from "../../components/common/ContainerComponent";
import FilterForm from "../../components/common/FilterForm";
import { useState, useEffect } from "react";
import CardComponent from "../../components/common/CardComponent";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { SpecialtyType, defaultPageInfo } from "../../data/types.data";
import EmptySpecialty from "../../assets/images/empty-specialty.png";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import {
  speciatyPatientAtom,
  speciatyPatientSelector,
} from "../../data/recoil/patient/specialty.patient";

const SpecialtiesPage = () => {
  const setFilterSpecialty = useSetRecoilState(speciatyPatientAtom(defaultPageInfo));
  const listSpecialtyLoadable = useRecoilValueLoadable(speciatyPatientSelector);

  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [listSpecialties, setListSpecialties] = useState<SpecialtyType[]>([]);
  const [filter, setFilter] = useState<any>(defaultPageInfo);

  useEffect(() => {
    if (listSpecialtyLoadable?.state == "hasValue") {
      const data = listSpecialtyLoadable?.contents?.data;
      setListSpecialties(data?.data);
      setPaginationData(data?.pagination);
    }
  }, [listSpecialtyLoadable.state]);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (filter) {
      setFilterSpecialty(filter);
    }
  }, [filter]);

  const handlePaging = (paginationData: PaginationData) => {
    setFilter({
      ...filter,
      ...paginationData,
    });
  };

  const handleFilter = ({ ...params }) => {
    const data = { ...params };
    setFilter({
      ...defaultPageInfo,
      pageNum: 1,
      specialtyName: data?.name,
    });
  };

  return (
    <>
      <div className="specialties-banner relative">
        <img src={banner} alt="" className="w-full" />
        <Typography
          variant="h1"
          className="text-blue-500 absolute bottom-2/4 left-0 right-0 text-center"
        >
          Chuyên khoa
        </Typography>
      </div>
      <ContainerComponent>
        <div className="flex gap-10">
          <div className="specialties-filter basis-1/4">
            <Typography variant="h3" className="mt-4">
              Bộ lọc
            </Typography>
            <Card className="p-4 shadow-xl mt-2">
              <div>
                <FilterForm haveName={true} handleSubmitFilterForm={handleFilter} />
              </div>
            </Card>
          </div>
          <div className="specialties-content basis-3/4">
            <Typography variant="h3" className="mt-4">
              Các chuyên khoa
            </Typography>
            <div>
              <ul className="grid grid-cols-3 gap-5 mt-2">
                {listSpecialties?.map((item: SpecialtyType, index: number) => (
                  <li className="basis-1/3">
                    <CardComponent
                      key={item?.id}
                      url={`/specialties/${item?.id}`}
                      title={item?.name}
                      describe={item?.describe}
                      image={item?.image || EmptySpecialty}
                    />
                  </li>
                ))}
              </ul>
              {!listSpecialties?.length && (
                <div className="text-center w-full text-red-500">
                  <Typography variant="h5">Không có dữ liệu</Typography>
                </div>
              )}
            </div>
            <div className="flex justify-center my-14">
              <Pagination paginationData={paginationData} handlePaging={handlePaging} />
            </div>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
};

export default SpecialtiesPage;
