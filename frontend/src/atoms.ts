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
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
);
export const orverTimeAtom = atom(0);
export const genreOfClockInAtm = atom("");
export const executeDateAtm = atom(new Date());
export const displayUserInfoAtom = atom("");
