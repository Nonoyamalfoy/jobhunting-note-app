import dayjs from "dayjs";
import { Company } from "./company";

// export type StrengthsAndWeaknesses = {
//   strengthsAndWeaknessesId?: string;
//   strengths: string;
//   weaknesses: string;
//   created_at?: firebase.firestore.Timestamp;
//   updated_at?: firebase.firestore.Timestamp;
// };

export type Experience = {
  experienceId: string;
  title: string;
  age: number;
  motivation: number;
  description: string,
  created_at?: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
};

export type ToDo = {
  toDoId: string;
  title: string;
  deadline: string;
  completed: boolean;
  created_at?: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
};

export type Schedule = {
  scheduleId: string;
  title: string;
  color: string;
  date: string;
  description: string;
  location: string;
  created_at?: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
};

export type BestWork = {
  bestWorkId: string;
  title: string;
  whatIDid: string;
  whatWasDifficult: string;
  whatIGot: string;
  reasonsForWorking: string;
  whatImakeUseOftheBestWork: string;
  created_at?: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
};

export type AuthUser = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  strengths: string;
  weaknesses: string;
};

export type StrengthsAndWeaknesses = {
  strengths: string;
  weaknesses: string;
};

export type User = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  strengths: string;
  weaknesses: string;
  experiences: Experience[];
  toDoList: ToDo[];
  schedules: Schedule[];
  companies: Company[];
  bestWorks: BestWork[];
};
