import { Button, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export interface PaginationData {
  pageNum?: number;
  pageSize?: number;
  records?: number;
  pageAmount?: number;
}

export interface PaginationProps {
  paginationData?: PaginationData;
  handlePaging: Function;
}

export default function Pagination(props: PaginationProps) {
  const { paginationData, handlePaging } = props;
  const [activePage, setActivePage] = useState(paginationData?.pageNum || 1);

  useEffect(() => {
    paginationData?.pageNum && setActivePage(paginationData?.pageNum);
  }, [paginationData]);

  useEffect(() => {
    handlePaging({
      ...paginationData,
      pageNum: activePage,
    });
  }, [activePage]);

  const getItemProps = (index: number) => {
    return {
      variant: activePage === index ? "filled" : "text",
      color: activePage === index ? "blue" : "blue-gray",
      onClick: () => handleSelectPage(index),
    } as any;
  };

  const next = () => {
    if (activePage === paginationData?.pageAmount) return;
    setActivePage(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
  };

  const getArray = () => {
    var data = [];
    var length = paginationData?.pageAmount || 1;

    for (var i = 0; i < length; i++) {
      data.push(i + 1);
    }
    return data;
  };

  const handleSelectPage = (page: number) => {
    if (page != paginationData?.pageNum) {
      setActivePage(page);
      handlePaging({
        ...paginationData,
        pageNum: page,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={activePage === 1}
      >
        <BsArrowLeft strokeWidth={2} className="h-4 w-4" /> Trước
      </Button>
      <div className="flex items-center gap-2">
        {getArray().map((page: number) => (
          <IconButton {...getItemProps(page)} key={page} className="text-lg">
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={next}
        disabled={activePage === paginationData?.pageAmount}
      >
        Sau
        <BsArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
