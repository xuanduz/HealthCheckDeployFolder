import { Button, Card, Typography } from "@material-tailwind/react";
import SmallContainerComponent from "../../components/common/SmallContainerComponent";
import { Avatar } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingPatientAtom } from "../../data/recoil/patient/booking.patient";
import { useEffect } from "react";
import EmptyDoctor from "../../assets/images/empty-doctor.png";
import { BookingType } from "../../components/patient/ScheduleDoctor.Component";

const BookingPage = () => {
  const navigate = useNavigate();
  const booking: BookingType = useRecoilValue(bookingPatientAtom);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <h1>Booking Page</h1>
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
      {booking?.doctor ? (
        <SmallContainerComponent>
          <div className="introduce flex justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <Avatar
                  alt="doctor"
                  src={booking?.doctor?.image || EmptyDoctor}
                  sx={{ width: 200, height: 200 }}
                />
              </div>
              <div>
                <Typography variant="h2">
                  {(booking?.doctor?.positionData?.value || "") + " " + booking?.doctor?.fullName}
                </Typography>
                <p>
                  {(booking?.doctor?.positionData?.value || "") + " " + booking?.doctor?.fullName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="simple_info basis-1/2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus officia
              voluptatem officiis! Tenetur expedita, saepe, delectus at asperiores nulla dolores
              dicta quis esse quaerat quasi adipisci molestiae porro animi totam deserunt.
              Voluptatibus quis laborum ratione aspernatur. Maiores porro error ipsa. Vitae,
              blanditiis maiores nobis ipsa sint perspiciatis optio accusantium iure!
            </div>
            <div className="flex flex-col gap-4 basis-1/2">
              <Card className="schedule p-4">
                <form>
                  <div></div>
                  <Button className="w-full">Đặt lịch ngay</Button>
                </form>
              </Card>

              <div>
                <Typography variant="h5" className="mb-2">
                  Chuyên gia tương tự
                </Typography>
              </div>
            </div>
          </div>
        </SmallContainerComponent>
      ) : null}
    </div>
  );
};

export default BookingPage;
