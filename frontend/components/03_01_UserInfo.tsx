import { Typography } from "@mui/material";
import React from "react";

export const UserInfo: React.FC<{ displayUserInfo: string }> = ({
  displayUserInfo,
}) => {
  return (
    <Typography
      variant="h3"
      sx={{
        margin: "30px 0",
      }}
    >
      {displayUserInfo}
    </Typography>
  );
};
