import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import {
  employeeCodeAtom,
  clockInTimeAtom,
  displayUserInfoAtom,
  genreOfClockInAtm,
  executeDateAtm,
  orverTimeAtom,
} from "../src/atoms.ts";
import { Box, Button, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";

export function ConfirmScreen() {
  const navigate = useNavigate();
  const [employeeCode] = useAtom(employeeCodeAtom);
  const [overTime] = useAtom(orverTimeAtom); //残業時間
  const [clockInTime] = useAtom(clockInTimeAtom); //打刻時間
  const [genreOfClockIn] = useAtom(genreOfClockInAtm); //打刻分類（始業or終業)
  const [displayUserInfo] = useAtom(displayUserInfoAtom);
  const [executeDate] = useAtom(executeDateAtm);
  const handleCancel = () => {
    navigate("/time-select");
  };

  async function sendRecord() {
    const URL = process.env.VITE_URL;
    const url = URL + "/attendance-time";

    const execDate =
      executeDate.getFullYear() +
      "/" +
      (executeDate.getMonth() + 1) +
      "/" +
      executeDate.getDate();

    try {
      const timestampKey = genreOfClockIn === "始業" ? "start_ts" : "end_ts";
      const timestampValue = clockInTime + ":00";
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_code: employeeCode,
          start_date: execDate,
          [timestampKey]: timestampValue,
        }),
      };
      const res = await fetch(url, params);
      const body = await res.json();
      console.log("res:", body);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleSend = async () => {
    await sendRecord();
    navigate("/end");
  };
  const overTimeDisplay = () => {
    const hours = Math.floor(overTime);
    const minutes = (overTime - hours) * 60;
    // return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return `${hours}:${("00" + minutes).slice(-2)}`;
  };
  const clockInTimeOnly = new Date(clockInTime)
    .toLocaleString("ja-JP", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false, // 24時間制（true にすると 12時間制）
    })
    .toString(); //HH:MM 表示
  return (
    <>
      <AppToolBar />
      <Box
        sx={{
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
            height: "90vh",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {/* 表示するテキスト */}
          <Typography
            variant="body1"
            sx={{ margin: "50px 0", fontSize: "48px" }}
          >
            打刻送信確認
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "50px", fontSize: "48px", fontFamily: "inter" }}
          >
            {displayUserInfo}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "0",
              fontSize: "80px",
              fontWeight: 600,
              fontFamily: "inter",
            }}
          >
            {executeDate.getFullYear()}/{executeDate.getMonth() + 1}/
            {executeDate.getDate()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "10px",
              fontSize: "80px",
              fontWeight: 600,
              fontFamily: "inter",
            }}
          >
            {/*{clockInTime} {genreOfClockIn}*/}
            {clockInTimeOnly} {genreOfClockIn === "start" ? "始業" : "終業"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "30px", fontSize: "48px", fontFamily: "inter" }}
          >
            （{genreOfClockIn === "始業" ? "早出" : ""}残業 {overTimeDisplay()}
            ）
          </Typography>

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
                width: "270px",
                height: "120px",
                fontSize: "36px",
                borderRadius: "10px",
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
                width: "270px",
                height: "120px",
                fontSize: "36px",
                borderRadius: "10px",
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
