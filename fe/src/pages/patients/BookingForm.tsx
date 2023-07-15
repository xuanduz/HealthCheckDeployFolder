import {
  Button,
  Card,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { Avatar } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PatientFormComponent from "../../components/patient/PatientFormComponent";
import { useRecoilValue } from "recoil";
import { bookingPatientAtom } from "../../data/recoil/patient/booking.patient";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import { BookingType } from "../../components/patient/ScheduleDoctor.Component";
import { VNDMoney } from "../../utils/utils";
import { AppointmentType } from "../../data/types.data";
import { PostRequest } from "../../utils/rest-api";

const BookingForm = () => {
  const navigate = useNavigate();
  const booking: BookingType = useRecoilValue(bookingPatientAtom);
  const doctor = booking?.doctor;

  const onSubmitForm = async (data: any) => {
    const bookingData: AppointmentType = {
      patientData: data?.patient,
      bookingType: data?.bookingType,
      reason: data?.reason,
      patientId: data?.patient?.id,
      doctorId: booking?.doctor?.id,
      date: booking?.date,
      timeSlot: booking?.timeSlot,
    };
    await PostRequest(`${process.env.REACT_APP_API}/booking`, bookingData, true);
  };

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className=" bg-blue-50 flex justify-center">
        <div className="w-8/12 booking-title relative pt-10 pb-10 flex items-center">
          <div className="z-10 p-2 basis-1/6" role="button" onClick={() => navigate(-1)}>
            <Typography variant="h5" className="flex gap-2 items-center">
              <BiArrowBack /> Trở lại
            </Typography>
          </div>
          <Typography variant="h2" className="text-center basis-4/6">
            Đặt lịch khám chuyên gia
          </Typography>
        </div>
      </div>
      <SmallContainerComponent>
        <SmallContainerComponent>
          <div className="flex justify-between mt-4 border-2 rounded-md p-4">
            <div className="flex gap-10">
              <div className="relative">
                <Avatar
                  alt="doctor"
                  src={doctor?.image || EmptyDoctor}
                  sx={{ width: 100, height: 100 }}
                />
              </div>
              <div>
                <Typography variant="h2">
                  {(doctor?.positionData?.value || "") + " " + doctor?.fullName}
                </Typography>
                <p>{(doctor?.positionData?.value || "") + " " + doctor?.fullName}</p>
                <p>{"Thời gian " + booking?.timeValue + " Ngày " + booking?.date}</p>
                <p>{doctor?.clinicData?.name}</p>
                <p>{doctor?.clinicData?.address}</p>
              </div>
              <div>
                <div>
                  <span>Giá khám:</span>
                  <p>{doctor?.price ? VNDMoney.format(+doctor?.price) : ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <PatientFormComponent
              submitButtonContent="Xác nhận lịch khám"
              handleSubmitForm={onSubmitForm}
            />
            <div className="text-center">
              <p>
                Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám.
              </p>
              <p>Hình thức thanh toán sau khi khám bệnh.</p>
            </div>
          </div>
        </SmallContainerComponent>
      </SmallContainerComponent>
    </div>
  );
};

export default BookingForm;
