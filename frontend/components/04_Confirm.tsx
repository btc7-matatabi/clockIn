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
import {format} from "date-fns";

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
    // const timestampMap: Record<string, string> = {
    //     "始業": "start_ts",
    //     "終業": "end_ts"
    // };


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
      // const timestampKey = genreOfClockIn === "始業" ? "start_ts" : "end_ts";
      const timestampKey = genreOfClockIn === "start" ? "start_ts" : "end_ts";
      //   const timestampKey = timestampMap[genreOfClockIn] || "start_ts"
      // const timestampValue = clockInTime + ":00";
      const timestampValue = format(clockInTime,"yyyy/MM/dd HH:mm:ss") ;
      console.log("timestampValue",timestampValue)
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
        console.log("params:", params);
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
            height: "100vh",
          padding: "3vh",
          backgroundColor: "#D9D9D9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0",
            backgroundColor: "white",
            height: "90vh",
            maxHeight: "calc(100vh - 80px)",
          }}
        >
          {/* 表示するテキスト */}
          <Typography
            variant="body1"
            sx={{ margin: "100px 0", fontSize: "56px" }}
          >
            打刻送信確認
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "80px", fontSize: "56px", fontFamily: "inter" }}
          >
            {displayUserInfo}
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
            {executeDate.getFullYear()}/{executeDate.getMonth() + 1}/
            {executeDate.getDate()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
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
            sx={{ marginBottom: "30px", fontSize: "56px", fontFamily: "inter" }}
          >
            {/*（{genreOfClockIn === "始業" ? "早出" : ""}残業 {overTimeDisplay()}*/}
            （{genreOfClockIn === "start" ? "早出" : ""}残業 {overTimeDisplay()}
            ）
          </Typography>

          {/* ボタンの配置 */}
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              justifyContent: "center",
              width: "100%",
              margin: "80px",
            }}
          >
            <Button
              onClick={handleCancel}
              sx={{
                backgroundColor: "#D9D9D9",
                color: "black",
                fontWeight: 600,
                padding: "30px 20px",
                width: "300px",
                height: "120px",
                fontSize: "48px",
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
                width: "300px",
                height: "120px",
                fontSize: "48px",
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
