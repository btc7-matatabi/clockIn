import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function AppToolBar() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "black",
          justifyContent: "center",
          // textAlign: "center",
          textAlign: "left",
          // borderRadius: "20px 20px 0 0",
          height: "40px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // 横幅いっぱいに広げる
            alignItems: "center", // 中央揃え
            padding: 0,
            margin: 0,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "20px" }}>
            Connect 勤怠
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "black",
              color: "white",
              fontWeight: 300,
              fontSize: "40px",
              minWidth: "40px",
              height: "40px",
              width: "40px",
              padding: 0,
              justifyContent: "right",
            }}
          >
            ×
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
