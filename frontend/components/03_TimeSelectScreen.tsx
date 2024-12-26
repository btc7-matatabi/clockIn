import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import {
  clockInTimeAtom,
  userInfosAtom,
  orverTimeAtom,
  genreOfClockInAtm,
  executeDateAtm,
  displayUserInfoAtom,
} from "../src/atoms.ts";
import { AppToolBar } from "../src/AppToolBar.tsx";
import { UserInfo } from "./03_01_UserInfo.tsx";
import { DataPickerSection } from "./03_02_DataPickerSection.tsx";
import { RadioButtonSection } from "./03_03_RadioButtonSection.tsx";
import { OvertimeButtonSection } from "./03_04_OvertimeButtonSection.tsx";
import { TimePickerSection } from "./03_05_TimePickerSection.tsx";
import { RegularTimeButton } from "./03_06_RegularTimeButton.tsx";
import { BottomButtonSection } from "./03_07_BottomButtonSection.tsx";

export function TimeSelectScreen() {
  const navigate = useNavigate();
  const [clockInTime, setClockInTime] = useAtom(clockInTimeAtom);
  const [userInfos] = useAtom(userInfosAtom);
  const [overTime, setOverTime] = useAtom(orverTimeAtom);
  const [genreOfClockIn, setGenreOfClockIn] = useAtom(genreOfClockInAtm); //「始業」か「終了」
  const [executeDate, setExecuteDate] = useAtom(executeDateAtm);
  const [displayUserInfo, setDisplayUserInfo] = useAtom(displayUserInfoAtom);
  const [regularTime, setRegularTime] = useState(""); // 定時設定
  const radioButtons = [
    { label: "始業", value: "start" },
    { label: "終業", value: "end" },
  ];
  useEffect(() => {
    if (userInfos) {
      setDisplayUserInfo(`${userInfos.group_name}      ${userInfos.name}`);

      //打刻時間が午前はデフォルト始業、午後は終業にする版
      const today = new Date();
      if (today.getHours() >= 12) {
        setGenreOfClockIn("end");
        setRegularTime(userInfos.end_time);
      } else {
        setGenreOfClockIn("start");
        setRegularTime(userInfos.start_time);
      }
    }
    console.log("🍎userInfos", userInfos);
  }, [userInfos]);

  // 定時 始業・終了処理
  const handleRegularConfirm = () => {
    console.log("regularTime", regularTime);
    setClockInTime(regularTime);
    navigate("/confirm");
  };

  // 残業指定ボタンを選択
  const handleOvetimeClick = (overtimeValue: number) => {
    setOverTime(overtimeValue);

    if (genreOfClockIn === "end") {
      //orvertimeValueが少数の場合、分も加算される
      const addedTime = moment(regularTime).add(overtimeValue, "hours");
      setClockInTime(addedTime.format("YYYY/MM/DD HH:mm:ss"));
    } else {
      const addedTime = moment(regularTime).subtract(overtimeValue, "hours");
      // setClockInTime(addedTime.format("HH:mm"));
      setClockInTime(addedTime.format("YYYY/MM/DD HH:mm:ss"));
    }
  };

  //time dramで時間変更
  const handleTimeChange = (newValue: string | ((prev: string) => string)) => {
    console.log("newValue", newValue);
    setClockInTime(newValue);
  };

  // 時間指定 始業・終了処理
  const handleConfirm = () => {
    console.log(clockInTime);
    navigate("/confirm");
  };
  const handleGenreChange = (val: string) => {
    const selectedGenre = radioButtons.find((el) => el.value === val);
    if (selectedGenre) {
      setGenreOfClockIn(selectedGenre.label);
      setClockInTime(new Date());
      setOverTime(0);
    }
  };
  const regularTimeOnly = new Date(regularTime)
    .toLocaleString("ja-JP", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false, // 24時間制（true にすると 12時間制）
    })
    .toString(); //HH:MM 表示

  const clockInTimeOnly = new Date(clockInTime)
    .toLocaleString("ja-JP", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false, // 24時間制（true にすると 12時間制）
    })
    .toString(); //HH:MM 表示

  return (
    <>
      {/*https://m2.material.io/design/typography/the-type-system.html#type-scale*/}
      <AppToolBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start",
          textAlign: "left",
          padding: "20px 50px 20px 50px",
          fontWeight: 600,
        }}
      >
        <UserInfo displayUserInfo={displayUserInfo} />

        <Box
          sx={{
            display: "flex",
            verticalAlign: "center",
            fontSize: "48px",
            fontFamily: "Source Sans Pro",
            padding: 0,
            gap: "20px",
          }}
        >
          <DataPickerSection
            executeDate={executeDate}
            setExecuteDate={setExecuteDate}
          />

          <RadioButtonSection
            genreOfClockIn={genreOfClockIn}
            handleGenreChange={handleGenreChange}
          />
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ height: "2px", width: "750px", marginTop: 2, marginBottom: 4 }}
        />
        <RegularTimeButton
          handleRegularConfirm={handleRegularConfirm}
          regularTimeOnly={regularTimeOnly}
          genreOfClockIn={genreOfClockIn}
        />
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ height: "2px", width: "750px", marginTop: 4 }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontFamily: "Noto Sans JP",
            marginTop: 4,
            alignSelf: "flex-start",
          }}
        >
          残業時間指定
        </Typography>

        <OvertimeButtonSection handleOvetimeClick={handleOvetimeClick} />
        <TimePickerSection
          handleTimeChange={handleTimeChange}
          clockInTimeOnly={clockInTimeOnly}
        />

        <BottomButtonSection
          genreOfClockIn={genreOfClockIn}
          overTime={overTime}
          handleConfirm={handleConfirm}
        />
      </Box>
    </>
  );
}
