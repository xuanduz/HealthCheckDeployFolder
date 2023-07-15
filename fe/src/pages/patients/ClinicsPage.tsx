import { Card, Typography } from "@material-tailwind/react";
import banner from "../../assets/images/banner-2.png";
import ContainerComponent from "../../components/common/ContainerComponent";
import FilterForm, { InputFilter } from "../../components/common/FilterForm";
import { useState, useEffect } from "react";
import CardComponent from "../../components/common/CardComponent";
import { useRecoilStateLoadable, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { ClinicType, CodeType, defaultPageInfo } from "../../data/types.data";
import { clinicAtom, clinicSelector } from "../../data/recoil/patient/clinic.patient";
import { provincesSelector } from "../../data/recoil/commonData";
import EmptyClinic from "../../assets/images/empty-clinic.png";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import { FilterClinicType } from "../admin/ClinicPage.admin";

const ClinicsPage = () => {
  // const [listClinics, setFilterClinic] = useRecoilStateLoadable(clinicSelector);
  const setFilterClinic = useSetRecoilState(clinicAtom(defaultPageInfo));
  const listClinicLoadable = useRecoilValueLoadable(clinicSelector);
  const provinces = useRecoilValueLoadable(provincesSelector);

  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [listProvinces, setListProvinces] = useState<CodeType[]>([]);
  const [listClinics, setListClinics] = useState<ClinicType[]>([]);
  const [filter, setFilter] = useState<FilterClinicType>(defaultPageInfo);

  useEffect(() => {
    if (provinces?.state == "hasValue") {
      setListProvinces([
        { id: 0, key: "", type: "", value: "Tất cả" },
        ...provinces?.contents?.data?.data,
      ]);
    }
  }, [provinces.state]);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (listClinicLoadable?.state == "hasValue") {
      setListClinics(listClinicLoadable?.contents?.data?.data);
      setPaginationData(listClinicLoadable?.contents?.data?.pagination);
    }
  }, [listClinicLoadable]);

  useEffect(() => {
    if (filter) {
      setFilterClinic(filter);
    }
  }, [filter]);

  const handleFilter = ({ ...params }) => {
    const data = { ...params };
    setFilter({
      ...defaultPageInfo,
      pageNum: 1,
      clinicName: data?.name,
      provinceKey: data?.provinceKey,
    });
  };

  const handlePaging = (paginationData: PaginationData) => {
    setFilter({
      ...filter,
      ...paginationData,
    });
  };

  return (
    <>
      <div className="clinics-banner relative">
        <img src={banner} alt="" className="w-full" />
        <Typography
          variant="h1"
          className="text-blue-500 absolute bottom-2/4 left-0 right-0 text-center"
        >
          Cơ sở y tế
        </Typography>
      </div>
      <ContainerComponent>
        <div className="flex gap-10">
          <div className="clinics-filter basis-1/4">
            <Typography variant="h3" className="mt-4">
              Bộ lọc
            </Typography>
            <Card className="p-4 shadow-xl mt-2">
              <div>
                <FilterForm
                  haveName={true}
                  haveProvince={true}
                  listProvinces={listProvinces}
                  handleSubmitFilterForm={handleFilter}
                />
              </div>
            </Card>
          </div>
          <div className="clinics-content basis-3/4">
            <Typography variant="h3" className="mt-4">
              Danh sách cơ ở y tế
            </Typography>
            <div>
              <ul className="grid grid-cols-3 gap-5 mt-2">
                {listClinics?.map((clinic: ClinicType, index: number) => (
                  <li className="basis-1/3">
                    <CardComponent
                      key={index}
                      id={index}
                      url={`/clinics/${clinic?.id}`}
                      title={clinic?.name}
                      address={clinic?.provinceData?.value}
                      describe={clinic?.address}
                      image={clinic?.image || EmptyClinic}
                    />
                  </li>
                ))}
              </ul>
              {!listClinics?.length && (
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

export default ClinicsPage;
