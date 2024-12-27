import { atom } from "jotai";
export interface UserInfos {
  name: string;
  group_code: string;
  group_name: string;
  start_time: string; //"HH:MM"
  end_time: string; //"HH:MM"
}

export const userInfosAtom = atom<UserInfos | null>(null);
export const employeeCodeAtom = atom("");
export const clockInTimeAtom = atom(
  new Date(),
);
export const orverTimeAtom = atom(0);
export const genreOfClockInAtm = atom<"start" | "end"|"">("");
export const executeDateAtm = atom<Date>(new Date());
export const displayUserInfoAtom = atom("");
