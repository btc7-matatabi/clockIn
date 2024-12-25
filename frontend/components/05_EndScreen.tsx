import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clockInTimeAtom, genreOfClockInAtm } from "../src/atoms";
import { useAtom } from "jotai/index";
import { Box, Button, Typography } from "@mui/material";
import { AppToolBar } from "../src/AppToolBar.tsx";

export function EndScreen() {
  const [clockInTime] = useAtom(clockInTimeAtom);
  const [genreOfClockIn] = useAtom(genreOfClockInAtm);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <>
      <AppToolBar />
      <Typography
        variant="body1" // 標準のテキストとして表示
        sx={{
          marginBottom: "20px", // 下にスペースを作る
          fontWeight: 500, // 太字にしたい場合
          fontSize: "32px", // フォントサイズの調整
          textAlign: "center", // 中央揃え
        }}
      >
        {clockInTime} {genreOfClockIn}で登録しました
      </Typography>
    </>
  );
}
