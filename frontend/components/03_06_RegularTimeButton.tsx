import { Button } from "@mui/material";
import React from "react";

export const RegularTimeButton: React.FC<{
  handleRegularConfirm: () => void;
  regularTimeOnly: string;
  genreOfClockIn: string;
}> = ({ handleRegularConfirm, regularTimeOnly, genreOfClockIn }) => {
  return (
    <Button
      onClick={handleRegularConfirm}
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
      {/*定時 {regularTime} で{genreOfClockIn}打刻確認へ*/}
      定時 {
        regularTimeOnly
      } で{genreOfClockIn === "start" ? "始業" : "終業"}打刻確認へ
    </Button>
  );
};
