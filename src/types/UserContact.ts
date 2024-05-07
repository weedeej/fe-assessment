import { Timestamp } from "firebase/firestore";

export type UserContact = {
  _id: string;
  name: string;
  imagePath: string;
  lastContactDate: Date | Timestamp;
};