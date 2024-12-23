import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
export function InitialScreen() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/qr-scan");
  };

  return (
    <>
      {/*<div*/}
      {/*  onClick={handleClick}*/}
      {/*  style={{*/}
      {/*    height: "100vh",*/}
      {/*    display: "flex",*/}
      {/*    justifyContent: "center",*/}
      {/*    alignItems: "center",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  QR読み込み <br />*/}
      {/*  画面をタップしてください*/}
      {/*</div>*/}

      <Box
        onClick={handleClick}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "center",
          backgroundColor: "lightgray",
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          QR読み込み <br />
          <br />
          画面をタップしてください
        </Typography>
      </Box>
    </>
  );
}
