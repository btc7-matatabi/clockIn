import { Box, Button } from "@mui/material";
import React from "react";

export const OvertimeButtonSection: React.FC<{
  handleOvetimeClick: (val: number) => void;
}> = ({ handleOvetimeClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: "2px",
        padding: "2px",
        margin: "10px 0 20px 0",
        justifyContent: "space-between",
      }}
    >
      {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((time) => (
        <Button
          key={time}
          onClick={() => handleOvetimeClick(time)}
          sx={{
            backgroundColor: "lightgray",
            flexDirection: "row",
            color: "white",
            fontWeight: 600,
            fontSize: "32px",
            fontFamily: "inter",
            borderRadius: "10px",
            width: "100%",
            height: "60px",
            padding: "14px 18px ",
            "&:hover": {
              backgroundColor: "#0B5FFF",
            },
          }}
        >
          {time.toFixed(1)}
        </Button>
      ))}
    </Box>
  );
};
