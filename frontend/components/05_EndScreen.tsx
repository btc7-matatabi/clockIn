import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { clockInTimeAtom, genreOfClockInAtm } from "../src/atoms";
// import { useAtom } from "jotai/index";
import { Box, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";

export function EndScreen() {
  // const [clockInTime] = useAtom(clockInTimeAtom);
  // const [genreOfClockIn] = useAtom(genreOfClockInAtm);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <>
      <AppToolBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="body1" // 標準のテキストとして表示
          sx={{
            marginBottom: "20px", // 下にスペースを作る
            fontWeight: 500, // 太字にしたい場合
            fontSize: "48px", // フォントサイズの調整
            fontFamily: "Noto Sans JP",
            textAlign: "center", // 中央揃え
          }}
        >
          {/*{clockInTime} {genreOfClockIn}で登録しました*/}
          送信完了
        </Typography>
        {/*//バーの表示*/}
        {/*<Divider*/}
        {/*  orientation="horizontal"*/}
        {/*  flexItem*/}
        {/*  sx={{*/}
        {/*    height: "5px",*/}
        {/*    width: "180px",*/}
        {/*    alignItems: "center",*/}
        {/*    backgroundColor: "#3AC267",*/}
        {/*    margin: "0 auto",*/}
        {/*  }}*/}
        {/*/>*/}
      </Box>
    </>
  );
}
