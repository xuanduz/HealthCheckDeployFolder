import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PostRequest } from "../../utils/rest-api";
import { Typography } from "@material-tailwind/react";

export default function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");
  const timeSlot = searchParams.get("timeSlot");
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    const res = await PostRequest(`${process.env.REACT_APP_API}/verify-email`, {
      patientId: patientId,
      doctorId: doctorId,
      date: date,
      timeSlot: timeSlot,
    });
    setMessage(res.data?.message);
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="text-center text-red-500 mt-10 h-48">
      <Typography variant="h4">{message ? message : "Lỗi hệ thống, vui lòng thử lại !"}</Typography>
    </div>
  );
}
