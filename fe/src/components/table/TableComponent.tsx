import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { BsEye } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { PatientType } from "../../data/types.data";

export interface TableComponentProps {
  title?: string;
}

export default function TableComponent(props: TableComponentProps) {
  const { title } = props;

  const TABLE_HEAD = [
    "STT",
    "Thời gian",
    "Họ Tên",
    "Địa chỉ",
    "Giới tính",
    "Lý do khám",
    "Trạng thái",
    "Kết quả",
    "",
  ];

  const dataTable: PatientType[] = [
    // {
    //   bookingTime: "9:00 - 9:30",
    //   fullName: "Xuna Duc",
    //   addressDetail: "Ha noi",
    //   gender: "Nam",
    //   reason: "qjow oqiwheo qhwoe hqoweh oqhe oqh",
    // },
    // {
    //   bookingTime: "9:00 - 9:30",
    //   fullName: "Xuna Duc",
    //   addressDetail: "Ha noi",
    //   gender: "Nam",
    //   reason: "qjow oqiwheo qhwoe hqoweh oqhe oqh",
    // },
    // {
    //   bookingTime: "9:00 - 9:30",
    //   fullName: "Xuna Duc",
    //   addressDetail: "Ha noi",
    //   gender: "Nam",
    //   reason: "qjow oqiwheo qhwoe hqoweh oqhe oqh",
    // },
  ];

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input label="Search" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head: string, index: number) => (
                <th
                  key={head}
                  className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${
                    index == 0 ? "w-[30px]" : ""
                  }`}
                >
                  <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable?.map((data: PatientType, index: number) => {
              const isLast = index === dataTable?.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={data?.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {index + 1}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data?.fullName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data?.bookingTime}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data?.addressDetail}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data?.gender}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data?.reason}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      {/* <Chip
                        // size="sm"
                        // variant="ghost"
                        value={status}
                        color={
                          status === "paid"
                            ? "green"
                            : status === "pending"
                            ? "amber"
                            : "red"
                        }
                      /> */}
                      status
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Đính kèm file kết quả">
                      <IconButton variant="text" color="blue-gray">
                        <MdOutlineAttachFile className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Xem thêm">
                      <IconButton variant="text" color="blue-gray">
                        <BsEye className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" color="blue-gray" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            8
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            9
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" color="blue-gray" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
