import { RoutesType } from "../components/sidebar/SidebarLink";

export const RouteNamePatient = {
  HOME: "/",
  DOCTORS: "/doctors",
  DOCTOR_DETAIL: "/doctors/:id",
  CLINICS: "/clinics",
  CLINIC_DETAIL: "/clinics/:id",
  SPECIALTIES: "/specialties",
  SPECIALTY_DETAIL: "/specialties/:id",
  BOOKING_DOCTOR: "/booking",
  BOOKING_DIRECT: "/booking/directly",
  BOOKING_HOME: "/booking/home",
  BOOKING_FORM: "/booking/:id",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  REGISTER: "/register",
  INFORMATION: "/information",
  CHANGE_PASSWORD: "/change-password",
  HISTORY: "/history",
  VERIFY_EMAIL: "/verify-email",
};

export const RouteNameDoctor = {
  DEFAULT: "/system-doctor",
  LOGIN: "/system-doctor/login",
  HOME: "/system-doctor/home",
  SCHEDULE: "/system-doctor/schedule",
  APPOINTMENT: "/system-doctor/appointment",
  INFOMATION: "/system-doctor/doctor",
  CHANGE_PASSWORD: "/system-doctor/change-password",
};

export const RouteNameAdmin = {
  DEFAULT: "/system-admin",
  LOGIN: "/system-admin/login",
  HOME: "/system-admin/home",
  DOCTORS: "/system-admin/doctors",
  SPECIALTY: "/system-admin/specialty",
  DOCTOR_DETAIL: "/system-admin/doctors/:id",
  CLINICS: "/system-admin/clinics",
  CLINIC_DETAIL: "/system-admin/clinics/:id",
  BOOKING: "/system-admin/booking",
  BOOKING_DETAIL: "/system-admin/booking/:id",
  // SPECIALTY_DETAIL: "/specialties/:id",
  // BOOKING_DOCTOR: "/booking",
  REGISTER: "/system-admin/register",
  CHANGE_PASSWORD: "/system-admin/change-password",
};

export const RoleRoutes = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  DOCTOR: "DOCTOR",
};

export const routesSidebar: RoutesType[] = [
  {
    name: "Trang chủ",
    path: RouteNameDoctor.HOME,
    role: RoleRoutes.DOCTOR,
  },
  {
    name: "Quản lý lịch khám",
    path: RouteNameDoctor.SCHEDULE,
    role: RoleRoutes.DOCTOR,
  },
  {
    name: "Quản lý đơn đặt lịch",
    path: RouteNameDoctor.APPOINTMENT,
    role: RoleRoutes.DOCTOR,
  },
  {
    name: "Thông tin cá nhân",
    path: RouteNameDoctor.INFOMATION,
    role: RoleRoutes.DOCTOR,
  },
  {
    name: "Đổi mật khẩu",
    path: RouteNameDoctor.CHANGE_PASSWORD,
    role: RoleRoutes.DOCTOR,
  },
  // {
  //   name: "Đăng xuất",
  //   path: RouteNameDoctor.LOGIN,
  //   role: RoleRoutes.DOCTOR,
  // },
  {
    name: "Trang chủ",
    path: RouteNameAdmin.HOME,
    role: RoleRoutes.ADMIN,
  },
  {
    name: "Trang chủ",
    path: RouteNameAdmin.HOME,
    role: RoleRoutes.SUPER_ADMIN,
  },
  {
    name: "Quản lý đơn đặt lịch",
    path: RouteNameAdmin.BOOKING,
    role: RoleRoutes.ADMIN,
  },
  {
    name: "Quản lý đơn đặt lịch",
    path: RouteNameAdmin.BOOKING,
    role: RoleRoutes.SUPER_ADMIN,
  },
  {
    name: "Quản lý cơ sở y tế",
    path: RouteNameAdmin.CLINICS,
    role: RoleRoutes.SUPER_ADMIN,
  },
  {
    name: "Quản lý chuyên khoa",
    path: RouteNameAdmin.SPECIALTY,
    role: RoleRoutes.SUPER_ADMIN,
  },
  {
    name: "Quản lý bác sĩ",
    path: RouteNameAdmin.DOCTORS,
    role: RoleRoutes.SUPER_ADMIN,
  },
  {
    name: "Đăng ký thêm tài khoản",
    path: RouteNameAdmin.REGISTER,
    role: RoleRoutes.SUPER_ADMIN,
  },
  {
    name: "Đổi mật khẩu",
    path: RouteNameAdmin.CHANGE_PASSWORD,
    role: RoleRoutes.ADMIN,
  },
];
