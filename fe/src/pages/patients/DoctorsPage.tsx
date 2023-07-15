import { Button, Card, Typography } from "@material-tailwind/react";
import banner from "../../assets/images/banner-2.png";
import ContainerComponent from "../../components/common/ContainerComponent";
import FilterForm, { InputFilter } from "../../components/common/FilterForm";
import CardComponent from "../../components/common/CardComponent";
import { DoctorType, SpecialtyType, defaultPageInfo } from "../../data/types.data";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { doctorPatientAtom, doctorPatientSelector } from "../../data/recoil/patient/doctor.patient";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import { useEffect, useState } from "react";
import { VNDMoney } from "../../utils/utils";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { PostRequest } from "../../utils/rest-api";

export interface FilterDoctorPatientType extends PaginationData {
  doctorName?: string;
  clinicId?: string;
  specialtyId?: string;
  price?: any;
}

const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const specialtyId = searchParams.get("specialtyId");
  const clinicId = searchParams.get("clinicId");
  const queryFilter: FilterDoctorPatientType = {
    ...defaultPageInfo,
    specialtyId: specialtyId || "",
    clinicId: clinicId || "",
  };

  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [listDoctors, setListDoctors] = useState<DoctorType[]>([]);
  const [filter, setFilter] = useState<FilterDoctorPatientType>(queryFilter);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleFilterRequest = async () => {
    const res = await PostRequest(`${process.env.REACT_APP_API}/doctor/filter`, filter);
    setListDoctors(res?.data?.data);
    setPaginationData(res?.data?.pagination);
  };

  useEffect(() => {
    handleFilterRequest();
  }, [filter]);

  const handleFilter = ({ ...params }) => {
    const data = { ...params };
    const dataFilter: any = {
      ...queryFilter,
      ...data,
      pageNum: 1,
      doctorName: data?.name,
    };
    if (dataFilter?.minPrice > dataFilter?.maxPrice) {
      toast.warn("Giá nhỏ nhất phải thấp hơn hoặc bằng mức giá lớn nhất !");
    } else {
      setFilter(dataFilter);
    }
  };

  const handlePaging = (paginationData: PaginationData) => {
    setFilter({
      ...filter,
      ...paginationData,
    });
  };

  return (
    <>
      <div className="doctors-banner relative">
        <img src={banner} alt="" className="w-full" />
        <Typography
          variant="h1"
          className="text-blue-500 absolute bottom-2/4 left-0 right-0 text-center"
        >
          Bác sĩ
        </Typography>
      </div>
      <ContainerComponent>
        <div className="flex gap-10">
          <div className="doctors-filter basis-1/4">
            <Typography variant="h3" className="mt-4">
              Bộ lọc
            </Typography>
            <Card className="p-4 shadow-xl mt-2">
              <div>
                <FilterForm
                  haveName={true}
                  havePrice={true}
                  haveClinic={true}
                  haveSpecialty={true}
                  queryFilterBefore={queryFilter}
                  handleSubmitFilterForm={handleFilter}
                />
              </div>
            </Card>
          </div>
          <div className="doctors-content basis-3/4">
            <Typography variant="h3" className="mt-4">
              Danh sách bác sĩ
            </Typography>
            <div>
              <ul className="grid grid-cols-3 gap-5 mt-2">
                {listDoctors?.map((doctor: DoctorType, index: number) => (
                  <li className="basis-1/3">
                    <CardComponent
                      key={doctor?.id}
                      title={doctor?.positionData?.value + " " + doctor.fullName}
                      url={`/doctors/${doctor.id}`}
                      price={doctor?.price ? VNDMoney.format(+doctor?.price) : ""}
                      describe={doctor?.describe}
                      specialties={doctor?.specialtyData
                        ?.map((spec: SpecialtyType) => spec?.name)
                        ?.join(", ")}
                      // address={getLabelProvice(doctor?.provinceKey ? doctor.provinceKey : '', [] as any)}
                      image={doctor?.image || EmptyDoctor}
                    />
                  </li>
                ))}
              </ul>
              {!listDoctors?.length && (
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

export default DoctorsPage;
