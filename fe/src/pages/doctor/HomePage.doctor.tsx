import { useState } from "react";
import { Typography } from "@material-tailwind/react";

const HomePageDoctor = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Typography variant="h1" className="text-red-500">
        Xin chào Bác sĩ !
      </Typography>
    </div>
  );
};

export default HomePageDoctor;
