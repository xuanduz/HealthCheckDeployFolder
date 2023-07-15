import { RouteNamePatient } from "../routes/routes";

export interface HeaderContentType {
  title: string;
  content?: string;
  slug: string;
}

export const HeaderContentData: HeaderContentType[] = [
  {
    title: "Cơ sở y tế",
    slug: RouteNamePatient.CLINICS,
  },
  {
    title: "Chuyên khoa",
    slug: RouteNamePatient.SPECIALTIES,
  },
  {
    title: "Bác sĩ",
    slug: RouteNamePatient.DOCTORS,
  },
];
