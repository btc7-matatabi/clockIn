import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import { Box, Button, Typography } from "@mui/material";
import {
  clockInTimeAtom,
  userInfosAtom,
  orverTimeAtom,
  genreOfClockInAtm,
} from "../src/atoms.ts";
import dayjs, { Dayjs } from "dayjs";

export function TimeSelectScreen() {
  const navigate = useNavigate();
  // const [clockInTime, setClockInTime] = useAtom(clockInTimeAtom);
  const [clockInTime, setClockInTime] = useAtom<Dayjs | null>(clockInTimeAtom);
  const [userInfos] = useAtom(userInfosAtom);
  // const [buttonContents, setButtonContents] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState("");
  const [overTime, setOverTime] = useAtom(orverTimeAtom);
  const [genreOfClockIn, setGenreOfClockIn] = useAtom(genreOfClockInAtm);
  const [regularTime, setRegularTime] = useState("");

  useEffect(() => {
    console.log("🍎🍎useEffect");
    if (userInfos) {
      setDisplayUserInfo(`${userInfos.group_name}   ${userInfos.name}`);

      const today = new Date();
      const start_dateTime = timeStringToDate(userInfos.start_time);
      const end_dateTime = timeStringToDate(userInfos.end_time);
      // console.log("userInfos.start_time", userInfos.start_time);
      // 開始が終了より後になっている場合、終了日を翌日にする
      if (start_dateTime > end_dateTime) {
        end_dateTime.setDate(end_dateTime.getDate() + 1);
      }
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

  // 定時 始業・終了処理
  const handleRegularConfirm = () => {
    console.log("regularTime", regularTime);
    setClockInTime(regularTime);
    navigate("/confirm");
  };

  // 残業指定を選択
  const handleOvetimeClick = (overtimeValue: number) => {
    setOverTime(overtimeValue);
  };
  //time dramで時間変更
  // const handleChange = (time: string) => {
  //   setClockInTime(time);
  //   console.log(clockInTime);
  // };
  const handleChange = (newValue: Dayjs | null) => {
    setClockInTime(newValue);
  };

  // 時間指定 始業・終了処理
  const handleConfirm = () => {
    // setClockinTime(value);
    navigate("/confirm");
  };
  return (
    <>
      {/*<button onClick={handleClose}>✖️</button>*/}
      {/*<p>{displayUserInfo}</p>*/}
      {/*<button onClick={handleRegularConfirm}>*/}
      {/*  定時 {regularTime} {genreOfClockIn}確認へ*/}
      {/*</button>{" "}*/}
      {/*<p>残業時間指定</p>*/}
      {/*<button onClick={() => handleOvetimeClick(0.5)}>0.5</button>*/}
      {/*<button onClick={() => handleOvetimeClick(1.0)}>1.0</button>*/}
      {/*<button onClick={() => handleOvetimeClick(1.5)}>1.5</button>*/}
      {/*<button onClick={() => handleOvetimeClick(2.0)}>2.0</button>*/}
      {/*<button onClick={() => handleOvetimeClick(2.5)}>2.5</button>*/}
      {/*<button onClick={() => handleOvetimeClick(3.0)}>3.0</button>*/}
      {/*<TimePicker*/}
      {/*  onChange={handleChange}*/}
      {/*  value={clockInTime}*/}
      {/*  disableClock*/}
      {/*  clearIcon={null}*/}
      {/*/>*/}
      {/*<p>暫定表示）選択した時間{clockInTime}</p>*/}
      {/*<p>残業時間 {Number(overTime).toFixed(1)}</p>*/}
      {/*<button onClick={handleConfirm}>{genreOfClockIn}確認へ</button>*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "lightgray",
            color: "white",
            fontWeight: 600,
            fontSize: "32px",
            marginLeft: "auto",
            padding: 0,
            height: "40px",
          }}
        >
          ×
        </Button>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            fontWeight: 500,
            fontSize: "32px",
            textAlign: "left",
          }}
        >
          {displayUserInfo}
        </Typography>

        <Button
          onClick={handleRegularConfirm}
          sx={{
            backgroundColor: "#4caf50",
            color: "white",
            fontWeight: 600,
            fontSize: "24px",
            marginBottom: "20px",
            padding: "10px 40px",
          }}
        >
          定時 {regularTime} {genreOfClockIn}確認へ
        </Button>

        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "16px" }}>
            残業時間指定
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",
              padding: "2px",
            }}
          >
            {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((time) => (
              <Button
                key={time}
                onClick={() => handleOvetimeClick(time)}
                sx={{
                  backgroundColor: "lightgray",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  // margin: "2px",
                  // padding: "2px ",
                  width: "auto",
                }}
              >
                {time}
              </Button>
            ))}
          </Box>
        </Box>

        <TimePicker
          onChange={handleChange}
          value={clockInTime}
          disableClock
          clearIcon={null}
          className="custom-time-picker"
        />

        {/*<Typography variant="body1" sx={{ marginBottom: "20px" }}>*/}
        {/*  暫定表示）選択した時間:{" "}*/}
        {/*  {clockInTime ? clockInTime.format("HH:mm") : "未選択"}*/}
        {/*</Typography>*/}

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          残業時間: {Number(overTime).toFixed(1)}
        </Typography>

        <Button
          onClick={handleConfirm}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: 600,
            fontSize: "24px",
            padding: "10px 40px",
          }}
        >
          {genreOfClockIn}確認へ
        </Button>
      </Box>
      );
    </>
  );
}
