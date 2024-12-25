import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
export function InitialScreen() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/qr-scan");
  };

  return (
    <>
      <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "black",
            justifyContent: "center",
            textAlign: "center",
            height: "40px",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "20px" }}>
              Connect 勤怠
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          onClick={handleClick}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: "gray",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: "64px",
              fontFamily: "Inter, Noto Sans JP",
              lineHeight: "1.8",
            }}
          >
            画面をタップで <br />
            QR読み込み起動
          </Typography>
        </Box>
      </Box>
    </>
  );
}
