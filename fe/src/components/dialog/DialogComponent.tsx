import { Fragment, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/avatar";

export interface DialogComponentProps {
  displayButton: any;
  size?: size;
  title?: string;
  formatterContent?: any;
  closeText?: string;
  acceptText?: string;
  acceptAction?: Function;
}

export default function DialogComponent(props: DialogComponentProps) {
  const { displayButton, size, title, formatterContent, closeText, acceptText, acceptAction } =
    props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleAccept = () => {
    setOpen(!open);
    acceptAction && acceptAction();
  };

  return (
    <Fragment>
      <div onClick={handleOpen}>{displayButton}</div>
      <Dialog open={open} handler={handleOpen} size={size ? size : "md"}>
        {title ? <DialogHeader>{title}</DialogHeader> : null}
        <DialogBody divider className="max-h-[600px] overflow-auto">
          {formatterContent}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>{closeText ? closeText : "Huỷ"}</span>
          </Button>
          {acceptText ? (
            <Button variant="gradient" color="green" onClick={handleAccept}>
              <span>{acceptText}</span>
            </Button>
          ) : null}
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
