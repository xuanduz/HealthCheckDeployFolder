import { Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

export interface CardComponentProps {
  id?: number;
  title?: string;
  image?: string;
  describe?: string;
  url: string;
  specialties?: string;
}

const SmallCardComponent = (props: CardComponentProps) => {
  const { title, image, describe, id, specialties, url } = props;
  return (
    <Card className="shadow-xl max-w-[14rem]">
      <div className="flex justify-center">
        <CardHeader floated={false} className="rounded-full w-1/2">
          <img src={image} alt="img-blur-shadow" className="h-[105px] w-[170px]" />
        </CardHeader>
      </div>
      <CardBody className="text-center pb-3 relative  flex flex-col items-center h-[105px]">
        <Typography variant="h6" className="mb-2">
          <Link to={props.url}>{title}</Link>
        </Typography>
        <p color="black" className="mb-2 text-sm">
          {describe}
        </p>
        <p color="black" className="mb-2 text-sm italic absolute bottom-0">
          {specialties}
        </p>
      </CardBody>
      <CardFooter divider className="flex items-center justify-center py-3">
        <Link to={url}>
          <Typography variant="small" color="blue" className="font-semibold">
            Xem thêm
          </Typography>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SmallCardComponent;
