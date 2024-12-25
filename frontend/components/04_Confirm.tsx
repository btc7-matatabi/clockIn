import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import {
  clockInTimeAtom,
  displayUserInfoAtom,
  genreOfClockInAtm,
  orverTimeAtom,
} from "../src/atoms.ts";
import { Box, Button, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";

export function ConfirmScreen() {
  const navigate = useNavigate();
  const [overTime] = useAtom(orverTimeAtom); //残業時間
  const [clockInTime] = useAtom(clockInTimeAtom); //打刻時間
  const [genreOfClockIn] = useAtom(genreOfClockInAtm); //打刻分類（始業or終業)
  const [displayUserInfo, setDisplayUserInfo] = useAtom(displayUserInfoAtom);
  useEffect(() => {}, []);
  const handleCancel = () => {
    navigate("/time-select");
  };
  const handleSend = () => {
    async function sendRecord() {
      const URL = process.env.VITE_URL;
      const url = URL + "/attendance-time/";
      //clockInTimeが終業で〜７時までの場合は前日のデータとして登録する
      //始業時は打刻時間が始業時間より前の場合に残業とする
      //（終業時間は定時とみなして算出）
      //終業時は打刻時刻が終業時刻より後の場合に残業とする
      //終業時間登録時に残業時間を再計算する
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // employee_code: employeeCode,
          // start_date: ,
          // start_ts:,
          // end_ts:,
          // before_overtime_flag:,
          // after_overtime_flag:,
          // overtime_minute:
        }),
      };
      const res = await fetch(url, params);
      const body = await res.json();
      console.log("res:", body);
    }
    sendRecord();
    navigate("/end");
  };
  const overTimeDisplay = () => {
    const hours = Math.floor(overTime);
    const minutes = (overTime - hours) * 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };
  return (
    <>
      {/*<div>*/}
      {/*  <p>*/}
      {/*    {clockInTime} {genreOfClockIn}*/}
      {/*  </p>*/}
      {/*  <p>（残業 {overTime}）</p>*/}
      {/*  <p>送信しますか？</p>*/}
      {/*  <button onClick={handleCancel}>キャンセル</button>*/}
      {/*  <button onClick={handleSend}>送信</button>*/}
      {/*</div>*/}
      <AppToolBar />
      <Box
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // textAlign: "center",
          height: "90vh",
          padding: "20px",
          backgroundColor: "#D9D9D9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            // height: "",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {/* 表示するテキスト */}
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", fontSize: "48px" }}
          >
            打刻送信確認
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", fontSize: "48px" }}
          >
            {displayUserInfo}
          </Typography>

          <Typography
            variant="body1"
            sx={{ marginBottom: "10px", fontSize: "80px" }}
          >
            {clockInTime} {genreOfClockIn}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "10px", fontSize: "48px" }}
          >
            （{genreOfClockIn === "始業" ? "早出" : ""}残業 {overTimeDisplay()}
            ）
          </Typography>

          {/*<Typography*/}
          {/*  variant="body1"*/}
          {/*  sx={{ marginBottom: "20px", fontSize: "32px" }}*/}
          {/*>*/}
          {/*  送信しますか？*/}
          {/*</Typography>*/}

          {/* ボタンの配置 */}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              width: "100%",
              margin: "60px",
            }}
          >
            <Button
              onClick={handleCancel}
              sx={{
                backgroundColor: "#D9D9D9",
                color: "black",
                fontWeight: 600,
                padding: "30px 20px",
                width: "270",
                height: "120",
                fontSize: "24px",
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSend}
              sx={{
                backgroundColor: "#0B5FFF",
                color: "white",
                fontWeight: 600,
                padding: "30px 40px",
                width: "270",
                height: "120",
                fontSize: "24px",
              }}
            >
              送信する
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
