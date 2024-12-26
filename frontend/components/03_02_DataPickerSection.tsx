import { Box, TextField, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import React from "react";

export const DataPickerSection: React.FC<{
  executeDate: Date;
  setExecuteDate: (date: Date | null) => void;
}> = ({ executeDate, setExecuteDate }) => {
  return (
    <Box
      sx={{
        m: 2,
        width: "270px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "left", fontWeight: 600 }}
      >
        申請稼働日
      </Typography>
      <DatePicker
        // label="dataPicker"
        selected={executeDate}
        placeholderText={executeDate ? executeDate.toLocaleDateString() : ""}
        dateFormat="yyyy/MM/dd"
        onChange={(newValue) => setExecuteDate(newValue)}
        customInput={
          <TextField
            fullWidth
            sx={{
              width: "100%",
              padding: 0,
              // textAlign: "center",
              "& input": {
                textAlign: "center",
                fontWeight: 600,
              },
            }}
          />
        }
      />
    </Box>
  );
};
