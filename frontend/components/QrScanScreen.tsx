import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { employeeCodeAtom, UserInfos, userInfosAtom } from "../src/atoms";
import { Box, Button, Typography } from "@mui/material";

export function QrScanScreen() {
  const navigate = useNavigate();
  const [, setEmployeeCode] = useAtom(employeeCodeAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const { ref } = useZxing({
    onDecodeResult(result) {
      const employee_code = result.getText();
      setEmployeeCode(employee_code);
      if (employee_code.length === 7) {
        async function getUserInfo() {
          const URL = process.env.VITE_URL;
          console.log(URL + "/getUserInfo/" + employee_code);
          const resultUserInfo = await fetch(
            URL + "/getUserInfo/" + employee_code,
          );
          const userInfos = await resultUserInfo.json();
          console.log("🍎", userInfos.data);
          setUserInfos(userInfos.data[0] as UserInfos);

          if (!userInfos.data.name) {
            navigate("/time-select");
          } else {
            alert("ユーザ情報が存在しませんでした。");
          }
        }
        getUserInfo();
      } else {
        navigate("/");
      }
    },
  });
  const handleClose = () => {
    navigate("/");
  };

  const handleTemtative = () => {
    navigate("/time-select");
  };
  return (
    <>
      {/*<div>*/}
      {/*  <p>QRコードを読み込ませてください</p>*/}
      {/*  <button onClick={handleClose}>✖️</button>*/}
      {/*  <button onClick={handleTemtative}>仮）QR読込</button>*/}
      {/*</div>*/}
      {/*<video ref={ref} />*/}
      <Box
        sx={{
          // height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginTop: "10px",
              fontWeight: 600,
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            QRコードを読み込ませてください
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "lightgray",
              color: "white",
              fontWeight: 600,
              fontSize: "32px",
              marginLeft: "auto",
              padding: 0,
              height: "40px",
            }}
          >
            ×
          </Button>
        </Box>

        <video
          ref={ref}
          style={{
            width: "100%",
            // display: "flex",
            // justifyContent: "flex-end",
            // maxWidth: "600px",
            borderRadius: "10px",
          }}
        />
      </Box>
    </>
  );
}
