import { Typography } from "@mui/material";
import TimePicker from "react-time-picker";
import React from "react";

export const TimePickerSection: React.FC<{
  handleTimeChange: (newValue: string | null) => void;
  clockInTimeOnly: string;
}> = ({ handleTimeChange, clockInTimeOnly }) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          margin: "10px 0 ",
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
    </>
  );
};
