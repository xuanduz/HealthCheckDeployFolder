import { Card, Typography } from "@material-tailwind/react";
import ContainerComponent from "../../components/common/ContainerComponent";
import banner from "../../assets/images/banner-2.png";
import { CiLocationOn } from "react-icons/ci";
import FilterForm, { InputFilter } from "../../components/common/FilterForm";
import { useState, useEffect } from "react";
import CardComponent from "../../components/common/CardComponent";
import { DoctorType, SpecialtyType, defaultPageInfo } from "../../data/types.data";
import Pagination, { PaginationData } from "../../components/common/PaginationComponent";
import { useParams } from "react-router-dom";
import { GetRequest, PostRequest } from "../../utils/rest-api";
import { VNDMoney } from "../../utils/utils";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import parse from "html-react-parser";
import { toast } from "react-toastify";

interface FilterDoctorPatientType extends PaginationData {
  doctorName?: string;
  clinicId?: string;
  specialtyId?: string;
  minPrice?: any;
  maxPrice?: any;
}

const SpecialtyDetailPage = () => {
  let { id } = useParams();

  const [specialty, setSpecialty] = useState<SpecialtyType>();
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [listDoctors, setListDoctors] = useState<DoctorType[]>([]);
  const [filter, setFilter] = useState<FilterDoctorPatientType>({
    ...defaultPageInfo,
    specialtyId: id,
  });

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const getDoctorBySpecialty = async (query: any) => {
    const res = await PostRequest(`${process.env.REACT_APP_API}/doctor/filter`, query);
    const data = res?.data;
    setPaginationData(data?.pagination);
    setListDoctors(data?.data);
  };

  const getSpecialty = async () => {
    const res = await GetRequest(`${process.env.REACT_APP_API}/specialty/${id}`);
    const data = res?.data;
    setSpecialty(data?.data);
  };

  useEffect(() => {
    getDoctorBySpecialty({
      ...filter,
    });
    getSpecialty();
  }, []);

  useEffect(() => {
    getDoctorBySpecialty(filter);
  }, [filter]);

  const handleFilter = (data: any) => {
    const dataFilter: any = {
      ...filter,
      pageNum: 1,
      doctorName: data?.name,
      clinicId: data?.clinicId,
      ...data,
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
      <div className="specialty-banner relative">
        <img src={banner} alt="" className="w-full" />
        <Typography
          variant="h1"
          className="text-blue-500 absolute bottom-2/4 left-0 right-0 text-center"
        >
          {specialty?.name}
        </Typography>
      </div>
      <ContainerComponent>
        <div className="clinic-detail mt-4 mb-4">
          <div className="text-center introduce">
            <p>{parse(specialty?.descriptionHTML || "")}</p>
          </div>
          <div className="flex gap-10">
            <div className="clinics-filter basis-1/4">
              <Typography variant="h3" className="mt-4">
                Bộ lọc
              </Typography>
              <Card className="p-4 shadow-xl mt-2">
                <div>
                  <FilterForm
                    haveName={true}
                    haveClinic={true}
                    havePrice={true}
                    handleSubmitFilterForm={handleFilter}
                  />
                </div>
              </Card>
            </div>
            <div className="clinics-content basis-3/4  flex flex-col">
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
                        image={doctor?.image || EmptyDoctor}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center my-14">
                <Pagination paginationData={paginationData} handlePaging={handlePaging} />
              </div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
};

export default SpecialtyDetailPage;
