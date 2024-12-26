import { Button, Typography } from "@mui/material";
import React from "react";

export const BottomButtonSection: React.FC<{
  genreOfClockIn: "start" | "end";
  overTime: number;
  handleConfirm: () => void;
}> = ({ genreOfClockIn, overTime, handleConfirm }) => {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "36px",
          padding: "30px",
          fontWeight: 600,
        }}
      >
        {genreOfClockIn === "start" ? "早出残業" : "残業時間"}:{" "}
        {Number(overTime).toFixed(1)}
      </Typography>

      <Button
        onClick={handleConfirm}
        sx={{
          backgroundColor: "#0B5FFF",
          boxShadow: "0px 0px 10px 0px #00000040",
          color: "white",
          fontWeight: 600,
          fontSize: "36px",
          padding: "14px 18px",
          height: "77",
          borderRadius: "20px",
        }}
      >
        選択した時刻で{genreOfClockIn === "start" ? "始業" : "終業"}打刻確認へ
      </Button>
    </>
  );
};
