import React, { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
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
          alignItems: "center",
          textAlign: "left",
          padding: "20px 50px 20px 50px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: "20px",
            alignSelf: "flex-start",
          }}
        >
          {displayUserInfo}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignSelf: "flex-start",
            verticalAlign: "center",
            fontSize: "48px",
            fontFamily: "Source Sans Pro",
            padding: 0,
            gap: "20px",
          }}
        >
          <Box sx={{ m: 2, width: "200px" }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
              申請稼働日
            </Typography>
            <DatePicker
              // label="dataPicker"
              selected={executeDate}
              placeholderText={
                executeDate ? executeDate.toLocaleDateString() : ""
              }
              dateFormat="yyyy/MM/dd"
              onChange={(newValue) => setExecuteDate(newValue)}
              customInput={
                <TextField
                  fullWidth
                  sx={{
                    width: "200px",
                    // fontSize: "48px",
                    padding: 0,
                  }}
                />
              }
            />
          </Box>
          {radioButtons.map((radio) => {
            return (
              <span
                key={radio.value}
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  id={radio.value}
                  type="radio"
                  value={radio.value}
                  checked={radio.label === genreOfClockIn}
                  onChange={(e) => handleGenreChange(e.target.value)}
                  style={{
                    transform: "scale(3)",
                    marginRight: "20px",
                    verticalAlign: "middle",
                  }}
                />
                <label htmlFor={radio.value} className="form-check-label">
                  {radio.label}
                </label>
              </span>
            );
          })}
        </Box>
        <Button
          onClick={handleRegularConfirm}
          sx={{
            backgroundColor: "#0B5FFF",
            boxShadow: "0px 0px 10px 0px #00000040",
            mixBlendMode: "multiply",
            color: "white",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "36px",
            padding: "14px 18px",
            width: "710px",
            height: "77",
            borderRadius: "20px 20px 20px 20px",
          }}
        >
          {/*定時 {regularTime} で{genreOfClockIn}打刻確認へ*/}
          定時 {
            regularTimeOnly
          } で{genreOfClockIn === "start" ? "始業" : "終業"}打刻確認へ
        </Button>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ height: "2px", width: "750px", marginTop: 3 }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            fontFamily: "Noto Sans JP",
            marginTop: 4,
            alignSelf: "flex-start",
          }}
        >
          残業時間指定
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "2px",
            padding: "2px",
            width: "710px",
            justifyContent: "space-between",
          }}
        >
          {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((time) => (
            <Button
              key={time}
              onClick={() => handleOvetimeClick(time)}
              sx={{
                backgroundColor: "lightgray",
                flexDirection: "row",
                color: "white",
                fontWeight: 600,
                fontSize: "24px",
                fontFamily: "inter",
                borderRadius: "10px",
                width: "100%",
                height: "60px",
                // gap: "10px",
                padding: "14px 18px ",
                "&:hover": {
                  backgroundColor: "#0B5FFF",
                },
              }}
            >
              {time.toFixed(1)}
            </Button>
          ))}
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            marginTop: 4,
            alignSelf: "flex-start",
          }}
        >
          打刻時間
        </Typography>
        <TimePicker
          onChange={handleTimeChange}
          value={clockInTimeOnly}
          disableClock
          clearIcon={null}
          className="custom-time-picker"
        />

        <Typography
          sx={{ textAlign: "center", fontSize: "36px", padding: "30px" }}
        >
          {genreOfClockIn === "start" ? "早出残業" : "残業時間"}:{" "}
          {Number(overTime).toFixed(1)}
        </Typography>

        <Button
          onClick={handleConfirm}
          sx={{
            backgroundColor: "#0B5FFF",
            boxShadow: "0px 0px 10px 0px #00000040",
            mixBlendMode: "multiply",
            color: "white",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "36px",
            padding: "14px 18px",
            width: "710px",
            height: "77",
            borderRadius: "20px 20px 20px 20px",
          }}
        >
          選択した時刻で{genreOfClockIn === "start" ? "始業" : "終業"}打刻確認へ
        </Button>
      </Box>
    </>
  );
}
