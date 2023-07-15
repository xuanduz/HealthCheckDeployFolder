import { useState } from "react";
import SidebarComponent from "../components/sidebar/SidebarComponent";
import Cookies from "universal-cookie";
import ErrorPage from "../pages/common/ErrorPage";

const AdminLayout = (props: any) => {
  const cookies = new Cookies();
  const [open, setOpen] = useState(true);

  return (
    <>
      {cookies.get("role") == "ADMIN" || cookies.get("role") == "SUPER_ADMIN" ? (
        <div className="flex h-full w-full">
          <SidebarComponent open={open} onClose={() => setOpen(false)} />
          {/* Navbar & Main Content */}
          <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
            {/* Main Content */}
            <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
              <div className="h-full">
                <div className="pt-5s mx-auto mb-auto h-full min-h-[100vh] pt-10 p-2 md:pr-2">
                  {props?.children}
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default AdminLayout;
