import { Schedule } from "./user";

export type Company = {
  companyId: string;
  companyName: string;
  aspiration: number | null;
  corporatePhilosophy: string;
  companyBusiness: string;
  yearOfEstablish: string;
  numberOfEmployees: string;
  capital: string;
  annualIncome: string;
  requiredPersonImage: string;
  requiredSkill: string;
  workingEnvironment: string;
  welfare: string;
  future: string;
  task: string;
  reasonForAspiration: string;
  schedules: Schedule[];
  memo: string;
  created_at?: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
};
