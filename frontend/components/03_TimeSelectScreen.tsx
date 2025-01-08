import  { useState, useEffect } from "react";
// import moment from "moment";
import {addHours, format, parse, subHours} from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/index";
import { Box,Divider, Typography } from "@mui/material";
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
  // const [regularTime, setRegularTime] = useState(""); // 定時設定
  const [regularTime, setRegularTime] = useState(new Date()); // 定時設定
  const radioButtons = [
    { label: "始業", value: "start" },
    { label: "終業", value: "end" },
  ];
  useEffect(() => {
    if (userInfos) {
      setDisplayUserInfo(`${userInfos.group_name}　${userInfos.name}`);

      //打刻時間が午前はデフォルト始業、午後は終業にする版
      const today = new Date();
      if (today.getHours() >= 12) {
        setGenreOfClockIn("end");
        // setRegularTime(userInfos.end_time);
        setRegularTime(new Date(userInfos.end_time));
      } else {
        setGenreOfClockIn("start");
        // setRegularTime(userInfos.start_time);
        setRegularTime(new Date(userInfos.start_time));
      }
    }
    // console.log("🍎userInfos", userInfos);
  }, [userInfos]);

  // 定時 始業・終了処理
  const handleRegularConfirm = () => {
    setClockInTime(regularTime);
    navigate("/confirm");
  };

  // 残業指定ボタンを選択
  const handleOvetimeClick = (overtimeValue: number) => {
    setOverTime(overtimeValue);

    //warning対応のため、momentをdate-fnsに変更
    // if (genreOfClockIn === "end") {
    //   //overtimeValueが少数の場合、分も加算される
    //   const addedTime = moment(regularTime).add(overtimeValue, "hours");;
    //   setClockInTime(addedTime.format("YYYY/MM/DD HH:mm:ss"));
    // } else {
    //   const addedTime = moment(regularTime).subtract(overtimeValue, "hours");
    //     setClockInTime(addedTime.format("YYYY/MM/DD HH:mm:ss"));
    // }
      if (genreOfClockIn === "end") {
          // overtimeValue が少数の場合、分も加算される
          const addedTime = addHours(new Date(regularTime), overtimeValue);
          setClockInTime(addedTime);
      } else {
          const addedTime = subHours(new Date(regularTime), overtimeValue);
          setClockInTime(addedTime);
      }
  };

  //time dramで時間変更
  const handleTimeChange = (newValue: string|null) => {
    if(newValue !==null){
        console.log("newValue",newValue)
      // setClockInTime(new Date(newValue));
        const today = new Date();
        const todayFormatted = format(today, 'yyyy-MM-dd');
        const strNewValue=`${todayFormatted} ${newValue}`;
        setClockInTime(parse(strNewValue, 'yyyy-MM-dd HH:mm', new Date()));
    }
  };

  // 時間指定 始業・終了処理
  const handleConfirm = () => {
    navigate("/confirm");
  };

  const handleGenreChange = (val: string) => {
      const selectedGenre = radioButtons.find((el) => el.value === val);
      //打刻日、ジャンル設定用
      if (selectedGenre && (selectedGenre.value === "start" || selectedGenre.value === "end")) {
          setGenreOfClockIn(selectedGenre.value);
          setClockInTime(new Date());
          setOverTime(0);
      }
      //打刻時間初期値設定用
      if (selectedGenre && userInfos) {
          if (selectedGenre.value === "start") {
              setRegularTime(new Date(userInfos.start_time));
          } else {
              setRegularTime(new Date(userInfos.end_time));
          }
      }
  }


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
            width:"710px"
        }}
      >
        <UserInfo displayUserInfo={displayUserInfo} />

        <Box
          sx={{
              width:"100%",
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
            <Box sx={{ marginLeft: "70px" }}></Box>
            <RadioButtonSection
            genreOfClockIn={genreOfClockIn}
            handleGenreChange={handleGenreChange}
          />
        </Box>
      </Box>
        <Divider
          orientation="horizontal"
          flexItem
          // sx={{ borderWidth: "4px", width: "750px", marginTop: 2, marginBottom: 4 }}
          sx={{ borderWidth: "2px", width: "800px", mx: "auto", marginTop:"10px" ,marginBottom:"10px"}}
        />
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
        <RegularTimeButton
          handleRegularConfirm={handleRegularConfirm}
          regularTimeOnly={regularTimeOnly}
          genreOfClockIn={genreOfClockIn}
        />
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ borderWidth: "2px", width: "800px", mx: "auto",  marginTop:"10px" ,marginBottom:"10px" }}
        />
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
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontFamily: "Noto Sans JP, sans-serif",
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
