import dayjs from "dayjs";

export type Event = {
  eventDate: dayjs.Dayjs;
  eventLocation: string;
  eventDescription: string;
};

export type Company = {
  companyId: string;
  aspiration: number | null;
  companyName: string;
  corporatePhilosophy: string;
  companyBusiness: string;
  yearOfEstablish: dayjs.Dayjs;
  numberOfEmployees: string;
  capital: string;
  annualIncome: string;
  requiredPersonImage: string;
  requiredSkill: string;
  workingEnvironment: string;
  welfare: string;
  future: string;
  corporateIssues: string;
  reasonForAspiration: string;
  event: Event[];
  memo: string;
};
