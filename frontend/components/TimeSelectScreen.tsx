import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import {
  clockInTimeAtom,
  userInfosAtom,
  orverTimeAtom,
  genreOfClockInAtm,
} from "../src/atoms.ts";

export function TimeSelectScreen() {
  const navigate = useNavigate();
  const [clockInTime, setClockInTime] = useAtom(clockInTimeAtom);
  const [userInfos] = useAtom(userInfosAtom);
  const [buttonContents, setButtonContents] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState("");
  const [overTime, setOverTime] = useAtom(orverTimeAtom);
  const [genreOfClockIn, setGenreOfClockIn] = useAtom(genreOfClockInAtm);
  const [regularTime, setRegularTime] = useState("");

  useEffect(() => {
    console.log("🍎🍎useEffect");
    if (userInfos) {
      console.log("🍎🍎userInfos", userInfos);
      console.log("🍎🍎userInfos.start_time", userInfos.start_time);
      setDisplayUserInfo(`${userInfos.group_name} ${userInfos.name}`);

      const today = new Date();
      const start_dateTime = timeStringToDate(userInfos.start_time);
      const end_dateTime = timeStringToDate(userInfos.end_time);
      // console.log("userInfos.start_time", userInfos.start_time);
      console.log("start_dateTime", start_dateTime);
      console.log("end_dateTime", end_dateTime);

      const diffBetweenStart = Math.abs(
        today.getTime() - start_dateTime.getTime(),
      );
      const diffBetweenEnd = Math.abs(today.getTime() - end_dateTime.getTime());
      console.log("diffBetweenStart", diffBetweenStart);
      console.log("diffBetweenEnd", diffBetweenEnd);

      if (diffBetweenStart >= diffBetweenEnd) {
        // setButtonContents(`定時 ${userInfos.end_time}  終業確認へ`);
        setGenreOfClockIn("終業");
        setRegularTime(userInfos.end_time.split(":").slice(0, 2).join(":"));
      } else {
        // setButtonContents(`定時 ${userInfos.start_time}  始業確認へ`);
        setGenreOfClockIn("始業");
        setRegularTime(userInfos.start_time.split(":").slice(0, 2).join(":"));
      }
    }
  }, [userInfos]);

  function timeStringToDate(stringTime: string): Date | null {
    const [hours, minutes, seconds] = stringTime.split(":").map(Number); //数値型に変換
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date;
  }

  const handleClose = () => {
    navigate("/");
  };

  //定時　始業・終了処理
  const handleRegularConfirm = () => {
    // setClockinTime(value);
    navigate("/confirm");
  };

  // 残業指定を選択
  const handleOvetimeClick = (overtimeValue: number) => {
    setOverTime(overtimeValue);
  };
  //time dramで時間変更
  const handleChange = (clockInTime: string) => {
    setClockInTime(clockInTime);
    console.log(clockInTime);
    // setOvertime(clockInTime - regularTime);
  };

  //時間指定　始業・終了処理
  const handleConfirm = () => {
    // setClockinTime(value);
    navigate("/confirm");
  };
  return (
    <>
      <button onClick={handleClose}>✖️</button>
      <p>{displayUserInfo}</p>
      {/*<button onClick={handleRegularConfirm}>{buttonContents}</button>{" "}*/}
      {/*  `定時 ${userInfos.end_time}  終業確認へ`*/}
      <button onClick={handleRegularConfirm}>
        定時 {regularTime} {genreOfClockIn}確認へ
      </button>{" "}
      <p>残業時間指定</p>
      <button onClick={() => handleOvetimeClick(0.5)}>0.5</button>
      <button onClick={() => handleOvetimeClick(1.0)}>1.0</button>
      <button onClick={() => handleOvetimeClick(1.5)}>1.5</button>
      <button onClick={() => handleOvetimeClick(2.0)}>2.0</button>
      <button onClick={() => handleOvetimeClick(2.5)}>2.5</button>
      <button onClick={() => handleOvetimeClick(3.0)}>3.0</button>
      <TimePicker
        onChange={handleChange}
        value={clockInTime}
        disableClock
        clearIcon={null}
      />
      <p>暫定表示）選択した時間{clockInTime}</p>
      <p>残業時間 {Number(overTime).toFixed(1)}</p>
      <button onClick={handleConfirm}>{genreOfClockIn}確認へ</button>
    </>
  );
}
