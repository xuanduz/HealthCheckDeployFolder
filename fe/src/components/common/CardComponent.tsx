import { Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

export interface CardComponentProps {
  id?: number;
  title?: string;
  price?: string;
  address?: string | undefined;
  image?: string;
  describe?: string;
  url: string;
  specialties?: string;
}

const CardComponent = (props: CardComponentProps) => {
  const { title, price, address, image, describe, id, specialties } = props;
  return (
    <Card className="shadow-xl max-w-96">
      <CardHeader floated={false}>
        <div className="h-[250px] w-[345px]">
          <img src={image} alt="img-blur-shadow" className="w-full" />
        </div>
      </CardHeader>
      <CardBody className="text-center pb-3 h-[130px] relative flex flex-col items-center">
        <Typography variant="h5" className="mb-2">
          <Link to={props.url}>{title}</Link>
        </Typography>
        <p color="black" className="mb-2 ">
          {describe}
        </p>
        <p color="black" className="mb-2 text-sm italic absolute bottom-0">
          {specialties}
        </p>
      </CardBody>
      {(address || price) && (
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="lead" color="red" className="font-semibold">
            {price}
          </Typography>
          <Typography variant="lead" color="black" className="flex gap-1 text-base">
            {address && (
              <>
                <CiLocationOn className="mt-1"></CiLocationOn>
                {address}
              </>
            )}
          </Typography>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardComponent;
