import { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "react-time-picker";

import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import {
  Box,
  Button,
  Divider,
  FilledTextFieldProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedTextFieldProps,
  RadioGroup,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import {
  clockInTimeAtom,
  userInfosAtom,
  orverTimeAtom,
  genreOfClockInAtm,
  executeDateAtm,
  displayUserInfoAtom,
} from "../src/atoms.ts";
import { AppToolBar } from "../src/AppToolBar.tsx";
import {
  DatePicker,
  LocalizationProvider,
  // AdapterDayjs,
} from "@mui/x-date-pickers";
import { Radio } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { JSX } from "react/jsx-runtime";
// import { LocalizationProvider, DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

export function TimeSelectScreen() {
  const navigate = useNavigate();
  const [clockInTime, setClockInTime] = useAtom(clockInTimeAtom);
  const [userInfos] = useAtom(userInfosAtom);
  const [overTime, setOverTime] = useAtom(orverTimeAtom);
  const [genreOfClockIn, setGenreOfClockIn] = useAtom(genreOfClockInAtm); //「始業」か「終了」
  const [executeDate, setExecuteDate] = useAtom(executeDateAtm); //「始業」か「終了」
  const [displayUserInfo, setDisplayUserInfo] = useAtom(displayUserInfoAtom);
  const [regularTime, setRegularTime] = useState(""); // 定時設定
  const radioButtons = [
    { label: "始業", value: "start" },
    { label: "終業", value: "end" },
  ];
  useEffect(() => {
    if (userInfos) {
      setDisplayUserInfo(`${userInfos.group_name}      ${userInfos.name}`);

      //QR読み込んだ時間が設定している始業・終業の近い方で表示
      const today = new Date();
      // const start_dateTime = timeStringToDate(userInfos.start_time);
      // const end_dateTime = timeStringToDate(userInfos.end_time);

      // // 開始が終了より後になっている場合、終了日を翌日にする
      // if (start_dateTime && end_dateTime) {
      //   if (start_dateTime > end_dateTime) {
      //     end_dateTime.setDate(end_dateTime.getDate() + 1);
      //   }
      //   console.log("start_dateTime", start_dateTime);
      //   console.log("end_dateTime", end_dateTime);
      //
      //   const diffBetweenStart = Math.abs(
      //     today.getTime() - start_dateTime.getTime(),
      //   );
      //   const diffBetweenEnd = Math.abs(
      //     today.getTime() - end_dateTime.getTime(),
      //   );
      //
      //   if (diffBetweenStart >= diffBetweenEnd) {
      //     setGenreOfClockIn("終業");
      //     setRegularTime(userInfos.end_time.split(":").slice(0, 2).join(":"));
      //   } else {
      //     setGenreOfClockIn("始業");
      //     setRegularTime(userInfos.start_time.split(":").slice(0, 2).join(":"));
      //   }
      // }
      //打刻時間が午前は始業、午後は終業にする版
      if (today.getHours() >= 12) {
        setGenreOfClockIn("終業");
        setRegularTime(userInfos.end_time.split(":").slice(0, 2).join(":"));
      } else {
        setGenreOfClockIn("始業");
        setRegularTime(userInfos.start_time.split(":").slice(0, 2).join(":"));
      }
    }
  }, [userInfos]);

  function timeStringToDate(stringTime: string): Date | null {
    const [hours, minutes] = stringTime.split(":").map(Number); //数値型に変換
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
  }

  // 定時 始業・終了処理
  const handleRegularConfirm = () => {
    console.log("regularTime", regularTime);
    setClockInTime(regularTime);
    navigate("/confirm");
  };

  // 残業指定ボタンを選択
  const handleOvetimeClick = (overtimeValue: number) => {
    setOverTime(overtimeValue);

    if (genreOfClockIn === "終業") {
      //orvertimeValueが少数の場合、分も加算される
      const addedTime = moment(timeStringToDate(regularTime)).add(
        overtimeValue,
        "hours",
      );
      setClockInTime(addedTime.format("HH:mm"));
    } else {
      const addedTime = moment(timeStringToDate(regularTime)).subtract(
        overtimeValue,
        "hours",
      );
      setClockInTime(addedTime.format("HH:mm"));
    }
  };

  //time dramで時間変更
  // const handleChange = (time: string) => {
  //   setClockInTime(time);
  //   console.log(clockInTime);
  // };
  const handleTimeChange = (newValue: string | ((prev: string) => string)) => {
    setClockInTime(newValue);
  };

  // 時間指定 始業・終了処理
  const handleConfirm = () => {
    navigate("/confirm");
  };
  const handleGenreChange = (val: string) => {
    const selectedGenre = radioButtons.find((el) => el.value === val);
    if (selectedGenre) {
      setGenreOfClockIn(selectedGenre.label);
    }
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
          variant="body1"
          sx={{
            marginBottom: "20px",
            fontSize: "48px",
            // textAlign: "left",
            alignSelf: "flex-start",
          }}
        >
          {displayUserInfo}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "48px",
            fontFamily: "Source Sans Pro",
            // fontFamily: "inter",
            gap: 2, // 要素間の間隔を設定
          }}
        >
          {/*  //https://zenn.dev/longbridge/articles/f11fb58272510c*/}
          {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
          {/*  <Box sx={{ m: 2, width: "25ch" }}>*/}
          {/*    <DatePicker*/}
          {/*      label="dataPicker"*/}
          {/*      value={executeDate}*/}
          {/*      onChange={(newValue) => setExecuteDate(newValue)}*/}
          {/*      // inputFormat="yyyy/MM/dd"*/}
          {/*      // mask="____/__/__"*/}
          {/*      // renderInput={(params) => <TextField {...params} />}*/}
          {/*    />*/}
          {/*  </Box>*/}
          {/*</LocalizationProvider>*/}
          {/*  /!* 「始業」「終業」のオプションボタン *!/*/}
          {/*<div className="form-check">*/}
          {radioButtons.map((radio) => {
            return (
              <span key={radio.value}>
                <input
                  id={radio.value}
                  type="radio"
                  value={radio.value}
                  checked={radio.label === genreOfClockIn}
                  onChange={(e) => handleGenreChange(e.target.value)}
                />
                <label htmlFor={radio.value} className="form-check-label">
                  {radio.label}
                </label>
              </span>
            );
          })}
          {/*</div>*/}
        </Box>
        <Button
          onClick={handleRegularConfirm}
          sx={{
            backgroundColor: "#0B5FFF",
            boxShadow: "0px 0px 10px 0px #00000040",
            // filter: "blur(4px)",
            mixBlendMode: "multiply",
            color: "white",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "36px",
            // margin: "358px 60px",
            padding: "14px 18px",
            width: "710",
            height: "77",
            borderRadius: "20px 20px 20px 20px",
          }}
        >
          定時 {regularTime} で{genreOfClockIn}打刻確認へ
        </Button>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ height: "2px", width: "750px", marginTop: 3 }}
        />
        {/*<Box*/}
        {/*  sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}*/}
        {/*>*/}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            marginTop: 4,
            alignSelf: "flex-start",
          }}
        >
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
                fontSize: "36px",
                width: "80px",
                height: "60px",
                gap: "10px",
              }}
            >
              {time.toFixed(1)}
            </Button>
          ))}
        </Box>
        {/*</Box>*/}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            marginTop: 4,
            alignSelf: "flex-start",
          }}
        >
          打刻時間
        </Typography>
        {/*<Box*/}
        {/*  sx={{*/}
        {/*    width: "100%", // 親要素の幅を100%に設定*/}
        {/*    maxWidth: "800px", // 最大幅を指定（必要に応じて調整）*/}
        {/*    padding: "16px",*/}
        {/*  }}*/}
        {/*>*/}
        <TimePicker
          onChange={handleTimeChange}
          value={clockInTime}
          disableClock
          clearIcon={null}
          className="custom-time-picker"
          // renderInput={(
          //   props: JSX.IntrinsicAttributes & {
          //     variant?: TextFieldVariants | undefined;
          //   } & Omit<
          //       | FilledTextFieldProps
          //       | OutlinedTextFieldProps
          //       | StandardTextFieldProps,
          //       "variant"
          //     >,
          // ) => (
          //   <TextField
          //     {...props}
          //     sx={{
          //       // fontSize: "1.2rem", // フォントサイズを調整
          //       width: "600px",
          //       height: "60px",
          //       // top: 719px;
          //       // left: 60px;
          //       gap: "0px",
          //       borderRadius: "10px 0px 0px 0px",
          //       border: "1px 0px 0px 0px",
          //     }}
          //   />
          // )}
        />
        {/*</Box>*/}

        <Typography
          variant="body1"
          sx={{ textAlign: "center", fontSize: "36px", padding: "30px" }}
        >
          残業時間: {Number(overTime).toFixed(1)}
        </Typography>

        <Button
          onClick={handleConfirm}
          sx={{
            backgroundColor: "#0B5FFF",
            boxShadow: "0px 0px 10px 0px #00000040",
            // filter: "blur(4px)",
            mixBlendMode: "multiply",
            color: "white",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "36px",
            // margin: "358px 60px",
            padding: "14px 18px",
            width: "710",
            height: "77",
            borderRadius: "20px 20px 20px 20px",
          }}
        >
          選択した時刻で{genreOfClockIn}打刻確認へ
        </Button>
      </Box>
    </>
  );
}
